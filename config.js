window.GRANTLABS_CRM_API_URL = "https://script.google.com/macros/s/AKfycby1_BWxU9lLZvSCWuhPQ32BHpMrFN5PZwdtmzFcaPXL6awL-KaLcO9-Go7Nwg6tys8Tmw/exec";
// ★2026-08-09 Brain 실측 교정: 구 URL(AKfycbxs0y4Y...)은 "Grant Labs CRM + GA4 Sync" 프로젝트의
// 배포 관리 목록 어디에도 없는 배포였다(활성5·보관3 전수 대조, 매치 없음). 실측 결과 action=list는
// 응답했지만(구버전 Code.gs, 인증 게이트 없음) action=createLead는 "Unknown action"을 반환 —
// 즉 lead-check.html이 보내는 신규 리드가 전부 유실되고 있었다(마지막 진짜 실시간 리드: 2026-07-02,
// 이후는 전부 meta_backfill 수동입력). 원인: Code.gs 소스는 갱신됐지만 배포가 그 갱신을 반영하지 않음.
// 조치: 같은 프로젝트에서 현재 Code.gs로 새 웹앱 배포(AKfycby1_B...) 생성 후 이 URL로 교체.
// 실측 검증: action=createLead 테스트 리드 정상 기록 확인(source="테스트", id=a2712644-...).
// 참고: 새 배포는 action=list에 CRM_API_TOKEN 인증을 요구한다(구배포는 미요구였음) — list 호출부(crm 대시보드 등)가
// 토큰 없이 401을 받으면 이 배포의 인증 게이트가 원인이니 CRM_API_TOKEN 전달 또는 게이트 완화 여부를 별도 검토할 것.
// action=createLead는 CRM_ALLOW_PUBLIC_CREATE=true로 토큰 없이 정상 동작(실측 확인) — lead-check.html은 영향 없음.

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
