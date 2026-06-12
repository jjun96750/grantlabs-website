/**
 * GrantLabs — Services section
 */

const SERVICES = [{
  n: "01",
  icon: "landmark",
  title: "정책자금",
  en: "Government Funding",
  desc: "기업의 성장 단계와 사업 목적에 맞는 최적의 정책자금을 발굴하고, 신청부터 실행까지 전 과정을 함께합니다.",
  items: ["운전자금·시설자금 컨설팅", "신용보증기금·기술보증기금 연계", "중소벤처기업진흥공단 정책융자", "지자체 특화 자금 매칭"]
}, {
  n: "02",
  icon: "badge-check",
  title: "기업인증",
  en: "Corporate Certification",
  desc: "벤처·이노비즈·메인비즈 인증으로 기업 가치를 입증하고 세제·금융·판로 혜택을 확보합니다.",
  items: ["벤처기업 확인 (혁신성장 유형)", "이노비즈 (기술혁신형 중소기업)", "메인비즈 (경영혁신형 중소기업)", "사후관리 및 갱신 컨설팅"]
}, {
  n: "03",
  icon: "flask-conical",
  title: "특허/연구소",
  en: "Patent & R&D Center",
  desc: "특허 출원과 기업부설연구소·전담부서 설립으로 R&D 세액공제와 정부지원사업 자격을 확보합니다.",
  items: ["특허 출원 및 관리", "기업부설연구소 신고", "연구개발전담부서 설립", "R&D 세액공제 적용 지원"]
}, {
  n: "04",
  icon: "building-2",
  title: "법인설립",
  en: "Corporation Setup",
  desc: "법인 설립 등기부터 사업자 개설까지, 창업 초기의 복잡한 절차를 빠르고 정확하게 처리합니다.",
  items: ["법인 설립 등기 대행", "사업자 등록 및 인허가 연계", "사업계획서 작성 지원", "창업 초기 세무·노무 연계"]
}, {
  n: "05",
  icon: "briefcase",
  title: "경영지원",
  en: "Business Management",
  desc: "투자 유치부터 정부지원사업 신청까지, 기업 운영 전반에 걸친 맞춤형 경영 전략을 함께 설계합니다.",
  items: ["사업계획서·IR 자료 작성", "정부지원사업 신청 대행", "투자 유치 전략 수립", "세무·노무·법무 전문가 연계"]
}];
const Services = () => {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: "var(--section-y) 0",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\uC11C\uBE44\uC2A4"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "16px 0 18px",
      fontSize: "clamp(32px, 4.2vw, 48px)",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: 1.15
    }
  }, "\uAE30\uC5C5\uC131\uC7A5\uC758 \uD575\uC2EC\uC601\uC5ED", /*#__PURE__*/React.createElement("br", null), "\uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uC640 \uD568\uAED8\uB77C\uBA74, \uB2E4\uB985\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      color: "var(--muted-foreground)",
      lineHeight: 1.7,
      maxWidth: 620
    }
  }, "\uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uB294 \uB2E8\uBC1C\uC131 \uC790\uBB38\uC774 \uC544\uB2CC, \uAE30\uC5C5\uC758 \uC131\uC7A5 \uB85C\uB4DC\uB9F5\uC744 \uD568\uAED8 \uC124\uACC4\uD569\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("br", null), "\uC815\uCC45\uC790\uAE08, \uAE30\uC5C5\uC778\uC99D, \uD2B9\uD5C8/\uC5F0\uAD6C\uC18C, \uBC95\uC778\uC124\uB9BD, \uACBD\uC601\uC9C0\uC6D0\uAE4C\uC9C0 \uC720\uAE30\uC801\uC73C\uB85C \uC5F0\uACB0\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "services-grid-top",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid var(--border)",
      borderRadius: "14px 14px 0 0",
      overflow: "hidden",
      background: "var(--card)"
    }
  }, SERVICES.slice(0, 3).map((s, i) => /*#__PURE__*/React.createElement(ServiceCell, {
    key: s.n,
    svc: s,
    total: 5,
    borderLeft: i > 0
  }))), /*#__PURE__*/React.createElement("div", {
    className: "services-grid-bottom",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 0,
      border: "1px solid var(--border)",
      borderTop: "none",
      borderRadius: "0 0 14px 14px",
      overflow: "hidden",
      background: "var(--card)"
    }
  }, SERVICES.slice(3).map((s, i) => /*#__PURE__*/React.createElement(ServiceCell, {
    key: s.n,
    svc: s,
    total: 5,
    borderLeft: i > 0
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .services-grid-top, .services-grid-bottom { grid-template-columns: 1fr !important; }
          .services-grid-top { border-radius: 14px 14px 0 0 !important; }
          .services-grid-bottom { border-radius: 0 0 14px 14px !important; }
          .svc-cell { border-left: none !important; border-top: 1px solid var(--border) !important; }
          .svc-cell:first-child { border-top: none !important; }
        }
      `));
};
const ServiceCell = ({
  svc,
  total,
  borderLeft
}) => /*#__PURE__*/React.createElement("div", {
  className: "svc-cell",
  style: {
    padding: "40px 32px",
    borderLeft: borderLeft ? "1px solid var(--border)" : "none",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    minHeight: 400,
    background: "var(--card)",
    transition: "background .2s"
  },
  onMouseEnter: e => {
    e.currentTarget.style.background = "var(--surface)";
  },
  onMouseLeave: e => {
    e.currentTarget.style.background = "var(--card)";
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--muted-foreground)",
    letterSpacing: "0.04em"
  }
}, svc.n, " / ", String(total).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
  style: {
    width: 38,
    height: 38,
    borderRadius: 8,
    border: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--foreground)"
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: svc.icon,
  size: 18
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 8
  }
}, /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: "0 0 4px",
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: "-0.025em"
  }
}, svc.title), /*#__PURE__*/React.createElement("div", {
  className: "display-serif",
  style: {
    fontSize: 17,
    color: "var(--muted-foreground)"
  }
}, svc.en)), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 14.5,
    color: "var(--muted-foreground)",
    lineHeight: 1.7
  }
}, svc.desc), /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: "none",
    padding: 0,
    margin: "auto 0 0",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderTop: "1px solid var(--border)",
    paddingTop: 20
  }
}, svc.items.map(it => /*#__PURE__*/React.createElement("li", {
  key: it,
  style: {
    fontSize: 13.5,
    color: "var(--foreground)",
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    lineHeight: 1.5
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "check",
  size: 14,
  style: {
    marginTop: 3,
    color: "var(--muted-foreground)"
  }
}), it))));
Object.assign(window, {
  Services,
  SERVICES
});
