window.GRANTLABS_CRM_API_URL = "https://script.google.com/macros/s/AKfycbxs0y4YXEDEUcJy8ebrpl9LIc4HiJ3j8Y7Nk3f1fTksQq44t4wC4ED5qwV7l6rkmgP8/exec";
// ★2026-07-27 Brain 실측 교정: 구 URL(AKfycbwv...)은 이 Apps Script 프로젝트의 활성 배포 목록에 없는
// 죽은/orphan 배포로, 접속 시 구글 OAuth 권한요청 화면만 뜨고 데이터를 반환하지 않았다(실측 확인).
// components/Contact.jsx가 실제로 쓰던 배포(AKfycbxs0y4Y..., "Meta 리드폼 웹훅 추가" 활성배포, action=list 실측 정상)로 통일.
// 이 불일치 때문에 CRM 대시보드(crm.html)·lead-check.html·이메일js미러가 리드를 못 읽었거나 저장을 놓쳤을 가능성이 높음.

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
    business: params.business || params.industry || params.interest || "",
    industry: params.industry || "",
    region: params.region || "",
    credit: params.credit || params.credit_score || "",
    revenue: params.revenue || "",
    founded: params.founded || "",
    tax: params.tax || "확인필요",
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
      if (params?.__crm_saved === "true" || params?.__crm_saved === true) return result;
      window.grantLabsCrmRequest("createLead", { lead: normalizeLeadFromEmailParams(params) })
        .catch((error) => console.warn("CRM mirror failed:", error));
      return result;
    };
    window.emailjs.__grantLabsCrmMirrorInstalled = true;
  };

  installEmailJsMirror();
  window.addEventListener("load", installEmailJsMirror);
})();
