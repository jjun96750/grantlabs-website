window.GRANTLABS_CRM_API_URL = "https://script.google.com/macros/s/AKfycby5XkNC7Y5g2XPQnIaEo5BUpLNfyo1fmqDSvPpNu2ysmVuCEOsieUjX6b0R5aumtkCaHA/exec";

(function () {
  const getApiUrl = () => (window.GRANTLABS_CRM_API_URL || "").trim();

  window.grantLabsCrmRequest = async function grantLabsCrmRequest(action, payload = {}) {
    const apiUrl = getApiUrl();
    if (!apiUrl) return { ok: false, skipped: true };

    const method = action === "list" ? "GET" : "POST";
    const url = action === "list" ? `${apiUrl}?action=list` : apiUrl;
    const response = await fetch(url, {
      method,
      body: method === "POST" ? JSON.stringify({ action, ...payload }) : undefined,
    });
    return response.json();
  };

  const normalizeLeadFromEmailParams = (params = {}) => ({
    receivedAt: new Date().toISOString().slice(0, 16),
    source: "홈페이지",
    name: params.name || "",
    company: params.company || "",
    phone: params.phone || "",
    email: params.email || "",
    business: params.industry || params.interest || "",
    industry: params.industry || "",
    region: params.region || "",
    credit: params.credit_score || "",
    revenue: params.revenue || "",
    founded: "",
    tax: "확인필요",
    owner: "담당자 선택",
    tmStatus: "대기중",
    meeting: "—",
    interest: params.interest || "",
    message: params.lead_details || params.message || "",
    memo: params.message || "",
  });

  const installEmailJsMirror = () => {
    if (!window.emailjs || window.emailjs.__grantLabsCrmMirrorInstalled) return;
    const originalSend = window.emailjs.send?.bind(window.emailjs);
    if (!originalSend) return;

    window.emailjs.send = async function mirroredEmailSend(serviceId, templateId, params, options) {
      const result = await originalSend(serviceId, templateId, params, options);
      window.grantLabsCrmRequest("createLead", { lead: normalizeLeadFromEmailParams(params) })
        .catch((error) => console.warn("CRM mirror failed:", error));
      return result;
    };
    window.emailjs.__grantLabsCrmMirrorInstalled = true;
  };

  installEmailJsMirror();
  window.addEventListener("load", installEmailJsMirror);
})();
