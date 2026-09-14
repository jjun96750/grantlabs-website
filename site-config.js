// 운영 배포 전 채울 값 — grantlabs.co.kr 현행 index.html의 emailjs.send(...) 호출에서 그대로 복사
// (공개 클라이언트 식별자. 비밀키가 아니지만 저장소·대화에는 값을 남기지 않는다)
window.GL_SITE = {
  emailjsPublicKey: "UUfoZdh404On9fZbm",   // emailjs.send 4번째 인자 publicKey
  emailjsService:   "service_tcj8otx",     // "service_…"
  emailjsTemplate:  "template_8ne6kj3"     // "template_…"
};
// config.js(운영본 그대로 복사)가 emailjs.send를 가로채 CRM(Apps Script, action=createLead)에 동시 기록한다.
