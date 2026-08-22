const SHEET_NAME = "Leads";
const PROP_SPREADSHEET_ID = "CRM_SPREADSHEET_ID";
const PROP_API_TOKEN = "CRM_API_TOKEN";
const PROP_ALLOW_PUBLIC_CREATE = "CRM_ALLOW_PUBLIC_CREATE";
const PROP_ALLOW_PUBLIC_LIST = "CRM_ALLOW_PUBLIC_LIST";
// ★2026-08-09: crm.html 대시보드가 action=list를 토큰 없이 호출하는 기존 구조와의 호환을 위해 추가.
// 스크립트 속성 CRM_ALLOW_PUBLIC_LIST=true로 설정하면 list 조회에 CRM_API_TOKEN을 요구하지 않는다.
// (createlead와 동일한 패턴) — 리드 목록(이름/연락처 포함)이 URL만 알면 누구나 조회 가능해지는 트레이드오프이므로,
// 값을 켤지 여부는 이 URL을 외부에 공개하지 않는다는 전제하에 대표 판단으로 결정함(2026-08-09).

const HEADERS = [
  "id",
  "receivedAt",
  "source",
  "name",
  "company",
  "phone",
  "email",
  "business",
  "industry",
  "region",
  "credit",
  "revenue",
  "founded",
  "tax",
  "owner",
  "tmStatus",
  "meeting",
  "interest",
  "message",
  "memo",
  "createdAt",
  "updatedAt",
  "leadStatus",
  "nextActionDate",
  "lastContactAt",
];

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    const action = (params.action || "list").toLowerCase();

    if (action === "list") {
      assertCanList(params);
      return jsonResponse({ ok: true, leads: getLeads() });
    }

    if (["createlead", "submit", "addlead"].indexOf(action) !== -1) {
      assertCanCreate(params);
      return jsonResponse({ ok: true, lead: createLead(normalizeIncomingLead(params)) });
    }

    if (["deletelead", "delete", "removelead"].indexOf(action) !== -1) {
      assertAuthorized(params);
      deleteLead(params.id);
      return jsonResponse({ ok: true, id: params.id || "" });
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    return errorResponse(error);
  }
}

