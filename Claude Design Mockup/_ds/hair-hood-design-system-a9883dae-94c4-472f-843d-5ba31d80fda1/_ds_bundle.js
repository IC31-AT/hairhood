/* @ds-bundle: {"format":4,"namespace":"HairHoodDesignSystem_a9883d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Radio","sourcePath":"components/core/Radio.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Toast","sourcePath":"components/core/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/core/Tooltip.jsx"},{"name":"BarberCard","sourcePath":"components/shop/BarberCard.jsx"},{"name":"HoursTable","sourcePath":"components/shop/HoursTable.jsx"},{"name":"SectionHeading","sourcePath":"components/shop/SectionHeading.jsx"},{"name":"ServiceRow","sourcePath":"components/shop/ServiceRow.jsx"},{"name":"TimeSlotGrid","sourcePath":"components/shop/TimeSlotGrid.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"1b184323f19a","components/core/Button.jsx":"bb787fdd342a","components/core/Card.jsx":"864530361911","components/core/Checkbox.jsx":"f5b292982aef","components/core/Dialog.jsx":"9e6ab74a9478","components/core/IconButton.jsx":"734967291953","components/core/Input.jsx":"e4d7b86990d0","components/core/Radio.jsx":"b60cf2101006","components/core/Select.jsx":"b45c97a6cb45","components/core/Switch.jsx":"437dd862096d","components/core/Tabs.jsx":"f565cd2e52d8","components/core/Tag.jsx":"fdbca7251a87","components/core/Toast.jsx":"50d3c454e99c","components/core/Tooltip.jsx":"d0394ddf55bd","components/shop/BarberCard.jsx":"b895570574cf","components/shop/HoursTable.jsx":"e4e8f57f7522","components/shop/SectionHeading.jsx":"18b566332454","components/shop/ServiceRow.jsx":"0995b6fac28a","components/shop/TimeSlotGrid.jsx":"19fc65e6ee3f","ui_kits/Icon.jsx":"4960f553bb26","ui_kits/booking/BookingSteps.jsx":"d3f297aa4af0","ui_kits/website/Chrome.jsx":"3d048bd71415","ui_kits/website/Sections.jsx":"1c65759ed2fe"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HairHoodDesignSystem_a9883d = window.HairHoodDesignSystem_a9883d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  open: "var(--status-open)",
  closing: "var(--status-closing)",
  closed: "var(--status-closed)",
  neutral: "var(--hh-ink-300)"
};
function Badge({
  tone = "neutral",
  dot = true,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      background: "var(--action-primary-bg)",
      color: "var(--action-primary-fg)",
      borderRadius: "var(--radius-card)",
      padding: "6px var(--space-3)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("i", {
    style: {
      width: 5,
      height: 5,
      background: TONES[tone],
      flex: "0 0 auto"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: "var(--control-h-sm)",
    padding: "0 var(--space-4)",
    fontSize: "var(--fs-100)"
  },
  md: {
    height: "var(--control-h-md)",
    padding: "0 var(--space-6)",
    fontSize: "var(--fs-200)"
  },
  lg: {
    height: "var(--control-h-lg)",
    padding: "0 var(--space-8)",
    fontSize: "var(--fs-200)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const base = {
    ...SIZES[size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-ui)",
    letterSpacing: "var(--ls-ui)",
    textTransform: "uppercase",
    borderRadius: "var(--radius-control)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    background: "none",
    width: full ? "100%" : "auto",
    whiteSpace: "nowrap",
    transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
    transform: press && !disabled ? "scale(var(--press-scale))" : "none"
  };
  const skins = {
    primary: {
      background: disabled ? "var(--action-disabled-bg)" : press ? "var(--action-primary-bg-active)" : hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
      color: disabled ? "var(--action-disabled-fg)" : "var(--action-primary-fg)"
    },
    secondary: {
      background: hover && !disabled ? "var(--action-secondary-bg-hover)" : "transparent",
      color: disabled ? "var(--action-disabled-fg)" : hover ? "var(--action-secondary-fg-hover)" : "var(--action-secondary-fg)",
      boxShadow: "inset 0 0 0 var(--border-w) " + (disabled ? "var(--action-disabled-bg)" : "var(--action-secondary-border)")
    },
    ghost: {
      background: hover && !disabled ? "var(--action-ghost-bg-hover)" : "transparent",
      color: disabled ? "var(--action-disabled-fg)" : "var(--action-ghost-fg)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...skins[variant],
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = "hairline",
  padding = "var(--space-6)",
  as: Tag = "div",
  children,
  style,
  ...rest
}) {
  const skins = {
    hairline: {
      background: "var(--surface-card)",
      boxShadow: "inset 0 0 0 1px var(--border-hairline)"
    },
    strong: {
      background: "var(--surface-card)",
      boxShadow: "inset 0 0 0 2px var(--border-strong)"
    },
    sunken: {
      background: "var(--surface-sunken)"
    },
    inverse: {
      background: "var(--hh-black)",
      color: "var(--hh-white)"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      borderRadius: "var(--radius-card)",
      padding,
      boxShadow: "var(--shadow-card)",
      ...skins[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: "0 0 auto",
      display: "grid",
      placeItems: "center",
      background: checked ? "var(--action-primary-bg)" : "var(--surface-card)",
      boxShadow: "inset 0 0 0 " + (checked ? "0" : "1.5px") + " var(--border-strong)",
      borderRadius: "var(--radius-control)",
      transition: "var(--transition-control)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 5,
      borderLeft: "2px solid var(--action-primary-fg)",
      borderBottom: "2px solid var(--action-primary-fg)",
      transform: "rotate(-45deg) translateY(-1px)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  label,
  size = "md",
  variant = "ghost",
  disabled = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const skins = {
    ghost: {
      background: hover && !disabled ? "var(--action-ghost-bg-hover)" : "transparent",
      color: "var(--action-ghost-fg)"
    },
    solid: {
      background: hover && !disabled ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
      color: "var(--action-primary-fg)"
    },
    outline: {
      background: hover && !disabled ? "var(--action-secondary-bg-hover)" : "transparent",
      color: hover && !disabled ? "var(--action-secondary-fg-hover)" : "var(--action-secondary-fg)",
      boxShadow: "inset 0 0 0 var(--border-w) var(--action-secondary-border)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dim,
      height: dim,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "var(--transition-control)",
      ...skins[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  onClose,
  footer,
  children,
  width = 520
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--surface-scrim)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-overlay)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      fontSize: "var(--fs-600)",
      lineHeight: "var(--lh-tight)",
      color: "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "relative",
      width: 16,
      height: 16,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 7,
      left: 0,
      width: 16,
      height: 1.5,
      background: "currentColor",
      transform: "rotate(45deg)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 7,
      left: 0,
      width: 16,
      height: 1.5,
      background: "currentColor",
      transform: "rotate(-45deg)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-3)",
      padding: "var(--space-6)",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  prefix,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useMemo(() => "hh-i-" + Math.random().toString(36).slice(2, 7), []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: "var(--control-h-md)",
      padding: "0 var(--space-4)",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-control)",
      boxShadow: "inset 0 0 0 " + (error || focus ? "var(--border-w)" : "1px") + " " + (error ? "var(--hh-danger-500)" : focus ? "var(--border-strong)" : "var(--border-default)"),
      outline: focus ? "2px solid var(--focus-ring)" : "none",
      outlineOffset: 2,
      transition: "var(--transition-control)"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-300)",
      color: "var(--text-muted)"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-300)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }, rest))), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-100)",
      color: error ? "var(--hh-danger-500)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Radio.jsx
try { (() => {
function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: !!checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: "0 0 auto",
      borderRadius: "var(--radius-pill)",
      display: "grid",
      placeItems: "center",
      boxShadow: "inset 0 0 0 1.5px var(--border-strong)",
      background: "var(--surface-card)",
      transition: "var(--transition-control)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "var(--radius-pill)",
      background: "var(--border-strong)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Radio.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      width: "100%",
      height: "var(--control-h-md)",
      padding: "0 var(--space-10) 0 var(--space-4)",
      background: "var(--surface-card)",
      color: "var(--text-strong)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-300)",
      border: "none",
      borderRadius: "var(--radius-control)",
      boxShadow: "inset 0 0 0 " + (focus ? "var(--border-w) var(--border-strong)" : "1px var(--border-default)"),
      outline: focus ? "2px solid var(--focus-ring)" : "none",
      outlineOffset: 2,
      cursor: "pointer",
      transition: "var(--transition-control)"
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "var(--space-4)",
      top: "50%",
      transform: "translateY(-60%) rotate(45deg)",
      width: 7,
      height: 7,
      borderRight: "1.5px solid var(--text-strong)",
      borderBottom: "1.5px solid var(--text-strong)",
      pointerEvents: "none"
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-100)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: !!checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 44,
      height: 24,
      flex: "0 0 auto",
      background: checked ? "var(--action-primary-bg)" : "var(--action-disabled-bg)",
      borderRadius: "var(--radius-control)",
      padding: 3,
      boxSizing: "border-box",
      display: "flex",
      justifyContent: checked ? "flex-end" : "flex-start",
      transition: "background-color var(--dur-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      background: "var(--action-primary-fg)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)",
      ...style
    }
  }, items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(it.value),
      style: {
        appearance: "none",
        background: "none",
        border: "none",
        padding: "0 0 var(--space-3) 0",
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: active ? "var(--text-strong)" : "var(--text-muted)",
        boxShadow: active ? "inset 0 -2px 0 var(--border-strong)" : "none",
        transition: "var(--transition-control)"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: clickable ? "button" : undefined,
    tabIndex: clickable ? 0 : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 30,
      padding: "0 var(--space-3)",
      borderRadius: "var(--radius-control)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      cursor: clickable ? "pointer" : "default",
      background: selected ? "var(--action-primary-bg)" : hover && clickable ? "var(--action-ghost-bg-hover)" : "transparent",
      color: selected ? "var(--action-primary-fg)" : "var(--text-body)",
      boxShadow: selected ? "none" : "inset 0 0 0 1px var(--border-default)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
function Toast({
  tone = "neutral",
  children,
  onDismiss,
  style
}) {
  const accents = {
    neutral: "var(--hh-white)",
    success: "var(--status-open)",
    error: "var(--status-closed)"
  };
  const words = {
    neutral: "Note",
    success: "Done",
    error: "Stop"
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      background: "var(--hh-black)",
      color: "var(--hh-white)",
      padding: "var(--space-4) var(--space-5)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-2)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-200)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: accents[tone],
      flex: "0 0 auto"
    }
  }, words[tone]), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderLeft: "1px solid var(--hh-alpha-white-16)",
      paddingLeft: "var(--space-4)"
    }
  }, children), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    style: {
      appearance: "none",
      background: "none",
      border: "none",
      color: "var(--hh-alpha-white-64)",
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase"
    }
  }, "Dismiss"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

// components/core/Tooltip.jsx
try { (() => {
function Tooltip({
  content,
  placement = "top",
  children,
  style
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === "bottom" ? {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      zIndex: 40,
      whiteSpace: "nowrap",
      background: "var(--hh-black)",
      color: "var(--hh-white)",
      padding: "6px var(--space-3)",
      borderRadius: "var(--radius-card)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-ui)",
      boxShadow: "var(--shadow-2)"
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/shop/BarberCard.jsx
try { (() => {
function BarberCard({
  name,
  role,
  signature,
  note,
  photoLabel = "Photo",
  available,
  onBook,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      boxShadow: "inset 0 0 0 1px var(--border-hairline)",
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 5",
      background: "var(--hh-ink-600)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)",
      opacity: hover ? 1 : 0.7,
      transition: "opacity var(--dur-base) var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--space-3)",
      left: "var(--space-3)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--hh-alpha-white-64)"
    }
  }, photoLabel), signature && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "var(--space-4)",
      left: "var(--space-4)",
      fontFamily: "var(--font-script)",
      fontSize: 44,
      lineHeight: 1,
      color: "var(--hh-white)"
    }
  }, signature)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-600)",
      lineHeight: "var(--lh-tight)",
      textTransform: "uppercase",
      color: "var(--text-strong)"
    }
  }, name), role && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, role), note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      fontSize: "var(--fs-200)",
      color: "var(--text-body)"
    }
  }, note), available && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--fs-200)",
      color: "var(--text-muted)"
    }
  }, "Next free \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontWeight: "var(--fw-semibold)"
    }
  }, available)), onBook && /*#__PURE__*/React.createElement("button", {
    onClick: onBook,
    style: {
      marginTop: "var(--space-4)",
      height: "var(--control-h-sm)",
      border: "none",
      background: hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
      color: "var(--action-primary-fg)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "var(--transition-control)"
    }
  }, "Book ", name && name.split(" ")[0])));
}
Object.assign(__ds_scope, { BarberCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shop/BarberCard.jsx", error: String((e && e.message) || e) }); }

// components/shop/HoursTable.jsx
try { (() => {
function HoursTable({
  rows = [],
  today,
  style
}) {
  return /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "grid",
      gridTemplateColumns: "1fr auto",
      ...style
    }
  }, rows.map(r => {
    const isToday = r.day === today;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: r.day
    }, /*#__PURE__*/React.createElement("dt", {
      style: {
        padding: "var(--space-3) 0",
        borderBottom: "1px solid var(--border-hairline)",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: isToday ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, r.day), /*#__PURE__*/React.createElement("dd", {
      style: {
        margin: 0,
        padding: "var(--space-3) 0",
        borderBottom: "1px solid var(--border-hairline)",
        textAlign: "right",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-ui)",
        color: r.hours ? isToday ? "var(--text-strong)" : "var(--text-body)" : "var(--text-subtle)"
      }
    }, r.hours || "Closed"));
  }));
}
Object.assign(__ds_scope, { HoursTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shop/HoursTable.jsx", error: String((e && e.message) || e) }); }

// components/shop/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  motto,
  lede,
  align = "left",
  size = "md",
  action,
  style
}) {
  const sizes = {
    sm: "var(--fs-600)",
    md: "var(--fs-700)",
    lg: "var(--fs-800)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-8)",
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      alignItems: align === "center" ? "center" : "flex-start",
      margin: align === "center" ? "0 auto" : 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: sizes[size],
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--ls-display)",
      textTransform: "uppercase",
      color: "var(--text-strong)"
    }
  }, title), motto && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-script)",
      fontSize: "var(--fs-600)",
      lineHeight: 1.1,
      color: "var(--text-muted)",
      marginTop: "var(--space-1)"
    }
  }, motto), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      maxWidth: "var(--measure-prose)",
      fontSize: "var(--fs-300)",
      lineHeight: "var(--lh-normal)",
      color: "var(--text-body)"
    }
  }, lede)), action);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shop/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/shop/ServiceRow.jsx
