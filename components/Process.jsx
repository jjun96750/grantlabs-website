/**
 * GrantLabs — Process section
 */

const PROCESS_STEPS = [
  { n: "01", t: "무료 진단", d: "현황 분석 및 사업 매핑", days: "1~2일", icon: "search" },
  { n: "02", t: "전략 설계", d: "성장 로드맵 설계", days: "5~7일", icon: "compass" },
  { n: "03", t: "서류 준비", d: "신청 서류 공동 작성", days: "2~4주", icon: "file-text" },
  { n: "04", t: "신청·대응", d: "심사 전 과정 지원", days: "심사 종료까지", icon: "send" },
  { n: "05", t: "사후관리", d: "집행·갱신 장기 동행", days: "지속", icon: "infinity" },
];

const Process = () => {
  return (
    <section id="process" style={{ padding: "var(--section-y) 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 80 }}>
          <Eyebrow>프로세스</Eyebrow>
          <h2 style={{ margin: "16px 0 18px", fontSize: "clamp(32px, 4.2vw, 48px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            진단부터 사후관리까지<br/>5단계 프로세스
          </h2>
          <p style={{ margin: 0, fontSize: 17, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 620 }}>
            모든 단계는 전담 컨설턴트가 직접 진행하며, 명확한 일정과 결과물 안에서 움직입니다.
          </p>
        </div>

        <div className="flow-container" style={{ position: "relative", marginBottom: 80 }}>
          <div className="flow-line" style={{
            position: "absolute", top: 32, left: "10%", right: "10%",
            height: 1, background: "var(--border)", zIndex: 0,
          }} />
          <div className="flow-progress" style={{
            position: "absolute", top: 32, left: "10%", width: "80%",
            height: 1, background: "var(--foreground)", opacity: 0.15, zIndex: 1,
          }} />

          <div className="flow-grid" style={{
            position: "relative", display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)", gap: 16, zIndex: 2,
          }}>
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.n} className="flow-node" style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", textAlign: "center", position: "relative",
              }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 999,
                  background: "var(--background)",
                  border: "1.5px solid oklch(0.65 0.08 60)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 0 0 4px oklch(0.65 0.08 60 / 0.08)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "oklch(0.45 0.08 60)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}>
                    {["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ"][i]}
                  </span>
                </div>
                <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>
                  STEP {s.n}
                </div>
                <h3 style={{ margin: "10px 0 8px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
                <Badge style={{ fontSize: 11, marginBottom: 12 }}>{s.days}</Badge>
                <p style={{ margin: 0, fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.5, whiteSpace: "nowrap" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", overflow: "hidden" }}>
          <div style={{
            padding: "20px 28px", borderBottom: "1px solid var(--border)",
            background: "var(--surface)", display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
              Deliverables · 단계별 산출물
            </div>
            <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>모든 단계는 문서로 기록되고 공유됩니다</div>
          </div>

          <div className="deliv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
            {[
              { n: "01", items: ["기업 진단 리포트", "활용 가능 사업 리스트"] },
              { n: "02", items: ["성장 로드맵", "분기별 액션 플랜"] },
              { n: "03", items: ["사업계획서", "재무·기술 증빙 패키지"] },
              { n: "04", items: ["기관 제출 일체", "심사 대응 노트"] },
              { n: "05", items: ["집행 가이드", "갱신·연장 알림"] },
            ].map((d, i) => (
              <div key={d.n} className="deliv-cell" style={{ padding: "24px 20px", borderLeft: i === 0 ? "none" : "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--muted-foreground)", marginBottom: 12 }}>STEP {d.n}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {d.items.map((it) => (
                    <li key={it} style={{ fontSize: 13, color: "var(--foreground)", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                      <Icon name="check" size={13} style={{ marginTop: 3, color: "var(--muted-foreground)" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .flow-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 20px !important; }
          .flow-line, .flow-progress { display: none !important; }
          .deliv-grid { grid-template-columns: 1fr 1fr !important; }
          .deliv-cell:nth-child(2) { border-left: 1px solid var(--border) !important; }
          .deliv-cell:nth-child(3), .deliv-cell:nth-child(4), .deliv-cell:nth-child(5) { border-top: 1px solid var(--border); }
          .deliv-cell:nth-child(3) { border-left: none !important; }
          .deliv-cell:nth-child(5) { border-left: none !important; grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .flow-grid { grid-template-columns: 1fr !important; }
          .deliv-grid { grid-template-columns: 1fr !important; }
          .deliv-cell { border-left: none !important; border-top: 1px solid var(--border); }
          .deliv-cell:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Process });
