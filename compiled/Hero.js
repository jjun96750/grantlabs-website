/**
 * GrantLabs — Hero
 */

const Hero = () => {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "",
    style: {
      position: "relative",
      paddingTop: 96,
      paddingBottom: 120,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, transparent 0%, var(--background) 95%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28,
      maxWidth: 920
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    style: {
      alignSelf: "flex-start",
      padding: "5px 12px",
      background: "var(--background)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "oklch(0.62 0.18 145)",
      display: "inline-block"
    }
  }), "\uC0C8\uB85C\uC6B4 \uC2DC\uC791 \xB7 \uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uAC00 \uD568\uAED8\uD569\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-heading)",
      fontSize: "clamp(40px, 6vw, 72px)",
      fontWeight: 700,
      letterSpacing: "-0.035em",
      lineHeight: 1.08,
      color: "var(--foreground)"
    }
  }, "\uC791\uC740 \uAE30\uC5C5\uC758 \uD070 \uB3C4\uC57D,", /*#__PURE__*/React.createElement("br", null), "\uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uAC00 \uD568\uAED8\uD569\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("span", {
    className: "display-serif",
    style: {
      display: "block",
      fontSize: "clamp(26px, 3.6vw, 44px)",
      color: "var(--muted-foreground)",
      marginTop: 14,
      fontWeight: 400
    }
  }, /*#__PURE__*/React.createElement("em", null, "where ambition meets execution."))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 620,
      fontSize: 18,
      lineHeight: 1.75,
      color: "var(--muted-foreground)",
      letterSpacing: "-0.005em"
    }
  }, "\uC815\uCC45\uC790\uAE08, \uAE30\uC5C5\uC778\uC99D, \uD2B9\uD5C8/\uC5F0\uAD6C\uC18C, \uBC95\uC778\uC124\uB9BD, \uACBD\uC601\uC9C0\uC6D0\uAE4C\uC9C0 \u2014", /*#__PURE__*/React.createElement("br", null), "\uAE30\uC5C5\uC758 \uC131\uC7A5 \uB2E8\uACC4\uB9C8\uB2E4 \uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uAC00 \uD568\uAED8\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    href: "#contact",
    iconRight: "arrow-right"
  }, "1:1 \uBB34\uB8CC\uC0C1\uB2F4 \uC2E0\uCCAD\uD558\uAE30"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    href: "#services"
  }, "\uC11C\uBE44\uC2A4 \uC0B4\uD3B4\uBCF4\uAE30"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 96,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)"
    },
    className: "stat-strip"
  }, [{
    k: "01",
    t: "정책자금",
    d: "운전·시설·R&D 자금"
  }, {
    k: "02",
    t: "기업인증",
    d: "벤처·이노비즈·메인비즈"
  }, {
    k: "03",
    t: "특허/연구소",
    d: "특허출원·기업부설연구소"
  }, {
    k: "04",
    t: "법인설립 · 경영지원",
    d: "창업부터 성장까지"
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.k,
    style: {
      padding: "32px 28px",
      borderLeft: i === 0 ? "none" : "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--muted-foreground)",
      letterSpacing: "0.06em"
    }
  }, s.k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "clamp(20px, 2.2vw, 24px)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      fontFamily: "var(--font-heading)"
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted-foreground)"
    }
  }, s.d))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 768px) {
          .stat-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-strip > div:nth-child(2) { border-left: none !important; }
          .stat-strip > div:nth-child(3),
          .stat-strip > div:nth-child(4) { border-top: 1px solid var(--border); }
        }
      `));
};
Object.assign(window, {
  Hero
});
