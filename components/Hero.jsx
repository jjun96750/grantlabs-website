/**
 * GrantLabs — Hero (fullscreen slider, Eugene-style)
 */

const SLIDES = [
  {
    bg: "linear-gradient(135deg, oklch(0.14 0.03 250) 0%, oklch(0.10 0.02 260) 100%)",
    eyebrow: "기업의 성장에 함께합니다",
    headline: "작은 기업의 큰 도약,\n그랜트 랩스가\n함께합니다.",
    sub: "정책자금, 기업인증, 특허/연구소, 법인설립, 경영지원까지\n기업의 성장 단계마다 그랜트 랩스가 함께합니다.",
  },
  {
    bg: "linear-gradient(135deg, oklch(0.12 0.02 160) 0%, oklch(0.09 0.015 200) 100%)",
    eyebrow: "기업인증 · 특허",
    headline: "벤처·이노비즈·메인비즈,\n인증 하나로\n달라지는 기업의 위상.",
    sub: "기업인증부터 특허출원, 기업부설연구소 설립까지\n체계적으로 지원합니다.",
  },

];

const HeroSlider = () => {
  const [idx, setIdx] = React.useState(0);
  const [fade, setFade] = React.useState(true);

  const go = (next) => {
    setFade(false);
    setTimeout(() => {
      setIdx((next + SLIDES.length) % SLIDES.length);
      setFade(true);
    }, 320);
  };

  React.useEffect(() => {
    const t = setInterval(() => go(idx + 1), 6000);
    return () => clearInterval(t);
  }, [idx]);

  const slide = SLIDES[idx];

  return (
    <section id="top" style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden",
    }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: slide.bg,
        transition: "background 0.6s ease",
        zIndex: 0,
      }} />

      {/* Dot grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        zIndex: 1,
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "40%",
        background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        zIndex: 2,
      }} />

      {/* Content */}
      <div className="container" style={{
        position: "relative", zIndex: 3,
        paddingBottom: 80, paddingTop: 120,
      }}>
        <div style={{
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          <div style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.55)",
            marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 22, height: 1, background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
            {slide.eyebrow}
          </div>

          <h1 style={{
            margin: 0,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            color: "#ffffff",
            whiteSpace: "pre-line",
            maxWidth: 820,
          }}>{slide.headline}</h1>

          <p style={{
            margin: "24px 0 0",
            fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.65)",
            whiteSpace: "pre-line",
            maxWidth: 500,
          }}>{slide.sub}</p>

          <div style={{ display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap" }}>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px",
              background: "#ffffff", color: "#111",
              borderRadius: 8, fontWeight: 600, fontSize: 15,
              textDecoration: "none", letterSpacing: "-0.01em",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              무료 진단 신청하기
            </a>
            <a href="#services" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px",
              background: "transparent", color: "#ffffff",
              border: "1.5px solid rgba(255,255,255,0.35)",
              borderRadius: 8, fontWeight: 500, fontSize: 15,
              textDecoration: "none", letterSpacing: "-0.01em",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"}
            >
              서비스 살펴보기
            </a>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
            {["무료 진단", "1~2일 내 회신", "전담 컨설턴트 직접 연락"].map(t => (
              <span key={t} style={{
                fontSize: 12, color: "rgba(255,255,255,0.5)",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Nav row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          marginTop: 64,
        }}>
          {/* Arrows */}
          {[
            { dir: -1, path: "M15 19l-7-7 7-7" },
            { dir: 1, path: "M9 5l7 7-7 7" },
          ].map(({ dir, path }) => (
            <button key={dir} onClick={() => go(idx + dir)} style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.45)",
              background: "transparent", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={path} />
              </svg>
            </button>
          ))}

          {/* Counter */}
          <span style={{
            fontSize: 13, color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.04em", marginLeft: 4,
          }}>
            {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{
                width: i === idx ? 24 : 6,
                height: 6, borderRadius: 3,
                background: i === idx ? "#ffffff" : "rgba(255,255,255,0.3)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero: HeroSlider });
