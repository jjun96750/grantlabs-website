const SHEET_NAME = "Leads";
const SPREADSHEET_ID = "1KCIwResl3vrUdgfIgThNSaPBN0kr_yI_18AsUYgEFHo";

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
  const action = (e.parameter.action || "list").toLowerCase();
  if (action === "list") {
    return jsonResponse({ ok: true, leads: getLeads() });
  }
  return jsonResponse({ ok: false, error: "Unknown action" });
}

function doPost(e) {
  const payload = parsePayload(e);
  const action = (payload.action || "").toLowerCase();

  if (action === "createlead") {
    return jsonResponse({ ok: true, lead: createLead(payload.lead || {}) });
  }

  if (action === "updatelead") {
    return jsonResponse({ ok: true, lead: updateLead(payload.lead || {}) });
  }

  if (action === "deletelead") {
    deleteLead(payload.id);
    return jsonResponse({ ok: true });
  }

  return jsonResponse({ ok: false, error: "Unknown action" });
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
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
