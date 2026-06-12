/**
 * GrantLabs — Header (sticky top nav)
 */

const Header = ({
  theme,
  onToggleTheme
}) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navItems = [{
    label: "서비스",
    href: "#services"
  }, {
    label: "철학",
    href: "#about"
  }, {
    label: "스토리",
    href: "#story"
  }, {
    label: "프로세스",
    href: "#process"
  }, {
    label: "문의",
    href: "#contact"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: scrolled ? "color-mix(in oklch, var(--background) 88%, transparent)" : "var(--background)",
      backdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "border-color .2s, background .2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 68
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    theme: theme
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    },
    className: "desktop-nav"
  }, navItems.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.href,
    href: item.href,
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--muted-foreground)",
      textDecoration: "none",
      padding: "8px 14px",
      borderRadius: 6,
      transition: "color .15s, background .15s",
      letterSpacing: "-0.005em",
      whiteSpace: "nowrap"
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = "var(--foreground)";
      e.currentTarget.style.background = "var(--accent)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = "var(--muted-foreground)";
      e.currentTarget.style.background = "transparent";
    }
  }, item.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggleTheme,
    "aria-label": "Toggle theme",
    style: {
      height: 36,
      width: 36,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "1px solid var(--border)",
      borderRadius: 8,
      cursor: "pointer",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === "dark" ? "sun" : "moon",
    size: 15
  })), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    href: "#contact",
    iconRight: "arrow-right"
  }, "\uBB34\uB8CC\uC0C1\uB2F4 \uC2E0\uCCAD"))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) { .desktop-nav { display: none !important; } }
      `));
};
const Logo = ({
  theme
}) => {
  const [imgError, setImgError] = React.useState(false);
  if (!imgError && theme !== "dark") {
    return /*#__PURE__*/React.createElement("img", {
      src: "logo.png",
      alt: "Grant Labs",
      onError: () => setImgError(true),
      style: {
        height: 48,
        width: "auto",
        display: "block",
        mixBlendMode: "multiply"
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0,
      color: "var(--foreground)",
      lineHeight: 1,
      userSelect: "none",
      minWidth: 196
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "0.75px",
      background: "currentColor",
      opacity: 0.28,
      marginBottom: 5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 7,
      letterSpacing: "0.24em",
      color: "var(--muted-foreground)",
      textTransform: "uppercase"
    }
  }, "Strategy \xB7 Funding \xB7 Growth"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      lineHeight: 1.1,
      marginTop: 3,
      color: "var(--foreground)"
    }
  }, "Grant Labs"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 6,
      letterSpacing: "0.2em",
      color: "var(--muted-foreground)",
      textTransform: "uppercase",
      marginTop: 4
    }
  }, "Business Growth & Funding Partner"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "0.75px",
      background: "currentColor",
      opacity: 0.28,
      marginTop: 5
    }
  }));
};
Object.assign(window, {
  Header,
  Logo
});
