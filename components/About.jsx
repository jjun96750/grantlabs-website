/**
 * GrantLabs — About / Philosophy section
 */

const About = () => {
  return (
    <section id="about" style={{
      padding: "var(--section-y) 0",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="container">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "flex-start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <Eyebrow>철학</Eyebrow>
            <h2 style={{ margin: "16px 0 24px", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              실행력으로<br/>증명합니다
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.75, margin: 0, maxWidth: 380 }}>
              컨설팅의 가치는 결과로 드러납니다.<br/>
              그랜트 랩스는 보고서가 아닌, 기업의 실질적 변화를 만듭니다.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <blockquote style={{
              margin: 0, padding: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 2.6vw, 32px)",
              fontWeight: 400, fontStyle: "italic",
              lineHeight: 1.4, color: "var(--foreground)",
              letterSpacing: "-0.01em",
              borderLeft: "2px solid var(--foreground)",
              paddingLeft: 24,
            }}>
              "We don't write reports. <br/>We build companies."
            </blockquote>

            <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid var(--border)" }} className="principles">
              {[
                { k: "01", t: "데이터 기반 진단", d: "재무·기술·시장 데이터를 종합해 객관적인 현재 위치와 가능성을 도출합니다." },
                { k: "02", t: "맞춤형 설계", d: "기업의 업종·규모·성장단계에 맞는 솔루션을 1:1로 설계합니다. 정형 보고서는 없습니다." },
                { k: "03", t: "End-to-End 실행", d: "신청서 작성·서류 준비·기관 대응까지 끝까지 함께합니다. 자문에서 멈추지 않습니다." },
                { k: "04", t: "장기 파트너십", d: "한 번의 프로젝트가 아닌, 기업의 성장 사이클 전체를 함께하는 파트너가 됩니다." },
              ].map((p, i) => (
                <div key={p.k} style={{
                  padding: "32px 28px 32px 0",
                  paddingLeft: i % 2 === 1 ? 28 : 0,
                  borderLeft: i % 2 === 1 ? "1px solid var(--border)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>{p.k}</span>
                  <h4 style={{ margin: "10px 0 8px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>{p.t}</h4>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.7 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-grid > div:first-child { position: static !important; }
          .principles { grid-template-columns: 1fr !important; }
          .principles > div { padding-left: 0 !important; border-left: none !important; border-bottom: 1px solid var(--border) !important; }
          .principles > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { About });