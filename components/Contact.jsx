/**
 * GrantLabs — Contact / CTA + Footer
 */

const Contact = () => {
  const [form, setForm] = React.useState({ company: "", name: "", phone: "", interest: "정책자금", message: "" });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const successRef = React.useRef(null);

  React.useEffect(() => {
    if (sent && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [sent]);

  return (
    <section id="contact" style={{ padding: "var(--section-y) 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "flex-start" }}>
          <div style={{ order: 2 }}>
            <Eyebrow>문의</Eyebrow>
            <h2 style={{ margin: "16px 0 24px", fontSize: "clamp(36px, 4.6vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.12 }}>
              지금,<br/>그랜트 랩스와 시작하세요.
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.75, maxWidth: 460 }}>
              상담을 신청해 주시면 전담 컨설턴트가 직접 연락드립니다.<br/>
              모든 상담은 1:1 상담을 통해 진행됩니다.
            </p>

            <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { i: "phone", l: "대표 전화", v: "010-5963-7624" },
                { i: "mail", l: "이메일", v: "jjun96750@gmail.com" },
                { i: "map-pin", l: "오피스", v: "경기도 파주시 초롱꽃로 109, 406호 9057 (동패동, 팜스타워)" },
                { i: "clock", l: "운영 시간", v: "평일 09:00 – 18:00" },
              ].map((c) => (
                <div key={c.l} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--muted-foreground)",
                    flexShrink: 0, marginTop: 8,
                    opacity: 0.5,
                  }} />
                  <div>
                    <div style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.l}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4, letterSpacing: "-0.005em" }}>{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card style={{ padding: 36, gap: 18, order: 1 }}>
            {sent ? (
              <div ref={successRef} style={{ padding: "60px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 99, background: "oklch(0.62 0.18 145 / 0.12)", border: "2px solid oklch(0.62 0.18 145)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={28} style={{ color: "oklch(0.62 0.18 145)" }} />
                </div>
                <h3 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>상담신청 완료되었습니다</h3>
                <p style={{ margin: 0, fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7 }}>순차적으로 연락드리겠습니다.</p>
              </div>
            ) : (
              <>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>1:1 무료상담 신청</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted-foreground)" }}>아래 정보를 남겨주시면 빠르게 연락드립니다.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="회사명"><Input placeholder="㈜그랜트 랩스" value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} /></Field>
                  <Field label="담당자명"><Input placeholder="홍길동" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></Field>
                </div>

                <Field label="연락처"><Input placeholder="010-0000-0000" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} /></Field>

                <Field label="관심 서비스">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["정책자금", "기업인증", "특허/연구소", "법인설립", "경영지원", "전체 상담"].map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => setForm({...form, interest: opt})}
                        style={{
                          padding: "8px 14px", borderRadius: 8,
                          border: "1px solid var(--border)",
                          background: form.interest === opt ? "var(--primary)" : "var(--background)",
                          color: form.interest === opt ? "var(--primary-foreground)" : "var(--foreground)",
                          fontSize: 13, fontWeight: 500, cursor: "pointer",
                          fontFamily: "var(--font-sans)", transition: "all .15s",
                        }}
                      >{opt}</button>
                    ))}
                  </div>
                </Field>

                <Field label="문의 내용 (선택)">
                  <Textarea placeholder="회사 현황 또는 궁금한 점을 자유롭게 적어주세요." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} style={{ minHeight: 100 }} />
                </Field>

                <Button size="lg" style={{ width: "100%", opacity: sending ? 0.6 : 1 }} iconRight={sending ? null : "arrow-right"} onClick={async () => {
                  if (sending) return;
                  if (!form.name || !form.phone) {
                    alert("담당자명과 연락처를 입력해주세요.");
                    return;
                  }
                  setSending(true);
                  try {
                    await emailjs.send(
                      "service_tcj8otx",
                      "template_8ne6kj3",
                      {
                        company:  form.company,
                        name:     form.name,
                        phone:    form.phone,
                        interest: form.interest,
                        message:  form.message,
                      }
                    );
                  } catch (e) {
                    console.warn("이메일 발송 오류:", e); alert("발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); setSending(false); return;
                  }
                  setSending(false);
                  setSent(true);
                }}>
                  {sending ? "전송 중..." : "1:1 무료상담 신청하기"}
                </Button>
                <p style={{ margin: 0, fontSize: 11.5, color: "var(--muted-foreground)", textAlign: "center", lineHeight: 1.6 }}>
                  제출하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다.
                </p>
              </>
            )}
          </Card>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-grid > *:first-child { order: 2 !important; }
          .contact-grid > *:last-child { order: 1 !important; } }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--foreground)", letterSpacing: "-0.005em" }}>{label}</span>
    {children}
  </label>
);

const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--border)", padding: "56px 0 40px", background: "var(--surface)" }}>
    <div className="container">
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <Logo />
          <p style={{ margin: "20px 0 0", fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 280 }}>
            기업의 성장에 그랜트 랩스가 함께합니다.
          </p>
        </div>
        {[
          { t: "서비스", items: ["정책자금", "기업인증", "특허/연구소", "법인설립", "경영지원"] },
          { t: "회사", items: ["철학", "스토리", "프로세스"] },
          { t: "문의", items: ["jjun96750@gmail.com", "파주시 초롱꽃로 109, 406호"] },
        ].map((col) => (
          <div key={col.t}>
            <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>{col.t}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.items.map((it) => (
                <li key={it}><a href="#" style={{ fontSize: 13.5, color: "var(--muted-foreground)", textDecoration: "none" }}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          © 2026 그랜트 랩스 (Grant Labs)  ·  대표 전희진  ·  사업자등록번호 132-29-15723
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 12, color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}>이용약관</a>
          <a href="#" style={{ fontSize: 12, color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}>개인정보 처리방침</a>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
    `}</style>
  </footer>
);

Object.assign(window, { Contact, Footer, Field });