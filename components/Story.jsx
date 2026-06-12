/**
 * GrantLabs — Story / CEO Profile section
 */

const Story = () => {
  const [imgError, setImgError] = React.useState(false);
  const [mobile, setMobile] = React.useState(typeof window !== "undefined" && window.innerWidth <= 780);
  React.useEffect(() => {
    const handler = () => setMobile(window.innerWidth <= 780);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const career = [
    { period: "2026 — 현재", role: "그랜트 랩스 (Grant Labs)", title: "대표" },
    { period: "2025 — 2026", role: "더베어앤컴퍼니", title: "기업경영 부문장" },
    { period: "2021 — 2024", role: "부동산 투자사 및 디벨로퍼", title: "본부장" },
    { period: "2004 — 2020", role: "대형그룹사", title: "재무 전략 담당" },
  ];

  const credentials = [
    { label: "학력", value: "고려대학교 정경대학 통계학과 졸업 (2004)" },
    { label: "자격", value: "투자자산운용사 · 펀드투자권유대행인" },
  ];

  return (
    <section id="story" style={{
      padding: "var(--section-y) 0",
      borderTop: "1px solid var(--border)",
    }}>
      <div className="container">
        <Eyebrow>스토리</Eyebrow>
        <h2 style={{
          margin: "16px 0 64px",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}>
          대표 소개
        </h2>

        <div className="story-grid" style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "320px 1fr",
          gap: mobile ? 48 : 80,
          alignItems: "flex-start",
        }}>
          {/* 사진 */}
          <div style={{ position: mobile ? "static" : "sticky", top: mobile ? "auto" : 96 }}>
            <div style={{
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--surface)",
              aspectRatio: "3/4",
              maxWidth: 320,
              border: "1px solid var(--border)",
            }}>
              {!imgError ? (
                <img
                  src="ceo.jpg"
                  alt="전희진 대표"
                  onError={() => setImgError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--surface)", color: "var(--muted-foreground)",
                }}>
                  <Icon name="user" size={64} />
                </div>
              )}
            </div>

            {/* 이름 / 직함 */}
            <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", margin: "0 0 3px" }}>
                전희진
              </p>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 14px", letterSpacing: "0.01em" }}>
                Grant Labs 대표이사
              </p>

              {/* 학력 / 자격증 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {credentials.map((c) => (
                  <div key={c.label} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>
                      {c.label}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0, lineHeight: 1.5, letterSpacing: "-0.005em" }}>
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 커리어 타임라인 */}
          <div>
            <p style={{
              fontSize: 17,
              color: "var(--muted-foreground)",
              lineHeight: 1.85,
              margin: "0 0 64px",
              maxWidth: 520,
              letterSpacing: "-0.005em",
            }}>
              대형그룹사에서 20년간 전략 · 자산개발 실무를 쌓고,
              정책자금 컨설팅 현장에서 경험을 더했습니다.
              지금은 그랜트 랩스를 통해 기업의 성장 과정을 처음부터 끝까지 함께합니다.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {career.map((item, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: 32,
                  padding: "28px 0",
                  borderTop: "1px solid var(--border)",
                  alignItems: "flex-start",
                }}>
                  <span style={{
                    fontSize: 12.5,
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                    fontVariantNumeric: "tabular-nums",
                    paddingTop: 3,
                    letterSpacing: "0.02em",
                  }}>
                    {item.period}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 16, margin: "0 0 5px", letterSpacing: "-0.02em" }}>
                      {item.role}
                    </p>
                    <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0, letterSpacing: "-0.005em" }}>
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Story });