/**
 * GrantLabs — Contact / CTA + Footer
 */

const Contact = () => {
  const [form, setForm] = React.useState({
    company: "",
    name: "",
    phone: "",
    interest: "정책자금",
    message: ""
  });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const successRef = React.useRef(null);
  React.useEffect(() => {
    if (sent && successRef.current) {
      successRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [sent]);
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "var(--section-y) 0",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "\uBB38\uC758"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "16px 0 24px",
      fontSize: "clamp(36px, 4.6vw, 52px)",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: 1.12
    }
  }, "\uC9C0\uAE08,", /*#__PURE__*/React.createElement("br", null), "\uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uC640 \uC2DC\uC791\uD558\uC138\uC694."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      color: "var(--muted-foreground)",
      lineHeight: 1.75,
      maxWidth: 460
    }
  }, "\uC0C1\uB2F4\uC744 \uC2E0\uCCAD\uD574 \uC8FC\uC2DC\uBA74 \uC804\uB2F4 \uCEE8\uC124\uD134\uD2B8\uAC00 \uC9C1\uC811 \uC5F0\uB77D\uB4DC\uB9BD\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("br", null), "\uBAA8\uB4E0 \uC0C1\uB2F4\uC740 1:1 \uC0C1\uB2F4\uC744 \uD1B5\uD574 \uC9C4\uD589\uB429\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, [{
    i: "phone",
    l: "대표 전화",
    v: "010-5963-7624"
  }, {
    i: "mail",
    l: "이메일",
    v: "jjun96750@gmail.com"
  }, {
    i: "map-pin",
    l: "오피스",
    v: "서울특별시 강남구 역삼로 512, 5층 871호 (대치동, 인테크빌딩)"
  }, {
    i: "clock",
    l: "운영 시간",
    v: "평일 09:00 – 18:00"
  }].map(c => /*#__PURE__*/React.createElement("div", {
    key: c.l,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      border: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--muted-foreground)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.i,
    size: 15
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--muted-foreground)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.04em",
      textTransform: "uppercase"
    }
  }, c.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      marginTop: 4,
      letterSpacing: "-0.005em"
    }
  }, c.v)))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 36,
      gap: 18
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    ref: successRef,
    style: {
      padding: "60px 20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 99,
      background: "oklch(0.62 0.18 145 / 0.12)",
      border: "2px solid oklch(0.62 0.18 145)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    style: {
      color: "oklch(0.62 0.18 145)"
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "4px 0 0",
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "-0.02em"
    }
  }, "\uC0C1\uB2F4\uC2E0\uCCAD \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      color: "var(--muted-foreground)",
      lineHeight: 1.7
    }
  }, "\uC21C\uCC28\uC801\uC73C\uB85C \uC5F0\uB77D\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 4px",
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: "-0.02em"
    }
  }, "1:1 \uBB34\uB8CC\uC0C1\uB2F4 \uC2E0\uCCAD"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: "var(--muted-foreground)"
    }
  }, "\uC544\uB798 \uC815\uBCF4\uB97C \uB0A8\uACA8\uC8FC\uC2DC\uBA74 \uBE60\uB974\uAC8C \uC5F0\uB77D\uB4DC\uB9BD\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\uD68C\uC0AC\uBA85"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u321C\uADF8\uB79C\uD2B8 \uB7A9\uC2A4",
    value: form.company,
    onChange: e => setForm({
      ...form,
      company: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\uB2F4\uB2F9\uC790\uBA85"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\uD64D\uAE38\uB3D9",
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    })
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "\uC5F0\uB77D\uCC98"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "010-0000-0000",
    value: form.phone,
    onChange: e => setForm({
      ...form,
      phone: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\uAD00\uC2EC \uC11C\uBE44\uC2A4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, ["정책자금", "기업인증", "특허/연구소", "법인설립", "경영지원", "전체 상담"].map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt,
    type: "button",
    onClick: () => setForm({
      ...form,
      interest: opt
    }),
    style: {
      padding: "8px 14px",
      borderRadius: 8,
      border: "1px solid var(--border)",
      background: form.interest === opt ? "var(--primary)" : "var(--background)",
      color: form.interest === opt ? "var(--primary-foreground)" : "var(--foreground)",
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      transition: "all .15s"
    }
  }, opt)))), /*#__PURE__*/React.createElement(Field, {
    label: "\uBB38\uC758 \uB0B4\uC6A9 (\uC120\uD0DD)"
  }, /*#__PURE__*/React.createElement(Textarea, {
    placeholder: "\uD68C\uC0AC \uD604\uD669 \uB610\uB294 \uAD81\uAE08\uD55C \uC810\uC744 \uC790\uC720\uB86D\uAC8C \uC801\uC5B4\uC8FC\uC138\uC694.",
    value: form.message,
    onChange: e => setForm({
      ...form,
      message: e.target.value
    }),
    style: {
      minHeight: 100
    }
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    style: {
      width: "100%",
      opacity: sending ? 0.6 : 1
    },
    iconRight: sending ? null : "arrow-right",
    onClick: async () => {
      if (sending) return;
      if (!form.name || !form.phone) {
        alert("담당자명과 연락처를 입력해주세요.");
        return;
      }
      setSending(true);
      try {
        await emailjs.send("service_tcj8otx", "template_8ne6kj3", {
          company: form.company,
          name: form.name,
          phone: form.phone,
          interest: form.interest,
          message: form.message
        });
      } catch (e) {
        console.warn("이메일 발송 오류:", e);
        alert("발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setSending(false);
        return;
      }
      setSending(false);
      setSent(true);
    }
  }, sending ? "전송 중..." : "1:1 무료상담 신청하기"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11.5,
      color: "var(--muted-foreground)",
      textAlign: "center",
      lineHeight: 1.6
    }
  }, "\uC81C\uCD9C\uD558\uC2DC\uBA74 \uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68\uC5D0 \uB3D9\uC758\uD558\uB294 \uAC83\uC73C\uB85C \uAC04\uC8FC\uB429\uB2C8\uB2E4."))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `));
};
const Field = ({
  label,
  children
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12.5,
    fontWeight: 500,
    color: "var(--foreground)",
    letterSpacing: "-0.005em"
  }
}, label), children);
const Footer = () => /*#__PURE__*/React.createElement("footer", {
  style: {
    borderTop: "1px solid var(--border)",
    padding: "56px 0 40px",
    background: "var(--surface)"
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "footer-grid",
  style: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
    gap: 48
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: "20px 0 0",
    fontSize: 13,
    color: "var(--muted-foreground)",
    lineHeight: 1.7,
    maxWidth: 280
  }
}, "\uAE30\uC5C5\uC758 \uC131\uC7A5\uC5D0 \uADF8\uB79C\uD2B8 \uB7A9\uC2A4\uAC00 \uD568\uAED8\uD569\uB2C8\uB2E4.")), [{
  t: "서비스",
  items: ["정책자금", "기업인증", "특허/연구소", "법인설립", "경영지원"]
}, {
  t: "회사",
  items: ["철학", "스토리", "프로세스"]
}, {
  t: "문의",
  items: ["jjun96750@gmail.com", "강남구 역삼로 512, 5층"]
}].map(col => /*#__PURE__*/React.createElement("div", {
  key: col.t
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginBottom: 16
  }
}, col.t), /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
}, col.items.map(it => /*#__PURE__*/React.createElement("li", {
  key: it
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  style: {
    fontSize: 13.5,
    color: "var(--muted-foreground)",
    textDecoration: "none"
  }
}, it))))))), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid var(--border)",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12,
    color: "var(--muted-foreground)",
    lineHeight: 1.7
  }
}, "\xA9 2026 \uADF8\uB79C\uD2B8 \uB7A9\uC2A4 (Grant Labs)  \xB7  \uB300\uD45C \uC804\uD76C\uC9C4  \xB7  \uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638 203-15-67263"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 20
  }
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  style: {
    fontSize: 12,
    color: "var(--muted-foreground)",
    textDecoration: "none",
    whiteSpace: "nowrap"
  }
}, "\uC774\uC6A9\uC57D\uAD00"), /*#__PURE__*/React.createElement("a", {
  href: "#",
  style: {
    fontSize: 12,
    color: "var(--muted-foreground)",
    textDecoration: "none",
    whiteSpace: "nowrap"
  }
}, "\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68")))), /*#__PURE__*/React.createElement("style", null, `
      @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
    `));
Object.assign(window, {
  Contact,
  Footer,
  Field
});
