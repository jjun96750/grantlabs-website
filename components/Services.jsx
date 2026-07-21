/**
 * GrantLabs — Services section
 */

const SERVICES = [
  {
    n: "01", icon: "landmark", title: "정책자금", en: "Government Funding",
    desc: "기업의 성장 단계와 사업 목적에 맞는 최적의 정책자금을 발굴하고, 신청부터 실행까지 전 과정을 함께합니다.",
    items: ["운전자금·시설자금 컨설팅", "신용보증기금·기술보증기금 연계", "중소벤처기업진흥공단 정책융자", "지자체 특화 자금 매칭"],
  },
  {
    n: "02", icon: "badge-check", title: "기업인증·특허/연구소", en: "Certification & R&D",
    desc: "벤처·이노비즈·메인비즈 인증부터 특허출원, 기업부설연구소·전담부서 설립까지 기업의 기술력과 가치를 입증합니다.",
    items: ["벤처기업 확인·이노비즈·메인비즈 인증", "특허 출원 및 관리", "기업부설연구소·연구개발전담부서 설립", "R&D 세액공제 적용 지원"],
  },
  {
    n: "03", icon: "building-2", title: "법인설립·경영지원", en: "Corporate Setup & Management",
    desc: "법인 설립부터 마케팅, 세무·노무까지 기업 운영에 필요한 실무를 연결해 지원합니다.",
    items: ["법인설립등기·정관변경·청산등기", "홈페이지 제작·마케팅/홍보", "세무·회계 및 인사·노무 연계", "기타 요청 업무 수행"],
  },
];

const Services = () => {
  return (
    <section id="services" style={{ padding: "var(--section-y) 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 64 }}>
          <Eyebrow>서비스</Eyebrow>
          <h2 style={{ margin: "16px 0 18px", fontSize: "clamp(32px, 4.2vw, 48px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            기업성장의 핵심영역<br/>그랜트 랩스와 함께라면, 다릅니다.
          </h2>
          <p style={{ margin: 0, fontSize: 17, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 620 }}>
            그랜트 랩스는 단발성 자문이 아닌, 기업의 성장 로드맵을 함께 설계합니다.<br/>
            정책자금, 기업인증, 특허/연구소, 법인설립, 경영지원까지 유기적으로 연결합니다.
          </p>
        </div>

        <div className="services-grid-top" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0, border: "1px solid var(--border)", borderRadius: "14px",
          overflow: "hidden", background: "var(--card)",
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCell key={s.n} svc={s} total={3} borderLeft={i > 0} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .services-grid-top { grid-template-columns: 1fr !important; border-radius: 14px !important; }
          .svc-cell { border-left: none !important; border-top: 1px solid var(--border) !important; }
          .svc-cell:first-child { border-top: none !important; }
        }
      `}</style>
    </section>
  );
};

const ServiceCell = ({ svc, total, borderLeft }) => (
  <div className="svc-cell" style={{
    padding: "40px 32px",
    borderLeft: borderLeft ? "1px solid var(--border)" : "none",
    display: "flex", flexDirection: "column", gap: 20,
    minHeight: 400, background: "var(--card)", transition: "background .2s",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--card)"; }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>
        {svc.n} / {String(total).padStart(2, "0")}
      </span>

    </div>

    <div style={{ marginTop: 8 }}>
      <h3 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em" }}>{svc.title}</h3>
      <div className="display-serif" style={{ fontSize: 17, color: "var(--muted-foreground)" }}>{svc.en}</div>
    </div>

    <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted-foreground)", lineHeight: 1.7 }}>{svc.desc}</p>

    <ul style={{
      listStyle: "none", padding: 0, margin: "auto 0 0",
      display: "flex", flexDirection: "column", gap: 10,
      borderTop: "1px solid var(--border)", paddingTop: 20,
    }}>
      {svc.items.map((it) => (
        <li key={it} style={{ fontSize: 13.5, color: "var(--foreground)", display: "flex", alignItems: "flex-start", gap: 10, lineHeight: 1.5 }}>
          <Icon name="check" size={14} style={{ marginTop: 3, color: "var(--muted-foreground)" }} />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

Object.assign(window, { Services, SERVICES });