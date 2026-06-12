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
  const career = [{
    period: "2026 — 현재",
    role: "그랜트 랩스 (Grant Labs)",
    title: "대표"
  }, {
    period: "2025 — 2026",
    role: "더베어앤컴퍼니",
    title: "기업경영 부문장"
  }, {
    period: "2021 — 2024",
    role: "부동산 투자사 및 디벨로퍼",
    title: "본부장"
  }, {
    period: "2004 — 2020",
    role: "유진그룹",
    title: "비서실 · 전략실 · 재경본부 · AMC"
  }];
  const credentials = [{
    label: "학력",
    value: "고려대학교 정경대학 통계학과 졸업 (2004)"
  }, {
    label: "자격",
    value: "투자자산운용사 · 펀드투자권유대행인"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "story",
    style: {
      padding: "var(--section-y) 0",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\uC2A4\uD1A0\uB9AC"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "16px 0 64px",
      fontSize: "clamp(28px, 3.5vw, 42px)",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: 1.15
    }
  }, "\uB300\uD45C \uC18C\uAC1C"), /*#__PURE__*/React.createElement("div", {
    className: "story-grid",
    style: {
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "320px 1fr",
      gap: mobile ? 48 : 80,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: "hidden",
      background: "var(--surface)",
      aspectRatio: "3/4",
      maxWidth: 320,
      border: "1px solid var(--border)"
    }
  }, !imgError ? /*#__PURE__*/React.createElement("img", {
    src: "ceo.jpg",
    alt: "\uC804\uD76C\uC9C4 \uB300\uD45C",
    onError: () => setImgError(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface)",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 64
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      borderTop: "1px solid var(--border)",
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "-0.02em",
      margin: "0 0 3px"
    }
  }, "\uC804\uD76C\uC9C4"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--muted-foreground)",
      margin: "0 0 14px",
      letterSpacing: "0.01em"
    }
  }, "Grant Labs \uB300\uD45C\uC774\uC0AC"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, credentials.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      fontWeight: 600,
      color: "var(--muted-foreground)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      margin: "0 0 4px"
    }
  }, c.label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      margin: 0,
      lineHeight: 1.5,
      letterSpacing: "-0.005em"
    }
  }, c.value)))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "var(--muted-foreground)",
      lineHeight: 1.85,
      margin: "0 0 64px",
      maxWidth: 520,
      letterSpacing: "-0.005em"
    }
  }, "\uC720\uC9C4\uADF8\uB8F9\uC5D0\uC11C 20\uB144\uAC04 \uC804\uB7B5 \xB7 \uC790\uC0B0\uAC1C\uBC1C \uC2E4\uBB34\uB97C \uC313\uACE0, \uC815\uCC45\uC790\uAE08 \uCEE8\uC124\uD305 \uD604\uC7A5\uC5D0\uC11C \uACBD\uD5D8\uC744 \uB354\uD588\uC2B5\uB2C8\uB2E4. \uC9C0\uAE08\uC740 \uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uB97C \uD1B5\uD574 \uAE30\uC5C5\uC758 \uC131\uC7A5 \uACFC\uC815\uC744 \uCC98\uC74C\uBD80\uD130 \uB05D\uAE4C\uC9C0 \uD568\uAED8\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, career.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "160px 1fr",
      gap: 32,
      padding: "28px 0",
      borderTop: "1px solid var(--border)",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--muted-foreground)",
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      paddingTop: 3,
      letterSpacing: "0.02em"
    }
  }, item.period), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 600,
      fontSize: 16,
      margin: "0 0 5px",
      letterSpacing: "-0.02em"
    }
  }, item.role), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--muted-foreground)",
      margin: 0,
      letterSpacing: "-0.005em"
    }
  }, item.title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border)"
    }
  }))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 780px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `));
};
Object.assign(window, {
  Story
});
