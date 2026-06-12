"use strict";

/**
 * GrantLabs — About / Philosophy section
 */

var About = function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: "var(--section-y) 0",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: 80,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 96
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\uCCA0\uD559"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "16px 0 24px",
      fontSize: "clamp(32px, 4vw, 44px)",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: 1.15
    }
  }, "\uC2E4\uD589\uB825\uC73C\uB85C", /*#__PURE__*/React.createElement("br", null), "\uC99D\uBA85\uD569\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: "var(--muted-foreground)",
      lineHeight: 1.75,
      margin: 0,
      maxWidth: 380
    }
  }, "\uCEE8\uC124\uD305\uC758 \uAC00\uCE58\uB294 \uACB0\uACFC\uB85C \uB4DC\uB7EC\uB0A9\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("br", null), "\uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uB294 \uBCF4\uACE0\uC11C\uAC00 \uC544\uB2CC, \uAE30\uC5C5\uC758 \uC2E4\uC9C8\uC801 \uBCC0\uD654\uB97C \uB9CC\uB4ED\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      padding: 0,
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px, 2.6vw, 32px)",
      fontWeight: 400,
      fontStyle: "italic",
      lineHeight: 1.4,
      color: "var(--foreground)",
      letterSpacing: "-0.01em",
      borderLeft: "2px solid var(--foreground)",
      paddingLeft: 24
    }
  }, "\"We don't write reports. ", /*#__PURE__*/React.createElement("br", null), "We build companies.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0,
      borderTop: "1px solid var(--border)"
    },
    className: "principles"
  }, [{
    k: "01",
    t: "데이터 기반 진단",
    d: "재무·기술·시장 데이터를 종합해 객관적인 현재 위치와 가능성을 도출합니다."
  }, {
    k: "02",
    t: "맞춤형 설계",
    d: "기업의 업종·규모·성장단계에 맞는 솔루션을 1:1로 설계합니다. 정형 보고서는 없습니다."
  }, {
    k: "03",
    t: "End-to-End 실행",
    d: "신청서 작성·서류 준비·기관 대응까지 끝까지 함께합니다. 자문에서 멈추지 않습니다."
  }, {
    k: "04",
    t: "장기 파트너십",
    d: "한 번의 프로젝트가 아닌, 기업의 성장 사이클 전체를 함께하는 파트너가 됩니다."
  }].map(function (p, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.k,
      style: {
        padding: "32px 28px 32px 0",
        paddingLeft: i % 2 === 1 ? 28 : 0,
        borderLeft: i % 2 === 1 ? "1px solid var(--border)" : "none",
        borderBottom: i < 2 ? "1px solid var(--border)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--muted-foreground)",
        letterSpacing: "0.04em"
      }
    }, p.k), /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: "10px 0 8px",
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: "-0.02em"
      }
    }, p.t), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        color: "var(--muted-foreground)",
        lineHeight: 1.7
      }
    }, p.d));
  }))))), /*#__PURE__*/React.createElement("style", null, "\n        @media (max-width: 880px) {\n          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }\n          .about-grid > div:first-child { position: static !important; }\n          .principles { grid-template-columns: 1fr !important; }\n          .principles > div { padding-left: 0 !important; border-left: none !important; border-bottom: 1px solid var(--border) !important; }\n          .principles > div:last-child { border-bottom: none !important; }\n        }\n      "));
};
Object.assign(window, {
  About: About
});
