/**
 * GrantLabs Contact / CTA + Footer
 */

const BUSINESS_OPTIONS = ["제조업", "제조업 외", "콘텐츠업", "광고대행업", "디자인", "기타"];
const REGION_OPTIONS = ["수도권", "경상도", "전라도", "충청도", "강원도", "제주도", "기타"];
const REVENUE_OPTIONS = ["1억 미만", "1억~4억", "4억 이상"];
const CREDIT_OPTIONS = ["800점 이상", "800점 미만", "700점 미만"];

const Contact = () => {
  const [form, setForm] = React.useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    business: "",
    region: "",
    revenue: "",
    credit: "",
    interest: "정책자금",
    message: "",
  });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const crmApiUrl = (window.GRANTLABS_CRM_API_URL || "").trim();

  const leadDetails = [
    `업종: ${form.business || "미선택"}`,
    `지역: ${form.region || "미선택"}`,
    `매출액: ${form.revenue || "미선택"}`,
    `신용점수: ${form.credit || "미선택"}`,
    `이메일: ${form.email || "미입력"}`,
    `관심 서비스: ${form.interest || "미선택"}`,
    `회사명: ${form.company || "미입력"}`,
    `담당자명: ${form.name || "미입력"}`,
    `전화번호: ${form.phone || "미입력"}`,
    `추가 문의: ${form.message || "없음"}`,
  ].join("\n");

  const submitLeadToCrm = async () => {
    if (!crmApiUrl) return { skipped: true };
    const lead = {
      receivedAt: new Date().toISOString().slice(0, 16),
      source: "홈페이지",
      name: form.name,
      company: form.company,
      phone: form.phone,
      email: form.email,
      business: form.business,
      industry: form.business,
      region: form.region,
      credit: form.credit,
      revenue: form.revenue,
      founded: "",
      tax: "확인필요",
      owner: "담당자 선택",
      tmStatus: "대기중",
      meeting: "",
      interest: form.interest,
      message: leadDetails,
      memo: form.message,
    };

    const response = await fetch(crmApiUrl, {
      method: "POST",
      body: JSON.stringify({ action: "createLead", lead }),
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "CRM 저장 실패");
    return result;
  };

  const submitForm = async () => {
    if (sending) return;
    if (!form.business || !form.region || !form.revenue || !form.credit || !form.phone) {
      alert("업종, 지역, 매출액, 신용점수, 전화번호를 모두 입력해주세요.");
      return;
    }
    setSending(true);
    try {
      await submitLeadToCrm();
      await emailjs.send(
        "service_tcj8otx",
        "template_8ne6kj3",
        {
          company: form.company,
          name: form.name,
          phone: form.phone,
          email: form.email,
          industry: form.business,
          business: form.business,
          region: form.region,
          revenue: form.revenue,
          credit_score: form.credit,
          credit: form.credit,
          interest: form.interest,
          message: leadDetails,
          lead_details: leadDetails,
          __crm_saved: "true",
        },
        { publicKey: "UUfoZdh404On9fZbm" }
      );
      setSent(true);
    } catch (e) {
      console.warn("상담 신청 오류:", e);
      alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. " + (e?.text || e?.message || JSON.stringify(e)));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "var(--section-y) 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "flex-start" }}>
          <div>
            <Eyebrow>무료 진단</Eyebrow>
            <h2 style={{ margin: "16px 0 24px", fontSize: "clamp(36px, 4.6vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.12 }}>
              30초 입력으로<br />가능 여부를 먼저 확인하세요
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.75, maxWidth: 460 }}>
              업종, 지역, 매출, 신용점수와 연락처를 남겨주시면<br />
              Grant Labs가 현재 조건 기준으로 상담 방향을 안내드립니다.
            </p>

            <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { i: "phone", l: "대표 전화", v: "010-5963-7624" },
                { i: "mail", l: "이메일", v: "jjun96750@gmail.com" },
                { i: "map-pin", l: "오피스", v: "경기도 파주시 초롱꽃로 109, 406호 (동패동, 팜스타워)" },
                { i: "clock", l: "운영 시간", v: "평일 09:00 - 18:00" },
              ].map((c) => (
                <div key={c.l} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--muted-foreground)", flexShrink: 0,
                  }}>
                    <Icon name={c.i} size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.l}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4, letterSpacing: "-0.005em" }}>{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card style={{ padding: 36, gap: 18 }}>
            {sent ? (
              <div style={{ padding: "60px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 99, background: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={24} />
                </div>
                <h3 style={{ margin: "8px 0 4px", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>무료 진단 신청이 접수되었습니다</h3>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>남겨주신 조건을 확인한 뒤 빠르게 연락드리겠습니다.</p>
              </div>
            ) : (
              <>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>정책자금 가능 여부 무료 진단</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted-foreground)" }}>객관식으로 빠르게 선택하고 연락처를 남겨주세요.</p>
                </div>

                <OptionGroup label="업종" value={form.business} options={BUSINESS_OPTIONS} onChange={(value) => updateForm("business", value)} />
                <OptionGroup label="지역" value={form.region} options={REGION_OPTIONS} onChange={(value) => updateForm("region", value)} />
                <OptionGroup label="매출액" value={form.revenue} options={REVENUE_OPTIONS} onChange={(value) => updateForm("revenue", value)} />
                <OptionGroup label="신용점수" value={form.credit} options={CREDIT_OPTIONS} onChange={(value) => updateForm("credit", value)} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="회사명 (선택)"><Input placeholder="㈜그랜트랩스" value={form.company} onChange={(e) => updateForm("company", e.target.value)} /></Field>
                  <Field label="담당자명 (선택)"><Input placeholder="홍길동" value={form.name} onChange={(e) => updateForm("name", e.target.value)} /></Field>
                </div>

                <Field label="전화번호"><Input placeholder="010-0000-0000" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} /></Field>
                <Field label="이메일"><Input placeholder="name@example.com" value={form.email} onChange={(e) => updateForm("email", e.target.value)} /></Field>

                <Field label="관심 서비스">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["정책자금", "기업인증", "특허/연구소", "법인설립", "경영지원", "전체 상담"].map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => updateForm("interest", opt)}
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
                  <Textarea placeholder="회사 현황 또는 궁금한 점을 자유롭게 적어주세요." value={form.message} onChange={(e) => updateForm("message", e.target.value)} style={{ minHeight: 100 }} />
                </Field>

                <Button size="lg" style={{ width: "100%", opacity: sending ? 0.6 : 1 }} iconRight={sending ? null : "arrow-right"} onClick={submitForm}>
                  {sending ? "전송 중..." : "무료 진단 신청하기"}
                </Button>
                <p style={{ margin: 0, fontSize: 11.5, color: "var(--muted-foreground)", textAlign: "center", lineHeight: 1.6 }}>
                  본 상담은 참고 안내이며, 최종 승인 및 조건은 심사 기관 기준에 따라 달라질 수 있습니다.
                </p>
              </>
            )}
          </Card>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
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

const OptionGroup = ({ label, options, value, onChange }) => (
  <Field label={label}>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{
        minHeight: 46,
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--background)",
        color: "var(--foreground)",
        boxShadow: "var(--shadow-xs)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        outline: "none",
      }}
    >
      <option value="">선택해주세요</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </Field>
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
          © 2026 그랜트 랩스 (Grant Labs) · 대표 전희진 · 사업자등록번호 132-29-15723
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

Object.assign(window, { Contact, Footer, Field, OptionGroup });
