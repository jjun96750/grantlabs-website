/**
 * GrantLabs — Header (sticky top nav)
 */

const Header = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "서비스", href: "#services" },
    { label: "철학", href: "#about" },
    { label: "스토리", href: "#story" },
    { label: "프로세스", href: "#process" },
    { label: "문의", href: "#contact" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "color-mix(in oklch, var(--background) 88%, transparent)" : "var(--background)",
      backdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "border-color .2s, background .2s",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 68,
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
          <Logo theme={theme} />
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} style={{
              fontSize: 14, fontWeight: 500, color: "var(--muted-foreground)",
              textDecoration: "none", padding: "8px 14px", borderRadius: 6,
              transition: "color .15s, background .15s", letterSpacing: "-0.005em", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.background = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.background = "transparent"; }}>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onToggleTheme} aria-label="Toggle theme" style={{
            height: 36, width: 36, display: "inline-flex", alignItems: "center",
            justifyContent: "center", background: "transparent",
            border: "1px solid var(--border)", borderRadius: 8,
            cursor: "pointer", color: "var(--muted-foreground)",
          }}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
          </button>
          <Button size="sm" href="#contact" iconRight="arrow-right">무료상담 신청</Button>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .desktop-nav { display: none !important; } }
      `}</style>
    </header>
  );
};

const Logo = ({ theme }) => {
  const src = theme === "dark" ? "logo-white.svg" : "logo.svg";
  return (
    <img
      src={src}
      alt="Grant Labs"
      style={{ height: 36, width: "auto", display: "block" }}
    />
  );
};

Object.assign(window, { Header, Logo });
