function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GrantLabs — UI primitives
 */

const Icon = ({
  name,
  size = 16,
  className = "",
  style = {}
}) => /*#__PURE__*/React.createElement("i", {
  "data-lucide": name,
  className: className,
  style: {
    width: size,
    height: size,
    display: "inline-flex",
    flexShrink: 0,
    ...style
  }
});
const Button = ({
  variant = "default",
  size = "default",
  children,
  icon,
  iconRight,
  onClick,
  href,
  style = {},
  ...rest
}) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    borderRadius: 8,
    border: "1px solid transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all .15s ease",
    userSelect: "none",
    textDecoration: "none",
    letterSpacing: "-0.005em"
  };
  const sizes = {
    default: {
      height: 40,
      padding: "0 18px",
      fontSize: 14
    },
    sm: {
      height: 34,
      padding: "0 14px",
      fontSize: 13
    },
    lg: {
      height: 48,
      padding: "0 26px",
      fontSize: 15
    },
    xl: {
      height: 54,
      padding: "0 30px",
      fontSize: 15
    },
    icon: {
      height: 40,
      width: 40,
      padding: 0
    }
  };
  const variants = {
    default: {
      background: "var(--primary)",
      color: "var(--primary-foreground)"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)"
    },
    outline: {
      background: "var(--background)",
      borderColor: "var(--border)",
      color: "var(--foreground)",
      boxShadow: "var(--shadow-xs)"
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)"
    },
    link: {
      background: "transparent",
      color: "var(--foreground)",
      padding: 0,
      height: "auto"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: onClick,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      if (variant === "default") e.currentTarget.style.background = "oklch(0.30 0 0)";
      if (variant === "outline" || variant === "ghost") e.currentTarget.style.background = "var(--accent)";
      if (variant === "secondary") e.currentTarget.style.background = "oklch(0.94 0 0)";
    },
    onMouseLeave: e => {
      Object.assign(e.currentTarget.style, variants[variant]);
    }
  }, rest), icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight,
    size: 15
  }));
};
const Badge = ({
  variant = "outline",
  children,
  style = {}
}) => {
  const variants = {
    default: {
      background: "var(--primary)",
      color: "var(--primary-foreground)"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)"
    },
    outline: {
      background: "transparent",
      border: "1px solid var(--border)",
      color: "var(--foreground)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "3px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: "var(--font-sans)",
      letterSpacing: "-0.005em",
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    }
  }, children);
};
const Card = ({
  children,
  style = {},
  ...rest
}) => /*#__PURE__*/React.createElement("div", _extends({
  style: {
    background: "var(--card)",
    color: "var(--card-foreground)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    boxShadow: "var(--shadow-sm)",
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    ...style
  }
}, rest), children);
const Input = ({
  style = {},
  ...rest
}) => /*#__PURE__*/React.createElement("input", _extends({
  style: {
    height: 44,
    width: "100%",
    padding: "0 14px",
    borderRadius: 8,
    border: "1px solid var(--input)",
    background: "var(--background)",
    color: "var(--foreground)",
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    outline: "none",
    boxShadow: "var(--shadow-xs)",
    ...style
  }
}, rest));
const Textarea = ({
  style = {},
  ...rest
}) => /*#__PURE__*/React.createElement("textarea", _extends({
  style: {
    width: "100%",
    minHeight: 120,
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid var(--input)",
    background: "var(--background)",
    color: "var(--foreground)",
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    outline: "none",
    resize: "vertical",
    boxShadow: "var(--shadow-xs)",
    lineHeight: 1.6,
    ...style
  }
}, rest));
const Eyebrow = ({
  children,
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  className: "eyebrow",
  style: style
}, children);
Object.assign(window, {
  Icon,
  Button,
  Badge,
  Card,
  Input,
  Textarea,
  Eyebrow
});
