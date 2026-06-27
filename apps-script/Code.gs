const SHEET_NAME = "Leads";
const PROP_SPREADSHEET_ID = "CRM_SPREADSHEET_ID";
const PROP_API_TOKEN = "CRM_API_TOKEN";
const PROP_ALLOW_PUBLIC_CREATE = "CRM_ALLOW_PUBLIC_CREATE";

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
];

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    const action = (params.action || "list").toLowerCase();

    if (action === "list") {
      assertAuthorized(params);
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
  if (publicCreateAllowed()) return;
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