try { (() => {
function ServiceRow({
  name,
  description,
  duration,
  price,
  selected = false,
  onSelect,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onSelect;
  return /*#__PURE__*/React.createElement("div", {
    role: clickable ? "button" : undefined,
    tabIndex: clickable ? 0 : undefined,
    onClick: onSelect,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-4)",
      padding: "var(--space-4) var(--space-4)",
      margin: "0 calc(var(--space-4) * -1)",
      borderBottom: "1px solid var(--border-hairline)",
      cursor: clickable ? "pointer" : "default",
      background: selected ? "var(--action-primary-bg)" : hover && clickable ? "var(--action-ghost-bg-hover)" : "transparent",
      color: selected ? "var(--action-primary-fg)" : "inherit",
      transition: "var(--transition-control)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-300)",
      letterSpacing: "var(--ls-ui)",
      textTransform: "uppercase",
      color: selected ? "var(--action-primary-fg)" : "var(--text-strong)"
    }
  }, name), description && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: "var(--fs-200)",
      color: selected ? "var(--action-primary-fg)" : "var(--text-muted)",
      opacity: selected ? 0.7 : 1
    }
  }, description)), duration && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: selected ? "var(--action-primary-fg)" : "var(--text-muted)",
      opacity: selected ? 0.7 : 1,
      whiteSpace: "nowrap"
    }
  }, duration), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-500)",
      letterSpacing: "var(--ls-ui)",
      lineHeight: 1,
      color: selected ? "var(--action-primary-fg)" : "var(--text-strong)",
      whiteSpace: "nowrap"
    }
  }, price));
}
Object.assign(__ds_scope, { ServiceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shop/ServiceRow.jsx", error: String((e && e.message) || e) }); }

// components/shop/TimeSlotGrid.jsx
try { (() => {
function TimeSlotGrid({
  slots = [],
  value,
  onChange,
  columns = 6,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(" + columns + ", minmax(0,1fr))",
      gap: "var(--space-2)",
      ...style
    }
  }, slots.map(s => {
    const selected = s.time === value;
    const disabled = s.taken;
    return /*#__PURE__*/React.createElement("button", {
      key: s.time,
      disabled: disabled,
      onClick: () => onChange && onChange(s.time),
      style: {
        height: "var(--control-h-md)",
        border: "none",
        borderRadius: "var(--radius-control)",
        cursor: disabled ? "not-allowed" : "pointer",
        background: disabled ? "transparent" : selected ? "var(--action-primary-bg)" : "var(--surface-card)",
        color: disabled ? "var(--text-subtle)" : selected ? "var(--action-primary-fg)" : "var(--text-strong)",
        boxShadow: "inset 0 0 0 1px " + (disabled ? "var(--border-hairline)" : selected ? "var(--action-primary-bg)" : "var(--border-default)"),
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-ui)",
        textDecoration: disabled ? "line-through" : "none",
        transition: "var(--transition-control)"
      }
    }, s.time);
  }));
}
Object.assign(__ds_scope, { TimeSlotGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shop/TimeSlotGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/Icon.jsx
try { (() => {
// Lucide (CDN) wrapper — outline glyphs at 1.75 stroke, currentColor. See readme.md > Iconography.
// lucide.icons.<Name> is the children array only, so the <svg> wrapper is built here.
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.innerHTML = "";
    try {
      const icons = window.lucide && window.lucide.icons || {};
      const key = name.split("-").map(p => p[0].toUpperCase() + p.slice(1)).join("");
      const children = icons[key] || icons[name];
      if (!children || !window.lucide.createElement) return;
      const svg = window.lucide.createElement(["svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, children]);
      node.appendChild(svg);
    } catch (err) {
      console.warn("Icon failed:", name, err);
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      ...style
    }
  });
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booking/BookingSteps.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const B_SERVICES = [{
  name: "Skin fade",
  description: "Clipper work into a bare skin taper.",
  duration: "45 min",
  price: "£28"
}, {
  name: "Scissor cut",
  description: "Dry cut, shaped and finished.",
  duration: "40 min",
  price: "£26"
}, {
  name: "Cut & beard",
  description: "Full cut with the beard lined.",
  duration: "60 min",
  price: "£38"
}, {
  name: "Beard trim",
  description: "Shaped, lined, hot-towel finished.",
  duration: "20 min",
  price: "£15"
}, {
  name: "Hot towel shave",
  description: "Traditional wet shave, twice over.",
  duration: "45 min",
  price: "£30"
}];
const B_BARBERS = [{
  name: "Any barber",
  role: "First free chair",
  available: "Today 15:00"
}, {
  name: "Reece",
  role: "Owner · Barber",
  signature: "Reece",
  available: "Today 15:30"
}, {
  name: "Marco",
  role: "Senior barber",
  available: "Today 16:00"
}, {
  name: "Dan",
  role: "Barber",
  available: "Tomorrow 9:30"
}];
const DAYS = [{
  label: "Thu",
  date: "14 Aug",
  key: "thu",
  free: 6
}, {
  label: "Fri",
  date: "15 Aug",
  key: "fri",
  free: 2
}, {
  label: "Sat",
  date: "16 Aug",
  key: "sat",
  free: 0
}, {
  label: "Mon",
  date: "18 Aug",
  key: "mon",
  free: 9
}, {
  label: "Tue",
  date: "19 Aug",
  key: "tue",
  free: 7
}];
const SLOTS = {
  thu: [{
    time: "9:00"
  }, {
    time: "9:30",
    taken: true
  }, {
    time: "10:00"
  }, {
    time: "10:30"
  }, {
    time: "11:00",
    taken: true
  }, {
    time: "11:30"
  }, {
    time: "12:00"
  }, {
    time: "13:00",
    taken: true
  }, {
    time: "13:30"
  }, {
    time: "14:00"
  }, {
    time: "14:30",
    taken: true
  }, {
    time: "15:00"
  }],
  fri: [{
    time: "9:00",
    taken: true
  }, {
    time: "9:30",
    taken: true
  }, {
    time: "10:00",
    taken: true
  }, {
    time: "16:30"
  }, {
    time: "17:00"
  }],
  sat: [],
  mon: [{
    time: "9:00"
  }, {
    time: "9:30"
  }, {
    time: "10:00"
  }, {
    time: "10:30",
    taken: true
  }, {
    time: "11:00"
  }, {
    time: "11:30"
  }, {
    time: "12:00"
  }, {
    time: "13:00"
  }, {
    time: "13:30"
  }],
  tue: [{
    time: "9:00"
  }, {
    time: "10:00"
  }, {
    time: "10:30"
  }, {
    time: "11:00"
  }, {
    time: "12:00"
  }, {
    time: "13:30"
  }, {
    time: "14:00"
  }]
};
function Stepper({
  step,
  steps
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      display: "flex",
      gap: 0,
      listStyle: "none",
      margin: 0,
      padding: 0,
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, steps.map((label, i) => {
    const done = i < step,
      active = i === step;
    return /*#__PURE__*/React.createElement("li", {
      key: label,
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-4) var(--space-4) 0",
        boxShadow: active ? "inset 0 -2px 0 var(--border-strong)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        flex: "0 0 auto",
        display: "grid",
        placeItems: "center",
        background: done || active ? "var(--action-primary-bg)" : "transparent",
        color: done || active ? "var(--action-primary-fg)" : "var(--text-subtle)",
        boxShadow: done || active ? "none" : "inset 0 0 0 1px var(--border-default)",
        fontFamily: "var(--font-ui)",
        fontSize: 10
      }
    }, done ? "✓" : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: active ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, label));
  }));
}
function ChooseService({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Step one",
    title: "What are you having?",
    motto: "take your pick",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, B_SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceRow, _extends({
    key: s.name
  }, s, {
    selected: value === s.name,
    onSelect: () => onChange(s.name)
  })))));
}
function ChooseBarber({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Step two",
    title: "Who's cutting?",
    motto: "know your barber",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0,1fr))",
      gap: "var(--space-3)"
    }
  }, B_BARBERS.map(b => {
    const sel = value === b.name;
    return /*#__PURE__*/React.createElement("button", {
      key: b.name,
      onClick: () => onChange(b.name),
      style: {
        textAlign: "left",
        border: "none",
        cursor: "pointer",
        padding: "var(--space-5)",
        background: sel ? "var(--action-primary-bg)" : "var(--surface-card)",
        color: sel ? "var(--action-primary-fg)" : "var(--text-strong)",
        boxShadow: "inset 0 0 0 " + (sel ? "2px var(--action-primary-bg)" : "1px var(--border-hairline)"),
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-600)",
        textTransform: "uppercase",
        lineHeight: .9
      }
    }, b.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: sel ? "var(--action-primary-fg)" : "var(--text-muted)",
        opacity: sel ? 0.7 : 1
      }
    }, b.role), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-4)",
        fontSize: "var(--fs-200)",
        color: sel ? "var(--action-primary-fg)" : "var(--text-body)"
      }
    }, "Next free \xB7 ", b.available));
  })));
}
function ChooseTime({
  day,
  onDay,
  time,
  onTime
}) {
  const slots = SLOTS[day] || [];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Step three",
    title: "When suits?",
    motto: "pick your hour",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      display: "flex",
      gap: "var(--space-2)"
    }
  }, DAYS.map(d => {
    const sel = d.key === day,
      none = d.free === 0;
    return /*#__PURE__*/React.createElement("button", {
      key: d.key,
      onClick: () => {
        onDay(d.key);
        onTime(null);
      },
      disabled: none,
      style: {
        flex: 1,
        border: "none",
        cursor: none ? "not-allowed" : "pointer",
        padding: "var(--space-3) var(--space-2)",
        background: sel ? "var(--action-primary-bg)" : "transparent",
        color: none ? "var(--text-subtle)" : sel ? "var(--action-primary-fg)" : "var(--text-strong)",
        boxShadow: "inset 0 0 0 1px " + (sel ? "var(--action-primary-bg)" : "var(--border-default)"),
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        opacity: .75
      }
    }, d.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-300)",
        letterSpacing: "var(--ls-ui)",
        textTransform: "uppercase",
        lineHeight: 1.2,
        marginTop: 4
      }
    }, d.date), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        fontFamily: "var(--font-ui)",
        fontSize: 10,
        color: none ? "inherit" : sel ? "var(--action-primary-fg)" : "var(--text-muted)",
        opacity: sel ? 0.7 : 1
      }
    }, none ? "Full" : d.free + " free"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, slots.length ? /*#__PURE__*/React.createElement(TimeSlotGrid, {
    columns: 6,
    slots: slots,
    value: time,
    onChange: onTime
  }) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-300)",
      color: "var(--text-muted)"
    }
  }, "Nothing left on this day. Try another.")));
}
function Details({
  form,
  onField
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Step four",
    title: "Your details",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Who's in the chair?",
    value: form.name,
    onChange: e => onField("name", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mobile number",
    prefix: "+44",
    placeholder: "7700 900123",
    value: form.phone,
    onChange: e => onField("phone", e.target.value),
    hint: "We'll text you the day before."
  }), /*#__PURE__*/React.createElement(Select, {
    label: "First time here?",
    options: [{
      value: "no",
      label: "No, been before"
    }, {
      value: "yes",
      label: "Yes, first visit"
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Notes for your barber",
    placeholder: "Number two on the sides",
    value: form.notes,
    onChange: e => onField("notes", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Text me a reminder the day before",
    checked: form.remind,
    onChange: e => onField("remind", e.target.checked)
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Add me to the cancellation list for earlier slots",
    checked: form.waitlist,
    onChange: e => onField("waitlist", e.target.checked)
  })));
}
function Confirmed({
  summary,
  onRestart
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-10) 0"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Booked",
    title: "You're in.",
    motto: "welcome to my hood",
    lede: "We'll text you the day before. Arrive five minutes early and take a drink from the bar."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)",
      borderTop: "2px solid var(--border-strong)",
      borderBottom: "1px solid var(--border-hairline)",
      padding: "var(--space-6) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0,1fr))",
      gap: "var(--space-6)"
    }
  }, summary.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    className: "hh-eyebrow"
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-400)",
      letterSpacing: "var(--ls-ui)",
      textTransform: "uppercase",
      lineHeight: 1.1,
      color: "var(--text-strong)"
    }
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 18
    })
  }, "Add to calendar"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onRestart
  }, "Book another")));
}
Object.assign(window, {
  Stepper,
  ChooseService,
  ChooseBarber,
  ChooseTime,
  Details,
  Confirmed,
  B_SERVICES,
  B_BARBERS,
  DAYS,
  SLOTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booking/BookingSteps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const NAV = [["Cuts", "menu"], ["The chairs", "team"], ["The hood", "hood"], ["Visit", "visit"]];
function Header({
  solid,
  onNav,
  onBook
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "hh-inverse",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: solid ? "rgba(0,0,0,.86)" : "transparent",
      backdropFilter: solid ? "var(--blur-glass)" : "none",
      borderBottom: solid ? "1px solid var(--border-hairline)" : "1px solid transparent",
      transition: "background-color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)",
      height: 76,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    },
    style: {
      border: "none",
      fontFamily: "var(--font-logo)",
      fontSize: 30,
      lineHeight: 1,
      letterSpacing: "var(--ls-logo)",
      textTransform: "uppercase",
      color: "var(--hh-white)"
    }
  }, "Hair Hood"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-8)",
      marginLeft: "auto"
    }
  }, NAV.map(([label, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#" + id,
    onClick: e => {
      e.preventDefault();
      onNav(id);
    },
    style: {
      border: "none",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--hh-alpha-white-64)"
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--hh-white)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--hh-alpha-white-64)"
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+447307453917",
    style: {
      border: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-ui)",
      color: "var(--hh-alpha-white-64)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16
  }), "07307 453917"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: onBook
  }, "Book a chair"))));
}
function Footer({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "hh-inverse",
    style: {
      background: "var(--hh-black)",
      color: "var(--hh-white)",
      padding: "var(--space-20) 0 var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gap: "var(--space-16)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-logo)",
      fontSize: 30,
      textTransform: "uppercase",
      letterSpacing: "var(--ls-logo)",
      lineHeight: .9
    }
  }, "Hair Hood"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-script)",
      fontSize: 30,
      lineHeight: 1.1,
      color: "var(--hh-white)",
      marginTop: "var(--space-2)"
    }
  }, "Welcome to my hood"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-4)",
      fontSize: "var(--fs-200)",
      color: "var(--hh-alpha-white-64)",
      maxWidth: "38ch"
    }
  }, "Barbering, a bar and a wall worth looking at. Whiteladies Road, Clifton."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginTop: "var(--space-6)"
    }
  }, ["instagram", "map-pin", "phone"].map(n => /*#__PURE__*/React.createElement(IconButton, {
    key: n,
    label: n,
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n,
    size: 18
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hh-eyebrow",
    style: {
      color: "var(--hh-ink-300)"
    }
  }, "Shop"), NAV.map(([label, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#" + id,
    onClick: e => {
      e.preventDefault();
      onNav(id);
    },
    style: {
      border: "none",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--hh-alpha-white-64)"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hh-eyebrow",
    style: {
      color: "var(--hh-ink-300)"
    }
  }, "Find us"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-300)",
      color: "var(--hh-alpha-white-64)",
      lineHeight: "var(--lh-normal)"
    }
  }, "91B Whiteladies Road", /*#__PURE__*/React.createElement("br", null), "Clifton, Bristol", /*#__PURE__*/React.createElement("br", null), "BS8 2NT"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-16)",
      paddingTop: "var(--space-6)",
      borderTop: "1px solid var(--accent-metal)",
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--hh-ink-400)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Hair Hood LTD"), /*#__PURE__*/React.createElement("span", null, "Bristol, UK"))));
}
Object.assign(window, {
  Header,
  Footer,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SERVICES = [{
  name: "Skin fade",
  description: "Clipper work taken down into a bare skin taper.",
  duration: "45 min",
  price: "£28"
}, {
  name: "Scissor cut",
  description: "Dry cut, shaped and finished with product.",
  duration: "40 min",
  price: "£26"
}, {
  name: "Cut & beard",
  description: "Full cut with the beard lined and trimmed.",
  duration: "60 min",
  price: "£38"
}, {
  name: "Beard trim",
  description: "Shaped, lined and hot-towel finished.",
  duration: "20 min",
  price: "£15"
}, {
  name: "Hot towel shave",
  description: "Traditional wet shave, twice over.",
  duration: "45 min",
  price: "£30"
}, {
  name: "Kids cut (under 12)",
  description: "Same cut, shorter wait.",
  duration: "30 min",
  price: "£18"
}];
const TEAM = [{
  name: "Reece",
  role: "Owner · Barber",
  signature: "Reece",
  note: "Skin fades and sharp lines. Twelve years behind the chair.",
  available: "Today 15:30"
}, {
  name: "Marco",
  role: "Senior barber",
  note: "Scissor work, textured crops, beard shaping.",
  available: "Today 16:00"
}, {
  name: "Dan",
  role: "Barber",
  note: "Classic cuts and hot towel shaves.",
  available: "Tomorrow 9:30"
}];
const HOURS = [{
  day: "Monday"
}, {
  day: "Tuesday",
  hours: "9:00 – 18:00"
}, {
  day: "Wednesday",
  hours: "9:00 – 18:00"
}, {
  day: "Thursday",
  hours: "9:00 – 19:00"
}, {
  day: "Friday",
  hours: "9:00 – 19:00"
}, {
  day: "Saturday",
  hours: "8:30 – 17:00"
}, {
  day: "Sunday"
}];
function PhotoPlaceholder({
  label,
  ratio = "4 / 3",
  scrim = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      background: "var(--hh-ink-600)",
      overflow: "hidden",
      ...style
    }
  }, scrim && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-image)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--space-3)",
      left: "var(--space-4)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--hh-alpha-white-64)"
    }
  }, label), children);
}
function Hero({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hh-inverse",
    style: {
      position: "relative",
      background: "var(--hh-black)",
      marginTop: -76,
      paddingTop: 76,
      minHeight: 620,
      display: "flex",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--hh-ink-800)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-image)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 100,
      right: "var(--gutter-inline-lg)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--fs-100)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--hh-alpha-white-64)"
    }
  }, "Photo placeholder \u2014 shopfront"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg) var(--space-20)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "open"
  }, "Open now \xB7 until 19:00"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "var(--space-6) 0 0",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(72px, 11vw, 148px)",
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--ls-display)",
      textTransform: "uppercase",
      color: "var(--hh-white)",
      maxWidth: "16ch"
    }
  }, "Sharp,", /*#__PURE__*/React.createElement("br", null), "every time"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-script)",
      fontSize: "clamp(34px, 4vw, 56px)",
      lineHeight: 1.05,
      color: "var(--hh-white)",
      marginTop: "var(--space-4)"
    }
  }, "Welcome to my hood"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-5)",
      fontSize: "var(--fs-400)",
      color: "var(--hh-alpha-white-64)",
      maxWidth: "44ch"
    }
  }, "Clifton's barbershop. A chair, a drink from the bar, and out looking sharper than you came in."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onBook
  }, "Book a chair"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-down",
      size: 18
    })
  }, "See the menu"))));
}
function Menu({
  onBook
}) {
  const [tab, setTab] = React.useState("all");
  const shown = tab === "all" ? SERVICES : tab === "beards" ? SERVICES.filter(s => /beard|shave/i.test(s.name)) : SERVICES.filter(s => /cut|fade/i.test(s.name));
  return /*#__PURE__*/React.createElement("section", {
    id: "menu",
    style: {
      background: "var(--hh-bone-050)",
      padding: "var(--section-y-lg) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The menu",
    title: "Cuts & prices",
    motto: "same for every chair",
    lede: "Every cut finishes with a hot towel. Take a drink from the bar while you wait.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onBook
    }, "Book a chair")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)",
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: "var(--space-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "all",
      label: "Everything"
    }, {
      value: "cuts",
      label: "Cuts"
    }, {
      value: "beards",
      label: "Beards & shaves"
    }],
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: "var(--space-6)"
    }
  }), shown.map(s => /*#__PURE__*/React.createElement(ServiceRow, _extends({
    key: s.name
  }, s, {
    onSelect: onBook
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "2px solid var(--border-strong)",
      paddingTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hh-eyebrow"
  }, "Walk-ins"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-4)",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, "Walk-ins welcome when a chair is free. Booking is safer, especially Friday and Saturday."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      paddingTop: "var(--space-6)",
      borderTop: "1px solid var(--border-hairline)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, [["credit-card", "Card and cash"], ["users", "Three chairs"], ["clock", "Last cut 30 min before close"]].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "center",
      fontSize: "var(--fs-200)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 18
  }), t)))))));
}
function Team({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "team",
    style: {
      background: "var(--hh-white)",
      padding: "var(--section-y-lg) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The chairs",
    title: "Who's cutting",
    motto: "know your barber",
    lede: "Book a name, or leave it to whoever's free."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)",
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0,1fr))",
      gap: "var(--space-6)"
    }
  }, TEAM.map(b => /*#__PURE__*/React.createElement(BarberCard, _extends({
    key: b.name
  }, b, {
    photoLabel: "Photo placeholder",
    onBook: onBook
  }))))));
}
function Gallery() {
  const [filter, setFilter] = React.useState("all");
  const tags = [["all", "All"], ["fades", "Fades"], ["crops", "Crops"], ["beards", "Beards"]];
  return /*#__PURE__*/React.createElement("section", {
    id: "gallery",
    className: "hh-inverse",
    style: {
      background: "var(--hh-black)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The work",
    title: "Fresh out the chair",
    motto: "straight from the chair",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-2)"
      }
    }, tags.map(([v, l]) => /*#__PURE__*/React.createElement(Tag, {
      key: v,
      selected: filter === v,
      onClick: () => setFilter(v)
    }, l)))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)",
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0,1fr))",
      gap: 2
    }
  }, [1, 2, 3, 4, 5, 6, 7, 8].map(i => /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    key: i,
    ratio: "1 / 1",
    label: "Cut " + i
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-6)",
      fontSize: "var(--fs-200)",
      color: "var(--hh-ink-300)"
    }
  }, "Placeholders \u2014 no photography was supplied with the brand assets.")));
}
function Visit() {
  return /*#__PURE__*/React.createElement("section", {
    id: "visit",
    style: {
      background: "var(--hh-white)",
      padding: "var(--section-y-lg) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Find us",
    title: "91B Whiteladies Road",
    motto: "the door is black",
    lede: "Clifton, Bristol BS8 2NT. Two minutes from the Whiteladies Road bus stops."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, [["phone", "07307 453917"], ["instagram", "@hairhood_"], ["map-pin", "Street parking on Aberdeen Road"]].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "center",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 18
  }), t))), /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    label: "Map placeholder",
    ratio: "16 / 9",
    style: {
      marginTop: "var(--space-8)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "2px solid var(--border-strong)",
      paddingTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hh-eyebrow"
  }, "Opening hours"), /*#__PURE__*/React.createElement(Badge, {
    tone: "open"
  }, "Open now")), /*#__PURE__*/React.createElement(HoursTable, {
    today: "Thursday",
    rows: HOURS,
    style: {
      marginTop: "var(--space-5)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-6)",
      fontSize: "var(--fs-200)",
      color: "var(--text-muted)"
    }
  }, "Last appointment 30 minutes before closing. Hours unconfirmed \u2014 check with the shop."))));
}
function Hood() {
  return /*#__PURE__*/React.createElement("section", {
    id: "hood",
    style: {
      background: "var(--surface-marble)",
      padding: "var(--section-y-lg) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-inline-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The hood",
    title: "A bar, and a wall worth looking at",
    motto: "welcome to my hood",
    lede: "Barbering with the door shut behind you. Take a drink from the bar at the back; the art changes when we find something better."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)",
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    label: "Photo placeholder \u2014 the bar",
    ratio: "16 / 9"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: "1fr auto"
    }
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    label: "Photo placeholder \u2014 studded antlers",
    ratio: "auto",
    style: {
      height: "100%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      height: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-art-ruby)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-art-silver)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-art-sapphire)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)",
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0,1fr))",
      gap: "var(--space-8)"
    }
  }, [["Members' feel, open door", "No membership, no attitude. Just a room that treats you like a regular from the first cut."], ["The bar", "Beer, whisky or a coffee while you wait. Included, not upsold."], ["Curated pieces", "Monochrome prints and jewelled antlers. Ask about any of it."]].map(([h, p]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      borderTop: "1px solid var(--border-metal)",
      paddingTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h3", null, h), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--fs-300)",
      color: "var(--text-body)"
    }
  }, p))))));
}
Object.assign(window, {
  Hero,
  Menu,
  Team,
  Gallery,
  Hood,
  Visit,
  PhotoPlaceholder,
  SERVICES,
  TEAM,
  HOURS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.BarberCard = __ds_scope.BarberCard;

__ds_ns.HoursTable = __ds_scope.HoursTable;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceRow = __ds_scope.ServiceRow;

__ds_ns.TimeSlotGrid = __ds_scope.TimeSlotGrid;

})();