function doPost(e) {
  try {
    const payload = parsePayload(e);
    const action = (payload.action || "").toLowerCase();

    if (action === "createlead") {
      assertCanCreate(payload);
      return jsonResponse({ ok: true, lead: createLead(normalizeIncomingLead(payload.lead || payload)) });
    }

    if (action === "updatelead") {
      assertAuthorized(payload);
      return jsonResponse({ ok: true, lead: updateLead(payload.lead || {}) });
    }

    if (["deletelead", "delete", "removelead"].indexOf(action) !== -1) {
      assertAuthorized(payload);
      deleteLead(payload.id);
      return jsonResponse({ ok: true, id: payload.id || "" });
    }

    if (looksLikeLead(payload)) {
      assertCanCreate(payload);
      return jsonResponse({ ok: true, lead: createLead(normalizeIncomingLead(payload.lead || payload)) });
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    return errorResponse(error);
  }
}

function parsePayload(e) {
  if (!e) return {};
  const params = e.parameter || {};
  if (!e.postData || !e.postData.contents) return params;
  try {
    return { ...params, ...JSON.parse(e.postData.contents) };
  } catch (error) {
    return params;
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(error) {
  const message = error && error.message ? error.message : "Unknown error";
  return jsonResponse({ ok: false, error: message });
}

function getScriptProperties() {
  return PropertiesService.getScriptProperties();
}

function getConfigValue(key) {
  return (getScriptProperties().getProperty(key) || "").trim();
}

function getSpreadsheetId() {
  const spreadsheetId = getConfigValue(PROP_SPREADSHEET_ID);
  if (!spreadsheetId) throw new Error("CRM_SPREADSHEET_ID is not configured");
  return spreadsheetId;
}

function publicCreateAllowed() {
  return getConfigValue(PROP_ALLOW_PUBLIC_CREATE).toLowerCase() === "true";
}

function requestToken(input) {
  if (!input) return "";
  const bearer = String(input.authorization || input.Authorization || "").replace(/^Bearer\s+/i, "").trim();
  return String(input.token || input.apiToken || input.crmApiToken || bearer || "").trim();
}

function assertAuthorized(input) {
  const expected = getConfigValue(PROP_API_TOKEN);
  if (!expected) throw new Error("CRM_API_TOKEN is not configured");
  if (requestToken(input) !== expected) throw new Error("Unauthorized");
}

function assertCanCreate(input) {
  if (publicCreateAllowed()) {
    assertNotSpam(input);
    return;
  }
  assertAuthorized(input);
}

// 2026-08-22: 홈페이지 리드폼 봇/XSS 제출 차단(백로그 "LANE A 큐 · 긴급 · 2026-07-09").
// 클라이언트(JS) 검증은 API를 직접 호출하는 봇에게는 아무 의미가 없어, 실제 방어는 여기서 해야 한다.
// 근거 실증: 랜덤 8자리 영숫자 이름 + 미국식 번호(795-971-2599 등) + XSS payload 제출 다수,
// 무고한 실제고객(고희석 7/2·안원성 7/9)에게 오연락 발생.
function assertNotSpam(input) {
  const lead = (input && (input.lead || input)) || {};

  // 허니팟: 숨김 필드(website/hp/url)가 채워져 있으면 봇으로 간주.
  const honeypot = pick(lead, ["website", "hp", "hp_field", "company_url"]);
  if (honeypot) throw new Error("Spam detected");

  const name = String(pick(lead, ["name", "담당자명", "이름", "성함"]) || "").trim();
  const phone = String(pick(lead, ["phone", "tel", "mobile", "연락처", "전화번호"]) || "").trim();
  const message = String(pick(lead, ["message", "situation", "문의내용", "memo"]) || "").trim();

  // 주입/이스케이프 시도 패턴 — 실제 이름·연락처엔 나올 이유가 없는 문자.
  const dangerPattern = /[<>]|%3c|%3e|%22|%27|javascript:/i;
  if (dangerPattern.test(name) || dangerPattern.test(phone) || dangerPattern.test(message)) {
    throw new Error("Invalid characters in submission");
  }

  // 전화번호가 있으면 한국 번호 형식이어야 한다(클라이언트 검증과 동일 규칙, 서버에서도 강제).
  if (phone) {
    const digits = phone.replace(/[^0-9]/g, "");
    const validKr = /^0\d{8,10}$/.test(digits) || /^82\d{8,10}$/.test(digits);
    if (!validKr) throw new Error("Invalid phone format");
  }
}

function publicListAllowed() {
  return getConfigValue(PROP_ALLOW_PUBLIC_LIST).toLowerCase() === "true";
}

function assertCanList(input) {
  if (publicListAllowed()) return;
  assertAuthorized(input);
}

function getSheet() {
  const ss = SpreadsheetApp.openById(getSpreadsheetId());
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some((header, index) => currentHeaders[index] !== header);
  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getLeads() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues()
    .filter((row) => row.some((value) => value !== ""))
    .map(rowToLead)
    .sort((a, b) => String(b.receivedAt || "").localeCompare(String(a.receivedAt || "")));
}

function createLead(input) {
  const sheet = getSheet();
  const now = new Date().toISOString();
  const lead = normalizeLead({
    ...input,
    id: input.id || Utilities.getUuid(),
    receivedAt: input.receivedAt || now.slice(0, 16),
    createdAt: input.createdAt || now,
    updatedAt: now,
  });
  sheet.appendRow(HEADERS.map((header) => lead[header] || ""));
  return lead;
}

function updateLead(input) {
  if (!input.id) throw new Error("Missing lead id");
  const sheet = getSheet();
  const rowNumber = findRowById(sheet, input.id);
  if (!rowNumber) throw new Error("Lead not found");

  const existing = rowToLead(sheet.getRange(rowNumber, 1, 1, HEADERS.length).getValues()[0]);
  const lead = normalizeLead({
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  });
  sheet.getRange(rowNumber, 1, 1, HEADERS.length).setValues([HEADERS.map((header) => lead[header] || "")]);
  return lead;
}

function deleteLead(id) {
  if (!id) throw new Error("Missing lead id");
  const sheet = getSheet();
  const rowNumber = findRowById(sheet, id);
  if (rowNumber) sheet.deleteRow(rowNumber);
}

function findRowById(sheet, id) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const index = values.findIndex((row) => row[0] === id);
  return index === -1 ? null : index + 2;
}

function rowToLead(row) {
  return HEADERS.reduce((lead, header, index) => {
    lead[header] = row[index] || "";
    return lead;
  }, {});
}

function normalizeLead(input) {
  const lead = {};
  HEADERS.forEach((header) => {
    lead[header] = input[header] == null ? "" : String(input[header]);
  });
  return lead;
}

function looksLikeLead(input) {
  if (!input) return false;
  const lead = input.lead || input;
  return Boolean(
    lead.phone ||
    lead.tel ||
    lead.mobile ||
    lead["전화번호"] ||
    lead.name ||
    lead["이름"] ||
    lead.company ||
    lead["회사명"]
  );
}

function normalizeIncomingLead(input) {
  const source = pick(input, ["source", "utm_source", "채널", "소스"]) || "외부 입력";
  const name = pick(input, ["name", "담당자명", "이름", "성함", "customer_name", "full_name"]);
  const company = pick(input, ["company", "회사명", "업체명", "상호", "business_name"]);
  const phone = pick(input, ["phone", "tel", "mobile", "연락처", "전화번호", "휴대폰", "휴대폰번호"]);
  const email = pick(input, ["email", "이메일", "mail"]);
  const industry = pick(input, ["industry", "업종", "business", "사업분야"]);
  const region = pick(input, ["region", "지역"]);
  const revenueRaw = pick(input, ["revenue", "매출", "매출액"]);
  const creditRaw = pick(input, ["credit", "credit_score", "신용", "신용점수"]);
  const message = pick(input, ["message", "lead_details", "문의내용", "문의 내용", "메모", "memo"]);

  return normalizeLead({
    ...input,
    source,
    name,
    company,
    phone,
    email,
    business: pick(input, ["business", "사업분야"]) || industry,
    industry,
    region,
    credit: normalizeCredit(creditRaw),
    revenue: normalizeRevenue(revenueRaw),
    founded: pick(input, ["founded", "설립", "업력"]),
    tax: pick(input, ["tax", "세금"]) || "확인필요",
    owner: pick(input, ["owner", "담당자"]) || "담당자 선택",
    tmStatus: pick(input, ["tmStatus", "TM 상태", "상태"]) || "대기중",
    leadStatus: pick(input, ["leadStatus", "리드상태"]) || "신규신청",
    nextActionDate: pick(input, ["nextActionDate", "다음액션일", "다음액션 날짜"]),
    lastContactAt: pick(input, ["lastContactAt", "최근접촉일", "마지막접촉일"]),
    meeting: pick(input, ["meeting", "미팅"]) || "—",
    interest: pick(input, ["interest", "관심 서비스", "관심서비스"]) || "정책자금",
    message,
    memo: pick(input, ["memo", "메모"]) || message,
  });
}

function pick(input, keys) {
  for (const key of keys) {
    if (input[key] != null && String(input[key]).trim() !== "") return String(input[key]).trim();
  }
  return "";
}

function normalizeCredit(value) {
  if (!value) return "";
  return String(value).trim();
}

function normalizeRevenue(value) {
  if (!value) return "";
  return String(value).trim();
}
