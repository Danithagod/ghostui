import { jsxs as p, jsx as e, Fragment as re } from "react/jsx-runtime";
import H, { forwardRef as Ye, createElement as we, useState as S, useId as lt, isValidElement as ct, cloneElement as dt, useEffect as W, createContext as pt, useContext as ut, useCallback as mt, useRef as ht } from "react";
import { motion as d, AnimatePresence as B, LayoutGroup as ft } from "framer-motion";
import { createPortal as gt } from "react-dom";
function We(t) {
  var r, o, a = "";
  if (typeof t == "string" || typeof t == "number") a += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (r = 0; r < s; r++) t[r] && (o = We(t[r])) && (a && (a += " "), a += o);
  } else for (o in t) t[o] && (a && (a += " "), a += o);
  return a;
}
function Ne() {
  for (var t, r, o = 0, a = "", s = arguments.length; o < s; o++) (t = arguments[o]) && (r = We(t)) && (a && (a += " "), a += r);
  return a;
}
const bt = (t, r) => {
  const o = new Array(t.length + r.length);
  for (let a = 0; a < t.length; a++)
    o[a] = t[a];
  for (let a = 0; a < r.length; a++)
    o[t.length + a] = r[a];
  return o;
}, yt = (t, r) => ({
  classGroupId: t,
  validator: r
}), Qe = (t = /* @__PURE__ */ new Map(), r = null, o) => ({
  nextPart: t,
  validators: r,
  classGroupId: o
}), me = "-", $e = [], xt = "arbitrary..", vt = (t) => {
  const r = kt(t), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: a
  } = t;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return wt(i);
      const c = i.split(me), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Xe(c, l, r);
    },
    getConflictingClassGroupIds: (i, c) => {
      if (c) {
        const l = a[i], u = o[i];
        return l ? u ? bt(u, l) : l : u || $e;
      }
      return o[i] || $e;
    }
  };
}, Xe = (t, r, o) => {
  if (t.length - r === 0)
    return o.classGroupId;
  const s = t[r], n = o.nextPart.get(s);
  if (n) {
    const u = Xe(t, r + 1, n);
    if (u) return u;
  }
  const i = o.validators;
  if (i === null)
    return;
  const c = r === 0 ? t.join(me) : t.slice(r).join(me), l = i.length;
  for (let u = 0; u < l; u++) {
    const f = i[u];
    if (f.validator(c))
      return f.classGroupId;
  }
}, wt = (t) => t.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = t.slice(1, -1), o = r.indexOf(":"), a = r.slice(0, o);
  return a ? xt + a : void 0;
})(), kt = (t) => {
  const {
    theme: r,
    classGroups: o
  } = t;
  return Nt(o, r);
}, Nt = (t, r) => {
  const o = Qe();
  for (const a in t) {
    const s = t[a];
    Ce(s, o, a, r);
  }
  return o;
}, Ce = (t, r, o, a) => {
  const s = t.length;
  for (let n = 0; n < s; n++) {
    const i = t[n];
    Ct(i, r, o, a);
  }
}, Ct = (t, r, o, a) => {
  if (typeof t == "string") {
    Mt(t, r, o);
    return;
  }
  if (typeof t == "function") {
    It(t, r, o, a);
    return;
  }
  zt(t, r, o, a);
}, Mt = (t, r, o) => {
  const a = t === "" ? r : He(r, t);
  a.classGroupId = o;
}, It = (t, r, o, a) => {
  if (St(t)) {
    Ce(t(a), r, o, a);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(yt(o, t));
}, zt = (t, r, o, a) => {
  const s = Object.entries(t), n = s.length;
  for (let i = 0; i < n; i++) {
    const [c, l] = s[i];
    Ce(l, He(r, c), o, a);
  }
}, He = (t, r) => {
  let o = t;
  const a = r.split(me), s = a.length;
  for (let n = 0; n < s; n++) {
    const i = a[n];
    let c = o.nextPart.get(i);
    c || (c = Qe(), o.nextPart.set(i, c)), o = c;
  }
  return o;
}, St = (t) => "isThemeGetter" in t && t.isThemeGetter === !0, Lt = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, o = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
  const s = (n, i) => {
    o[n] = i, r++, r > t && (r = 0, a = o, o = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(n) {
      let i = o[n];
      if (i !== void 0)
        return i;
      if ((i = a[n]) !== void 0)
        return s(n, i), i;
    },
    set(n, i) {
      n in o ? o[n] = i : s(n, i);
    }
  };
}, ke = "!", Ge = ":", _t = [], Oe = (t, r, o, a, s) => ({
  modifiers: t,
  hasImportantModifier: r,
  baseClassName: o,
  maybePostfixModifierPosition: a,
  isExternal: s
}), Bt = (t) => {
  const {
    prefix: r,
    experimentalParseClassName: o
  } = t;
  let a = (s) => {
    const n = [];
    let i = 0, c = 0, l = 0, u;
    const f = s.length;
    for (let N = 0; N < f; N++) {
      const M = s[N];
      if (i === 0 && c === 0) {
        if (M === Ge) {
          n.push(s.slice(l, N)), l = N + 1;
          continue;
        }
        if (M === "/") {
          u = N;
          continue;
        }
      }
      M === "[" ? i++ : M === "]" ? i-- : M === "(" ? c++ : M === ")" && c--;
    }
    const x = n.length === 0 ? s : s.slice(l);
    let C = x, k = !1;
    x.endsWith(ke) ? (C = x.slice(0, -1), k = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      x.startsWith(ke) && (C = x.slice(1), k = !0)
    );
    const w = u && u > l ? u - l : void 0;
    return Oe(n, k, C, w);
  };
  if (r) {
    const s = r + Ge, n = a;
    a = (i) => i.startsWith(s) ? n(i.slice(s.length)) : Oe(_t, !1, i, void 0, !0);
  }
  if (o) {
    const s = a;
    a = (n) => o({
      className: n,
      parseClassName: s
    });
  }
  return a;
}, At = (t) => {
  const r = /* @__PURE__ */ new Map();
  return t.orderSensitiveModifiers.forEach((o, a) => {
    r.set(o, 1e6 + a);
  }), (o) => {
    const a = [];
    let s = [];
    for (let n = 0; n < o.length; n++) {
      const i = o[n], c = i[0] === "[", l = r.has(i);
      c || l ? (s.length > 0 && (s.sort(), a.push(...s), s = []), a.push(i)) : s.push(i);
    }
    return s.length > 0 && (s.sort(), a.push(...s)), a;
  };
}, Tt = (t) => ({
  cache: Lt(t.cacheSize),
  parseClassName: Bt(t),
  sortModifiers: At(t),
  ...vt(t)
}), $t = /\s+/, Gt = (t, r) => {
  const {
    parseClassName: o,
    getClassGroupId: a,
    getConflictingClassGroupIds: s,
    sortModifiers: n
  } = r, i = [], c = t.trim().split($t);
  let l = "";
  for (let u = c.length - 1; u >= 0; u -= 1) {
    const f = c[u], {
      isExternal: x,
      modifiers: C,
      hasImportantModifier: k,
      baseClassName: w,
      maybePostfixModifierPosition: N
    } = o(f);
    if (x) {
      l = f + (l.length > 0 ? " " + l : l);
      continue;
    }
    let M = !!N, $ = a(M ? w.substring(0, N) : w);
    if (!$) {
      if (!M) {
        l = f + (l.length > 0 ? " " + l : l);
        continue;
      }
      if ($ = a(w), !$) {
        l = f + (l.length > 0 ? " " + l : l);
        continue;
      }
      M = !1;
    }
    const O = C.length === 0 ? "" : C.length === 1 ? C[0] : n(C).join(":"), F = k ? O + ke : O, T = F + $;
    if (i.indexOf(T) > -1)
      continue;
    i.push(T);
    const E = s($, M);
    for (let j = 0; j < E.length; ++j) {
      const L = E[j];
      i.push(F + L);
    }
    l = f + (l.length > 0 ? " " + l : l);
  }
  return l;
}, Ot = (...t) => {
  let r = 0, o, a, s = "";
  for (; r < t.length; )
    (o = t[r++]) && (a = qe(o)) && (s && (s += " "), s += a);
  return s;
}, qe = (t) => {
  if (typeof t == "string")
    return t;
  let r, o = "";
  for (let a = 0; a < t.length; a++)
    t[a] && (r = qe(t[a])) && (o && (o += " "), o += r);
  return o;
}, Pt = (t, ...r) => {
  let o, a, s, n;
  const i = (l) => {
    const u = r.reduce((f, x) => x(f), t());
    return o = Tt(u), a = o.cache.get, s = o.cache.set, n = c, c(l);
  }, c = (l) => {
    const u = a(l);
    if (u)
      return u;
    const f = Gt(l, o);
    return s(l, f), f;
  };
  return n = i, (...l) => n(Ot(...l));
}, Et = [], I = (t) => {
  const r = (o) => o[t] || Et;
  return r.isThemeGetter = !0, r;
}, Ue = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ze = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Rt = /^\d+\/\d+$/, Ft = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, jt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Vt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Dt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Yt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, K = (t) => Rt.test(t), v = (t) => !!t && !Number.isNaN(Number(t)), Y = (t) => !!t && Number.isInteger(Number(t)), xe = (t) => t.endsWith("%") && v(t.slice(0, -1)), D = (t) => Ft.test(t), Wt = () => !0, Qt = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  jt.test(t) && !Vt.test(t)
), Ke = () => !1, Xt = (t) => Dt.test(t), Ht = (t) => Yt.test(t), qt = (t) => !m(t) && !h(t), Ut = (t) => ee(t, tt, Ke), m = (t) => Ue.test(t), X = (t) => ee(t, ot, Qt), ve = (t) => ee(t, to, v), Pe = (t) => ee(t, Je, Ke), Zt = (t) => ee(t, et, Ht), de = (t) => ee(t, rt, Xt), h = (t) => Ze.test(t), oe = (t) => te(t, ot), Kt = (t) => te(t, oo), Ee = (t) => te(t, Je), Jt = (t) => te(t, tt), eo = (t) => te(t, et), pe = (t) => te(t, rt, !0), ee = (t, r, o) => {
  const a = Ue.exec(t);
  return a ? a[1] ? r(a[1]) : o(a[2]) : !1;
}, te = (t, r, o = !1) => {
  const a = Ze.exec(t);
  return a ? a[1] ? r(a[1]) : o : !1;
}, Je = (t) => t === "position" || t === "percentage", et = (t) => t === "image" || t === "url", tt = (t) => t === "length" || t === "size" || t === "bg-size", ot = (t) => t === "length", to = (t) => t === "number", oo = (t) => t === "family-name", rt = (t) => t === "shadow", ro = () => {
  const t = I("color"), r = I("font"), o = I("text"), a = I("font-weight"), s = I("tracking"), n = I("leading"), i = I("breakpoint"), c = I("container"), l = I("spacing"), u = I("radius"), f = I("shadow"), x = I("inset-shadow"), C = I("text-shadow"), k = I("drop-shadow"), w = I("blur"), N = I("perspective"), M = I("aspect"), $ = I("ease"), O = I("animate"), F = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...T(), h, m], j = () => ["auto", "hidden", "clip", "visible", "scroll"], L = () => ["auto", "contain", "none"], b = () => [h, m, l], P = () => [K, "full", "auto", ...b()], ae = () => [Y, "none", "subgrid", h, m], ne = () => ["auto", {
    span: ["full", Y, h, m]
  }, Y, h, m], U = () => [Y, "auto", h, m], Se = () => ["auto", "min", "max", "fr", h, m], ge = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...b()], Q = () => [K, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], y = () => [t, h, m], Le = () => [...T(), Ee, Pe, {
    position: [h, m]
  }], _e = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Be = () => ["auto", "cover", "contain", Jt, Ut, {
    size: [h, m]
  }], be = () => [xe, oe, X], _ = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    h,
    m
  ], G = () => ["", v, oe, X], ie = () => ["solid", "dashed", "dotted", "double"], Ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], z = () => [v, xe, Ee, Pe], Te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    h,
    m
  ], se = () => ["none", v, h, m], le = () => ["none", v, h, m], ye = () => [v, h, m], ce = () => [K, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [D],
      breakpoint: [D],
      color: [Wt],
      container: [D],
      "drop-shadow": [D],
      ease: ["in", "out", "in-out"],
      font: [qt],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [D],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [D],
      shadow: [D],
      spacing: ["px", v],
      text: [D],
      "text-shadow": [D],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", K, m, h, M]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [v, m, h, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": F()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": F()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: j()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": j()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": j()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: P()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": P()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": P()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: P()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: P()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: P()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: P()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: P()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: P()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Y, "auto", h, m]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [K, "full", "auto", c, ...b()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [v, K, "auto", "initial", "none", m]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", v, h, m]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", v, h, m]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Y, "first", "last", "none", h, m]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ae()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ne()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": U()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": U()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": ae()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ne()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": U()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": U()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Se()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Se()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: b()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": b()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": b()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ge(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ge()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ge()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Z()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: b()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: b()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: b()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: b()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: b()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: b()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: b()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: b()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: b()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: V()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: V()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: V()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: V()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: V()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: V()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: V()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: V()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: V()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": b()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": b()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: Q()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...Q()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...Q()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...Q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...Q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...Q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...Q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, oe, X]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [a, h, ve]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", xe, m]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Kt, m, r]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [s, h, m]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [v, "none", h, ve]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          n,
          ...b()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", h, m]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", h, m]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: y()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: y()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ie(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [v, "from-font", "auto", h, X]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: y()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [v, "auto", h, m]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: b()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", h, m]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", h, m]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: Le()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: _e()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Be()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Y, h, m],
          radial: ["", h, m],
          conic: [Y, h, m]
        }, eo, Zt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: y()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: be()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: be()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: be()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: y()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: y()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: y()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: _()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": _()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": _()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": _()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": _()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": _()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": _()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": _()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": _()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": _()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": _()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": _()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": _()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": _()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": _()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: G()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": G()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": G()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": G()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": G()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": G()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": G()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": G()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": G()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": G()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": G()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ie(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ie(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: y()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": y()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": y()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": y()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": y()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": y()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": y()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": y()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": y()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: y()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ie(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [v, h, m]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", v, oe, X]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: y()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          pe,
          de
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: y()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", x, pe, de]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": y()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: G()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: y()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [v, X]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": y()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": G()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": y()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", C, pe, de]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": y()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [v, h, m]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ae(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ae()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [v]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": z()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": z()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": y()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": y()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": z()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": z()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": y()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": y()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": z()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": z()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": y()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": y()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": z()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": z()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": y()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": y()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": z()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": z()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": y()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": y()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": z()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": z()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": y()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": y()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": z()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": z()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": y()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": y()
      }],
      "mask-image-radial": [{
        "mask-radial": [h, m]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": z()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": z()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": y()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": y()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": T()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [v]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": z()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": z()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": y()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": y()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: Le()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: _e()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Be()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", h, m]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          h,
          m
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Te()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [v, h, m]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [v, h, m]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          k,
          pe,
          de
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": y()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", v, h, m]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [v, h, m]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", v, h, m]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [v, h, m]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", v, h, m]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          h,
          m
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Te()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [v, h, m]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [v, h, m]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", v, h, m]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [v, h, m]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", v, h, m]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [v, h, m]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [v, h, m]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", v, h, m]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": b()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": b()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": b()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", h, m]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [v, "initial", h, m]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", $, h, m]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [v, h, m]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", O, h, m]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [N, h, m]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: se()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": se()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": se()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": se()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: le()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": le()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": le()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": le()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ye()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ye()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ye()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [h, m, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: ce()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ce()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ce()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ce()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: y()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: y()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", h, m]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": b()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": b()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": b()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": b()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": b()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": b()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": b()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": b()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": b()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": b()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": b()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": b()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": b()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": b()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": b()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": b()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": b()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": b()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", h, m]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...y()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [v, oe, X, ve]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...y()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Me = /* @__PURE__ */ Pt(ro);
function R(...t) {
  return Me(Ne(t));
}
const Re = {
  slime: {
    bg: "bg-lime-500",
    glow: "shadow-[0_0_20px_rgba(132,204,22,0.6)]",
    text: "text-lime-950",
    drip: "bg-lime-500"
  },
  blood: {
    bg: "bg-red-600",
    glow: "shadow-[0_0_20px_rgba(220,38,38,0.6)]",
    text: "text-red-100",
    drip: "bg-red-600"
  },
  ectoplasm: {
    bg: "bg-[#7c3aed]",
    glow: "shadow-[0_0_25px_rgba(124,58,237,0.6)]",
    text: "text-purple-100",
    drip: "bg-[#7c3aed]"
  }
}, Fe = {
  low: { duration: 2.5, displacement: 25 },
  medium: { duration: 1.8, displacement: 40 },
  high: { duration: 1.2, displacement: 55 }
}, ao = H.forwardRef(
  ({
    className: t,
    variant: r = "ectoplasm",
    fluidity: o = "medium",
    children: a,
    disabled: s,
    onClick: n,
    ...i
  }, c) => {
    const u = `goo-filter-${H.useId().replace(/:/g, "")}`, [f, x] = H.useState(!1), [C, k] = H.useState(0), w = Re[r] || Re.ectoplasm, N = Fe[o] || Fe.medium, M = (T) => {
      k((E) => E + 1), n?.(T);
    }, $ = (T) => ({
      initial: { y: 0, scaleY: 1 },
      hover: {
        y: [0, N.displacement * 0.3, 0],
        scaleY: [1, 2, 1],
        // Stretch vertically to connect to leading circle
        transition: {
          duration: N.duration,
          repeat: 1 / 0,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: T
        }
      }
    }), O = (T) => ({
      initial: { y: 0, scale: 1 },
      hover: {
        y: [0, N.displacement, 0],
        scale: [1, 1.2, 1],
        // Grow slightly as it drops
        transition: {
          duration: N.duration,
          repeat: 1 / 0,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: T
        }
      }
    }), F = {
      initial: { scale: 1, borderRadius: "9999px" },
      hover: {
        scale: [1, 1.02, 0.98, 1.01, 1],
        transition: {
          duration: 1.5,
          repeat: 1 / 0,
          repeatType: "mirror",
          // Makes it breathe in/out organically
          ease: "easeInOut"
        }
      },
      tap: { scale: 0.95 }
    };
    return /* @__PURE__ */ p(
      "div",
      {
        className: "relative inline-block z-10 group",
        onMouseEnter: () => x(!0),
        onMouseLeave: () => x(!1),
        children: [
          /* @__PURE__ */ e("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: u, children: [
            /* @__PURE__ */ e("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
            /* @__PURE__ */ e(
              "feColorMatrix",
              {
                in: "blur",
                mode: "matrix",
                values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",
                result: "goo"
              }
            ),
            /* @__PURE__ */ e("feGaussianBlur", { in: "goo", stdDeviation: "3", result: "gooBlur" }),
            /* @__PURE__ */ e(
              "feSpecularLighting",
              {
                in: "gooBlur",
                surfaceScale: "3",
                specularConstant: "1.2",
                specularExponent: "20",
                lightingColor: "#ffffff",
                result: "specular",
                children: /* @__PURE__ */ e("feDistantLight", { azimuth: "225", elevation: "45" })
              }
            ),
            /* @__PURE__ */ e("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
            /* @__PURE__ */ e("feComposite", { in: "specularInGoo", in2: "goo", operator: "over" })
          ] }) }) }),
          /* @__PURE__ */ e(
            "div",
            {
              className: R(
                "absolute inset-0 rounded-full pointer-events-none transition-all duration-300",
                w.glow,
                f ? "opacity-100 scale-105" : "opacity-60 scale-100"
              ),
              style: { zIndex: -1 }
            }
          ),
          /* @__PURE__ */ p(
            "div",
            {
              className: "absolute inset-0",
              style: { filter: `url(#${u})` },
              children: [
                /* @__PURE__ */ e(
                  d.div,
                  {
                    className: R(
                      "w-full h-full rounded-full",
                      w.bg,
                      s && "opacity-50"
                    ),
                    variants: F,
                    initial: "initial",
                    animate: f && !s ? "hover" : "initial",
                    whileTap: s ? void 0 : "tap"
                  }
                ),
                /* @__PURE__ */ p(
                  d.div,
                  {
                    initial: "initial",
                    animate: f && !s ? "hover" : "initial",
                    className: "absolute inset-0",
                    children: [
                      /* @__PURE__ */ e(
                        d.div,
                        {
                          className: R("absolute w-3 h-4 rounded-full motion-reduce:hidden", w.drip),
                          style: { left: "25%", bottom: "50%", transformOrigin: "top" },
                          variants: $(0)
                        }
                      ),
                      /* @__PURE__ */ e(
                        d.div,
                        {
                          className: R("absolute w-5 h-5 rounded-full motion-reduce:hidden", w.drip),
                          style: { left: "25%", bottom: "45%", transform: "translateX(-15%)", transformOrigin: "top" },
                          variants: O(0)
                        }
                      ),
                      /* @__PURE__ */ e(
                        d.div,
                        {
                          className: R("absolute w-4 h-5 rounded-full motion-reduce:hidden", w.drip),
                          style: { left: "50%", bottom: "50%", transformOrigin: "top" },
                          variants: $(0.2)
                        }
                      ),
                      /* @__PURE__ */ e(
                        d.div,
                        {
                          className: R("absolute w-7 h-7 rounded-full motion-reduce:hidden", w.drip),
                          style: { left: "50%", bottom: "42%", transform: "translateX(-20%)", transformOrigin: "top" },
                          variants: O(0.2)
                        }
                      ),
                      /* @__PURE__ */ e(
                        d.div,
                        {
                          className: R("absolute w-3 h-4 rounded-full motion-reduce:hidden", w.drip),
                          style: { left: "75%", bottom: "50%", transformOrigin: "top" },
                          variants: $(0.4)
                        }
                      ),
                      /* @__PURE__ */ e(
                        d.div,
                        {
                          className: R("absolute w-5 h-5 rounded-full motion-reduce:hidden", w.drip),
                          style: { left: "75%", bottom: "45%", transform: "translateX(-15%)", transformOrigin: "top" },
                          variants: O(0.4)
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ e(B, { children: C > 0 && /* @__PURE__ */ e(
                  d.div,
                  {
                    className: R("absolute inset-0 rounded-full", w.bg),
                    initial: { scale: 0.8, opacity: 1 },
                    animate: { scale: 1.8, opacity: 0 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.6, ease: "easeOut" }
                  },
                  C
                ) })
              ]
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              ref: c,
              onClick: M,
              className: R(
                "relative block w-full h-full px-8 py-3 rounded-full font-bold text-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500",
                w.text,
                s && "cursor-not-allowed",
                t
              ),
              disabled: s,
              ...i,
              children: [
                /* @__PURE__ */ e("span", { className: "relative z-10 drop-shadow-sm", children: a }),
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: "absolute inset-0 rounded-full pointer-events-none opacity-40",
                    style: {
                      background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%)"
                    }
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
);
ao.displayName = "GooeyButton";
function g(...t) {
  return Me(Ne(t));
}
const no = ({
  children: t,
  className: r,
  gooColor: o = "bg-[#5b21b6]"
}) => {
  const a = [
    {
      position: "right-6",
      width: "w-5",
      top: "calc(100% - 35px)",
      heights: ["40px", "90px", "40px"],
      duration: 4.5,
      delay: 0
    },
    {
      position: "right-12",
      width: "w-4",
      top: "calc(100% - 30px)",
      heights: ["35px", "80px", "35px"],
      duration: 5,
      delay: 0.5
    },
    {
      position: "right-20",
      width: "w-6",
      top: "calc(100% - 40px)",
      heights: ["45px", "100px", "45px"],
      duration: 4.2,
      delay: 1
    },
    {
      position: "right-28",
      width: "w-4",
      top: "calc(100% - 32px)",
      heights: ["38px", "85px", "38px"],
      duration: 4.8,
      delay: 1.5
    },
    {
      position: "right-36",
      width: "w-5",
      top: "calc(100% - 36px)",
      heights: ["42px", "95px", "42px"],
      duration: 4.6,
      delay: 2
    }
  ], s = [
    { position: "right-4", width: "w-12", height: "h-6", bottom: "-bottom-2" },
    { position: "right-16", width: "w-8", height: "h-6", bottom: "-bottom-2" },
    { position: "right-32", width: "w-5", height: "h-4", bottom: "-bottom-1" }
  ];
  return /* @__PURE__ */ p("div", { className: "relative inline-block min-w-[320px] min-h-[200px]", children: [
    /* @__PURE__ */ e("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: "card-goo", children: [
      /* @__PURE__ */ e("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "8", result: "blur" }),
      /* @__PURE__ */ e(
        "feColorMatrix",
        {
          in: "blur",
          mode: "matrix",
          values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9",
          result: "goo"
        }
      ),
      /* @__PURE__ */ e("feGaussianBlur", { in: "goo", stdDeviation: "2", result: "gooBlur" }),
      /* @__PURE__ */ e(
        "feSpecularLighting",
        {
          in: "gooBlur",
          surfaceScale: "6",
          specularConstant: "1.5",
          specularExponent: "40",
          lightingColor: "#ffffff",
          result: "specular",
          children: /* @__PURE__ */ e("feDistantLight", { azimuth: "225", elevation: "45" })
        }
      ),
      /* @__PURE__ */ e("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
      /* @__PURE__ */ e("feComposite", { in: "specularInGoo", in2: "goo", operator: "over" })
    ] }) }) }),
    /* @__PURE__ */ p(
      "div",
      {
        className: "absolute inset-0",
        style: { filter: "url(#card-goo)" },
        children: [
          /* @__PURE__ */ e("div", { className: g("absolute inset-0 rounded-3xl", o) }),
          a.map((n, i) => /* @__PURE__ */ e(
            d.div,
            {
              className: g(
                "absolute rounded-full motion-reduce:hidden",
                n.width,
                n.position,
                o
              ),
              style: {
                top: n.top,
                transformOrigin: "top"
              },
              animate: {
                height: n.heights
              },
              transition: {
                duration: n.duration,
                repeat: 1 / 0,
                repeatType: "loop",
                ease: "easeInOut",
                delay: n.delay
              }
            },
            `drip-${i}`
          )),
          s.map((n, i) => /* @__PURE__ */ e(
            "div",
            {
              className: g(
                "absolute rounded-full",
                n.width,
                n.height,
                n.position,
                n.bottom,
                o
              )
            },
            `pool-${i}`
          ))
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: g("relative z-20 p-6", r), children: t }),
    /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-30" }),
    /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-3xl border-2 border-black/5 pointer-events-none z-30" })
  ] });
};
no.displayName = "GooeyCard";
const io = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), so = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, o, a) => a ? a.toUpperCase() : o.toLowerCase()
), je = (t) => {
  const r = so(t);
  return r.charAt(0).toUpperCase() + r.slice(1);
}, at = (...t) => t.filter((r, o, a) => !!r && r.trim() !== "" && a.indexOf(r) === o).join(" ").trim(), lo = (t) => {
  for (const r in t)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
};
var co = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const po = Ye(
  ({
    color: t = "currentColor",
    size: r = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: a,
    className: s = "",
    children: n,
    iconNode: i,
    ...c
  }, l) => we(
    "svg",
    {
      ref: l,
      ...co,
      width: r,
      height: r,
      stroke: t,
      strokeWidth: a ? Number(o) * 24 / Number(r) : o,
      className: at("lucide", s),
      ...!n && !lo(c) && { "aria-hidden": "true" },
      ...c
    },
    [
      ...i.map(([u, f]) => we(u, f)),
      ...Array.isArray(n) ? n : [n]
    ]
  )
);
const A = (t, r) => {
  const o = Ye(
    ({ className: a, ...s }, n) => we(po, {
      ref: n,
      iconNode: r,
      className: at(
        `lucide-${io(je(t))}`,
        `lucide-${t}`,
        a
      ),
      ...s
    })
  );
  return o.displayName = je(t), o;
};
const uo = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], mo = A("book-open", uo);
const ho = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], he = A("circle-alert", ho);
const fo = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], nt = A("circle-check-big", fo);
const go = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], bo = A("eye", go);
const yo = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], xo = A("flame", yo);
const vo = [
  ["path", { d: "M9 10h.01", key: "qbtxuw" }],
  ["path", { d: "M15 10h.01", key: "1qmjsl" }],
  [
    "path",
    {
      d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
      key: "uwwb07"
    }
  ]
], q = A("ghost", vo);
const wo = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], ko = A("info", wo);
const No = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], Co = A("log-out", No);
const Mo = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], it = A("moon", Mo);
const Io = [
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
], zo = A("scroll", Io);
const So = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Lo = A("settings", So);
const _o = [
  ["path", { d: "m12.5 17-.5-1-.5 1h1z", key: "3me087" }],
  [
    "path",
    {
      d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
      key: "1o5pge"
    }
  ],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }]
], Ie = A("skull", _o);
const Bo = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
], Ao = A("sparkles", Bo);
const To = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], $o = A("sun", To);
const Go = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], ze = A("x", Go), fe = ({
  content: t,
  children: r,
  position: o = "top",
  className: a
}) => {
  const [s, n] = S(!1), i = lt(), c = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, l = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-ghost-purple border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-ghost-purple border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-ghost-purple border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-ghost-purple border-t-transparent border-b-transparent border-l-transparent"
  }, u = ct(r) ? dt(r, {
    "aria-describedby": s ? i : void 0,
    onFocus: (f) => {
      n(!0);
      const x = r.props.onFocus;
      x && x(f);
    },
    onBlur: (f) => {
      n(!1);
      const x = r.props.onBlur;
      x && x(f);
    }
  }) : r;
  return /* @__PURE__ */ p(
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => n(!0),
      onMouseLeave: () => n(!1),
      children: [
        u,
        /* @__PURE__ */ e(B, { children: s && /* @__PURE__ */ p(
          d.div,
          {
            id: i,
            initial: { opacity: 0, y: 10, scale: 0.9 },
            animate: {
              opacity: 1,
              y: -5,
              scale: 1,
              // Ghostly float animation
              rotate: [0, -2, 2, 0],
              x: [0, -2, 2, 0]
            },
            exit: { opacity: 0, y: 10, scale: 0.9 },
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 300,
              // Loop the float
              rotate: { repeat: 1 / 0, duration: 2, ease: "easeInOut" },
              x: { repeat: 1 / 0, duration: 3, ease: "easeInOut" }
            },
            className: g(
              "absolute z-50 px-3 py-2 text-sm text-ghost-white bg-ghost-dark border border-ghost-purple/40 rounded-md shadow-lg whitespace-nowrap",
              c[o],
              a
            ),
            role: "tooltip",
            children: [
              /* @__PURE__ */ e("div", { className: "relative z-10", children: t }),
              /* @__PURE__ */ e(
                "div",
                {
                  className: g(
                    "absolute w-0 h-0 border-[6px]",
                    l[o]
                  )
                }
              ),
              /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-ghost-purple/10 rounded-md blur-sm -z-10" })
            ]
          }
        ) })
      ]
    }
  );
};
function Oo({
  checked: t,
  onChange: r,
  disabled: o = !1,
  className: a,
  variant: s = "spectral-blood",
  tooltip: n,
  tooltipPosition: i,
  tooltipClassName: c
}) {
  const l = s === "spectral-blood" ? /* @__PURE__ */ p(
    d.button,
    {
      type: "button",
      role: "switch",
      "aria-checked": t,
      disabled: o,
      onClick: () => !o && r(!t),
      className: g(
        "relative w-24 h-12 rounded-full cursor-pointer p-1 transition-all duration-700 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        t ? "bg-[#2e0202] focus-visible:ring-purple-500" : "bg-[#1a0505] focus-visible:ring-red-600",
        o && "opacity-50 cursor-not-allowed grayscale",
        a
      ),
      animate: {
        backgroundColor: t ? "#3b0764" : "#450a0a",
        borderColor: t ? "#7e22ce" : "#991b1b"
      },
      style: { borderWidth: "1px", borderStyle: "solid" },
      children: [
        /* @__PURE__ */ p(
          d.div,
          {
            className: "absolute inset-0 pointer-events-none",
            initial: !1,
            animate: { opacity: 1 },
            children: [
              /* @__PURE__ */ e(
                d.span,
                {
                  className: "absolute top-2 left-8 w-[2px] h-[2px] rounded-full opacity-80",
                  animate: { backgroundColor: t ? "#e9d5ff" : "#fca5a5" }
                }
              ),
              /* @__PURE__ */ e(
                d.span,
                {
                  className: "absolute top-6 left-12 w-[1px] h-[1px] rounded-full opacity-60",
                  animate: { backgroundColor: t ? "#e9d5ff" : "#fca5a5" }
                }
              ),
              /* @__PURE__ */ e(
                d.span,
                {
                  className: "absolute bottom-3 left-5 w-[2px] h-[2px] rounded-full opacity-90",
                  animate: { backgroundColor: t ? "#e9d5ff" : "#fca5a5" }
                }
              ),
              /* @__PURE__ */ e(
                d.span,
                {
                  className: "absolute top-4 right-8 w-[1px] h-[1px] bg-white rounded-full",
                  animate: {
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                    backgroundColor: t ? "#d8b4fe" : "#ef4444"
                  },
                  transition: { duration: 3, repeat: 1 / 0 }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: g(
              "w-full h-full flex items-center",
              t ? "justify-end" : "justify-start"
            ),
            children: /* @__PURE__ */ e(
              d.div,
              {
                layout: !0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                },
                className: "w-10 h-10 rounded-full shadow-md relative z-10 flex items-center justify-center",
                animate: {
                  backgroundColor: t ? "#f3e8ff" : "#b91c1c",
                  boxShadow: t ? "0 0 20px 2px rgba(168, 85, 247, 0.6)" : "0 0 20px 2px rgba(220, 38, 38, 0.5)"
                },
                children: /* @__PURE__ */ p("svg", { viewBox: "0 0 100 100", className: "w-full h-full opacity-30 absolute inset-0 pointer-events-none", children: [
                  /* @__PURE__ */ e("circle", { cx: "30", cy: "30", r: "10", fill: "currentColor", className: t ? "text-purple-300" : "text-red-900" }),
                  /* @__PURE__ */ e("circle", { cx: "70", cy: "60", r: "8", fill: "currentColor", className: t ? "text-purple-300" : "text-red-900" }),
                  /* @__PURE__ */ e("circle", { cx: "40", cy: "80", r: "5", fill: "currentColor", className: t ? "text-purple-300" : "text-red-900" })
                ] })
              }
            )
          }
        )
      ]
    }
  ) : null, u = {
    on: {
      bg: "bg-slate-900",
      border: "border-indigo-500",
      thumb: "bg-slate-100",
      icon: it,
      iconColor: "text-slate-800",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.6)]"
    },
    off: {
      bg: "bg-sky-300",
      border: "border-yellow-400",
      thumb: "bg-yellow-100",
      icon: $o,
      iconColor: "text-orange-500",
      glow: "shadow-[0_0_20px_rgba(250,204,21,0.6)]"
    }
  }, f = t ? u.on : u.off, x = f.icon, C = /* @__PURE__ */ p(
    d.button,
    {
      type: "button",
      role: "switch",
      "aria-checked": t,
      disabled: o,
      onClick: () => !o && r(!t),
      className: g(
        "relative w-20 h-10 rounded-full cursor-pointer p-1 transition-colors duration-500 border-2",
        f.bg,
        f.border,
        o && "opacity-50 cursor-not-allowed grayscale",
        a
      ),
      whileTap: { scale: 0.95 },
      children: [
        /* @__PURE__ */ e("div", { className: "absolute inset-0 overflow-hidden rounded-full pointer-events-none", children: t && /* @__PURE__ */ p(re, { children: [
          /* @__PURE__ */ e(
            d.div,
            {
              className: "absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-50",
              animate: { opacity: [0.2, 0.8, 0.2] },
              transition: { duration: 2, repeat: 1 / 0 }
            }
          ),
          /* @__PURE__ */ e(
            d.div,
            {
              className: "absolute bottom-3 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-30",
              animate: { opacity: [0.2, 0.8, 0.2] },
              transition: { duration: 3, repeat: 1 / 0, delay: 1 }
            }
          )
        ] }) }),
        /* @__PURE__ */ e(
          d.div,
          {
            className: g(
              "w-7 h-7 rounded-full flex items-center justify-center relative z-10",
              f.thumb,
              f.glow
            ),
            animate: {
              x: t ? 40 : 0
            },
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30
            },
            children: /* @__PURE__ */ e(B, { mode: "wait", children: /* @__PURE__ */ e(
              d.div,
              {
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                exit: { scale: 0, rotate: 180 },
                transition: { duration: 0.2 },
                children: /* @__PURE__ */ e(x, { size: 14, className: f.iconColor })
              },
              t ? "on" : "off"
            ) })
          }
        )
      ]
    }
  ), k = s === "spectral-blood" ? l : C;
  return n ? /* @__PURE__ */ e(
    fe,
    {
      content: n,
      position: i,
      className: c,
      children: k
    }
  ) : k;
}
Oo.displayName = "MoonlightSwitch";
function Po({
  className: t,
  children: r,
  tooltip: o,
  tooltipPosition: a,
  tooltipClassName: s,
  ...n
}) {
  const i = /* @__PURE__ */ e(
    "div",
    {
      className: g(
        "relative bg-gray-900 text-ghost-white p-8",
        "before:absolute before:inset-0 before:bg-ghost-purple/10 before:clip-path-coffin",
        "clip-path-coffin drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]",
        t
      ),
      style: {
        clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)"
      },
      ...n,
      children: /* @__PURE__ */ e("div", { className: "relative z-10", children: r })
    }
  );
  return o ? /* @__PURE__ */ e(
    fe,
    {
      content: o,
      position: a,
      className: s,
      children: i
    }
  ) : i;
}
Po.displayName = "CoffinCard";
const Eo = H.forwardRef(
  ({ className: t, label: r, error: o, ghostIcon: a, id: s, ...n }, i) => {
    const [c, l] = S(!1), u = s || H.useId();
    return /* @__PURE__ */ p("div", { className: "relative mb-8 w-full max-w-md", children: [
      r && /* @__PURE__ */ e(
        "label",
        {
          htmlFor: u,
          className: g(
            "block mb-2 text-sm font-medium tracking-wide transition-colors duration-300",
            o ? "text-red-500" : c ? "text-[#A855F7]" : "text-gray-400"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ p(
        d.div,
        {
          className: "relative",
          animate: o ? { x: [-5, 5, -5, 5, 0] } : { x: 0 },
          transition: { duration: 0.4, ease: "easeInOut" },
          children: [
            a && /* @__PURE__ */ e(
              "div",
              {
                className: g(
                  "absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-300",
                  o ? "text-red-500" : c ? "text-[#A855F7]" : "text-gray-600"
                ),
                children: /* @__PURE__ */ e(q, { size: 20 })
              }
            ),
            /* @__PURE__ */ e(
              "input",
              {
                ref: i,
                id: u,
                className: g(
                  "w-full bg-transparent border-none py-2 text-gray-100 outline-none transition-colors placeholder:text-gray-700",
                  a ? "pl-8" : "px-1",
                  t
                ),
                onFocus: (f) => {
                  l(!0), n.onFocus?.(f);
                },
                onBlur: (f) => {
                  l(!1), n.onBlur?.(f);
                },
                ...n
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                className: g(
                  "absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-300",
                  o ? "bg-red-900/50" : "bg-gray-700"
                )
              }
            ),
            /* @__PURE__ */ e(
              d.div,
              {
                className: g(
                  "absolute bottom-0 left-0 h-[2px] w-full origin-center",
                  o ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" : "bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                ),
                initial: { scaleX: 0, opacity: 0 },
                animate: {
                  scaleX: c || o ? 1 : 0,
                  opacity: c || o ? 1 : 0
                },
                transition: {
                  duration: 0.4,
                  ease: c || o ? "easeOut" : "easeIn"
                }
              }
            ),
            /* @__PURE__ */ e(
              d.div,
              {
                className: g(
                  "absolute bottom-0 left-0 w-full h-8 pointer-events-none -z-10",
                  o ? "bg-red-500/10" : "bg-[#A855F7]/10"
                ),
                style: { filter: "blur(8px)" },
                initial: { opacity: 0, y: 10, scaleY: 0 },
                animate: {
                  opacity: c && !o ? 0.6 : 0,
                  y: c ? -10 : 10,
                  scaleY: c ? 1.5 : 0
                },
                transition: {
                  duration: 0.8,
                  ease: c ? "easeOut" : "easeIn"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(B, { children: o && /* @__PURE__ */ p(
        d.p,
        {
          initial: { opacity: 0, y: -5 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -5 },
          transition: { duration: 0.3, ease: "easeInOut" },
          className: "absolute -bottom-6 left-0 text-xs text-red-500 font-mono flex items-center gap-1",
          children: [
            /* @__PURE__ */ e("span", { children: "†" }),
            " ",
            o
          ]
        }
      ) })
    ] });
  }
);
Eo.displayName = "SpiritInput";
function Ro({ className: t, color: r = "#A855F7", ...o }) {
  return /* @__PURE__ */ p("div", { className: g("relative w-full h-12 overflow-hidden", t), ...o, children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-ghost-purple to-transparent opacity-50" }),
    /* @__PURE__ */ e(
      d.div,
      {
        className: "absolute top-1/2 left-0 w-4 h-4 text-ghost-purple",
        animate: {
          x: ["0%", "100%"],
          y: [-5, 5, -5],
          rotate: [0, 10, -10, 0]
        },
        transition: {
          duration: 8,
          repeat: 1 / 0,
          ease: "linear"
        },
        children: /* @__PURE__ */ e(Ve, {})
      }
    ),
    /* @__PURE__ */ e(
      d.div,
      {
        className: "absolute top-1/2 left-0 w-3 h-3 text-ghost-purple opacity-70",
        animate: {
          x: ["0%", "100%"],
          y: [5, -5, 5],
          rotate: [0, -10, 10, 0]
        },
        transition: {
          duration: 12,
          repeat: 1 / 0,
          ease: "linear",
          delay: 2
        },
        children: /* @__PURE__ */ e(Ve, {})
      }
    )
  ] });
}
function Ve() {
  return /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-full h-full", children: /* @__PURE__ */ e("path", { d: "M22 6c-2.5 0-4.5 1.5-6 3-1.5-1.5-3.5-3-6-3s-4.5 1.5-6 3c0 3.5 2.5 8 6 8 1.5 0 3-1 3-1s1.5 1 3 1c3.5 0 6-4.5 6-8 0-1.5-2.5-3-6-3z" }) });
}
Ro.displayName = "BatDivider";
const Fo = {
  low: "opacity-30",
  medium: "opacity-50",
  high: "opacity-80",
  block: "opacity-100"
};
function Jo({ className: t, intensity: r = "medium" }) {
  const o = Fo[r];
  return /* @__PURE__ */ p("div", { className: g("pointer-events-none fixed inset-0 overflow-hidden", o, t), children: [
    /* @__PURE__ */ e("svg", { className: "absolute h-0 w-0", children: /* @__PURE__ */ p("defs", { children: [
      /* @__PURE__ */ p("filter", { id: "fog-noise-1", children: [
        /* @__PURE__ */ e(
          "feTurbulence",
          {
            type: "fractalNoise",
            baseFrequency: "0.008",
            numOctaves: 4,
            result: "noise"
          }
        ),
        /* @__PURE__ */ e(
          "feColorMatrix",
          {
            in: "noise",
            type: "matrix",
            values: `1 0 0 0 0\r
                                    0 1 0 0 0\r
                                    0 0 1 0 0\r
                                    0 0 0 0.5 0`
          }
        )
      ] }),
      /* @__PURE__ */ p("filter", { id: "fog-noise-2", children: [
        /* @__PURE__ */ e(
          "feTurbulence",
          {
            type: "fractalNoise",
            baseFrequency: "0.015",
            numOctaves: 3,
            result: "noise"
          }
        ),
        /* @__PURE__ */ e(
          "feColorMatrix",
          {
            in: "noise",
            type: "matrix",
            values: `1 0 0 0 0\r
                                    0 1 0 0 0\r
                                    0 0 1 0 0\r
                                    0 0 0 0.3 0`
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute inset-0 animate-fog-drift-1",
        style: {
          background: "rgba(168, 85, 247, 0.4)",
          filter: "url(#fog-noise-1) blur(40px)",
          mixBlendMode: "screen"
        }
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute inset-0 animate-fog-drift-2",
        style: {
          background: "rgba(168, 85, 247, 0.3)",
          filter: "url(#fog-noise-2) blur(30px)",
          mixBlendMode: "screen"
        }
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)"
        }
      }
    )
  ] });
}
function er({ className: t, phase: r = "full" }) {
  const o = {
    full: "scale-100",
    waning: "scale-x-75",
    waxing: "scale-x-75",
    new: "scale-0"
  };
  return /* @__PURE__ */ e("div", { className: g("pointer-events-none fixed inset-0 flex items-center justify-center", t), children: /* @__PURE__ */ p(
    d.div,
    {
      className: "relative",
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 2, ease: "easeOut" },
      children: [
        /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full bg-ghost-purple/20 blur-3xl", style: { width: "400px", height: "400px" } }),
        /* @__PURE__ */ p(
          d.div,
          {
            className: g(
              "relative h-60 w-60 rounded-full bg-gradient-to-br from-ghost-white to-ghost-white/60",
              "shadow-[0_0_60px_rgba(230,230,230,0.3),inset_-20px_-20px_40px_rgba(0,0,0,0.2)]",
              o[r]
            ),
            animate: {
              y: [0, -20, 0]
            },
            transition: {
              duration: 8,
              repeat: 1 / 0,
              ease: "easeInOut"
            },
            children: [
              /* @__PURE__ */ e("div", { className: "absolute top-8 left-12 h-8 w-8 rounded-full bg-black/10" }),
              /* @__PURE__ */ e("div", { className: "absolute top-20 right-16 h-6 w-6 rounded-full bg-black/10" }),
              /* @__PURE__ */ e("div", { className: "absolute bottom-12 left-20 h-10 w-10 rounded-full bg-black/10" })
            ]
          }
        )
      ]
    }
  ) });
}
function tr({ className: t, size: r = "md" }) {
  const o = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  return /* @__PURE__ */ e("div", { className: g("flex items-center justify-center", t), children: /* @__PURE__ */ p(
    d.div,
    {
      className: g(o[r], "relative"),
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      },
      transition: {
        duration: 1.5,
        repeat: 1 / 0,
        ease: "easeInOut"
      },
      children: [
        /* @__PURE__ */ p(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            className: "h-full w-full",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ e(
                d.path,
                {
                  d: "M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4.5 2 6l-1 4c0 1 .5 2 2 2h6c1.5 0 2-1 2-2l-1-4c1-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z",
                  fill: "currentColor",
                  className: "text-ghost-white"
                }
              ),
              /* @__PURE__ */ e("ellipse", { cx: "9", cy: "9", rx: "1.5", ry: "2", fill: "currentColor", className: "text-ghost-purple" }),
              /* @__PURE__ */ e("ellipse", { cx: "15", cy: "9", rx: "1.5", ry: "2", fill: "currentColor", className: "text-ghost-purple" }),
              /* @__PURE__ */ e("path", { d: "M12 11l-1 2h2l-1-2z", fill: "currentColor", className: "text-ghost-dark" }),
              /* @__PURE__ */ e("rect", { x: "10", y: "15", width: "1", height: "2", fill: "currentColor", className: "text-ghost-dark" }),
              /* @__PURE__ */ e("rect", { x: "12", y: "15", width: "1", height: "2", fill: "currentColor", className: "text-ghost-dark" }),
              /* @__PURE__ */ e("rect", { x: "14", y: "15", width: "1", height: "2", fill: "currentColor", className: "text-ghost-dark" })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full bg-ghost-purple/30 blur-xl" })
      ]
    }
  ) });
}
const or = ({
  text: t,
  as: r = "h1",
  intensity: o = "medium",
  className: a,
  ...s
}) => {
  const n = {
    low: {
      offset: "2px",
      duration: "4s"
    },
    medium: {
      offset: "4px",
      duration: "3s"
    },
    high: {
      offset: "6px",
      duration: "2s"
    }
  }, { offset: i, duration: c } = n[o];
  return /* @__PURE__ */ p(
    r,
    {
      className: g(
        "relative inline-block font-display text-ghost-white uppercase tracking-widest",
        a
      ),
      "data-text": t,
      ...s,
      children: [
        /* @__PURE__ */ e("span", { className: "relative z-10", children: t }),
        /* @__PURE__ */ e(
          "span",
          {
            className: "absolute top-0 left-0 -z-10 w-full h-full text-ghost-purple opacity-70 animate-glitch-1",
            "aria-hidden": "true",
            style: {
              clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
              transform: `translate(-${i}, -${i})`,
              animationDuration: c
            },
            children: t
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: "absolute top-0 left-0 -z-10 w-full h-full text-ghost-green opacity-70 animate-glitch-2",
            "aria-hidden": "true",
            style: {
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
              transform: `translate(${i}, ${i})`,
              animationDuration: c,
              animationDelay: "0.1s"
            },
            children: t
          }
        ),
        /* @__PURE__ */ e("style", { children: `
        @keyframes glitch-1 {
          0% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(-${i}, -${i}); }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 55%, 0 55%); transform: translate(${i}, ${i}); }
          40% { clip-path: polygon(0 10%, 100% 10%, 100% 45%, 0 45%); transform: translate(-${i}, ${i}); }
          60% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(${i}, -${i}); }
          80% { clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%); transform: translate(-${i}, 0); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(-${i}, -${i}); }
        }
        @keyframes glitch-2 {
          0% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(${i}, ${i}); }
          20% { clip-path: polygon(0 45%, 100% 45%, 100% 85%, 0 85%); transform: translate(-${i}, -${i}); }
          40% { clip-path: polygon(0 50%, 100% 50%, 100% 90%, 0 90%); transform: translate(${i}, -${i}); }
          60% { clip-path: polygon(0 20%, 100% 20%, 100% 60%, 0 60%); transform: translate(-${i}, ${i}); }
          80% { clip-path: polygon(0 30%, 100% 30%, 100% 70%, 0 70%); transform: translate(${i}, 0); }
          100% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(${i}, ${i}); }
        }
        .animate-glitch-1 {
          animation: glitch-1 ${c} infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-2 ${c} infinite linear alternate-reverse;
        }
      ` })
      ]
    }
  );
}, rr = ({
  position: t = "top-right",
  size: r = "md",
  color: o = "currentColor",
  className: a
}) => {
  const s = {
    sm: 100,
    md: 200,
    lg: 300
  }, n = {
    "top-left": { top: 0, left: 0, transform: "rotate(0deg)" },
    "top-right": { top: 0, right: 0, transform: "rotate(90deg)" },
    "bottom-right": { bottom: 0, right: 0, transform: "rotate(180deg)" },
    "bottom-left": { bottom: 0, left: 0, transform: "rotate(270deg)" }
  }, i = s[r];
  return /* @__PURE__ */ e(
    d.div,
    {
      className: g("absolute pointer-events-none z-0 opacity-50", a),
      style: {
        ...n[t],
        width: i,
        height: i
      },
      animate: {
        rotate: [
          n[t].transform.replace("deg", "") + "deg",
          parseInt(n[t].transform.replace("deg", "").replace("rotate(", "")) + 2 + "deg",
          n[t].transform.replace("deg", "") + "deg"
        ]
      },
      transition: {
        duration: 5,
        repeat: 1 / 0,
        ease: "easeInOut"
      },
      children: /* @__PURE__ */ p(
        "svg",
        {
          viewBox: "0 0 100 100",
          fill: "none",
          stroke: o,
          strokeWidth: "0.5",
          className: "w-full h-full",
          children: [
            /* @__PURE__ */ e("path", { d: "M0 0 L100 100" }),
            /* @__PURE__ */ e("path", { d: "M0 0 L80 100" }),
            /* @__PURE__ */ e("path", { d: "M0 0 L100 80" }),
            /* @__PURE__ */ e("path", { d: "M0 0 L50 100" }),
            /* @__PURE__ */ e("path", { d: "M0 0 L100 50" }),
            /* @__PURE__ */ e("path", { d: "M0 0 L20 100" }),
            /* @__PURE__ */ e("path", { d: "M0 0 L100 20" }),
            /* @__PURE__ */ e("path", { d: "M10 0 Q 5 5 0 10" }),
            /* @__PURE__ */ e("path", { d: "M20 0 Q 10 10 0 20" }),
            /* @__PURE__ */ e("path", { d: "M30 0 Q 15 15 0 30" }),
            /* @__PURE__ */ e("path", { d: "M40 0 Q 20 20 0 40" }),
            /* @__PURE__ */ e("path", { d: "M50 0 Q 25 25 0 50" }),
            /* @__PURE__ */ e("path", { d: "M60 0 Q 30 30 0 60" }),
            /* @__PURE__ */ e("path", { d: "M70 0 Q 35 35 0 70" }),
            /* @__PURE__ */ e("path", { d: "M80 0 Q 40 40 0 80" }),
            /* @__PURE__ */ e("path", { d: "M90 0 Q 45 45 0 90" }),
            /* @__PURE__ */ e("path", { d: "M20 10 L 10 20", strokeOpacity: "0.5" }),
            /* @__PURE__ */ e("path", { d: "M40 20 L 20 40", strokeOpacity: "0.5" }),
            /* @__PURE__ */ e("path", { d: "M60 30 L 30 60", strokeOpacity: "0.5" })
          ]
        }
      )
    }
  );
}, ar = ({
  isOpen: t,
  onClose: r,
  title: o,
  children: a,
  className: s
}) => {
  const [n, i] = S(!1);
  return W(() => (i(!0), () => i(!1)), []), W(() => {
    const c = (l) => {
      l.key === "Escape" && r();
    };
    return t && document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [t, r]), n ? gt(
    /* @__PURE__ */ e(B, { children: t && /* @__PURE__ */ p("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ e(
        d.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: r,
          className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ p(
        d.div,
        {
          initial: { opacity: 0, y: 100, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 100, scale: 0.95 },
          transition: { type: "spring", damping: 20, stiffness: 300 },
          className: g(
            "relative w-full max-w-lg overflow-hidden rounded-xl border-2 border-ghost-gray/30 bg-ghost-dark shadow-2xl",
            "before:absolute before:inset-0 before:z-0 before:bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] before:opacity-10 before:mix-blend-overlay",
            s
          ),
          role: "dialog",
          "aria-modal": "true",
          children: [
            /* @__PURE__ */ p("div", { className: "relative z-10 flex items-center justify-between border-b border-ghost-gray/20 px-6 py-4 bg-ghost-gray/5", children: [
              o && /* @__PURE__ */ e("h2", { className: "text-xl font-display tracking-wide text-ghost-white", children: o }),
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: r,
                  className: "rounded-full p-1 text-ghost-white/50 transition-colors hover:bg-ghost-white/10 hover:text-ghost-white focus:outline-none focus:ring-2 focus:ring-ghost-purple/50",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ e(ze, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "relative z-10 p-6 text-ghost-white/80", children: a }),
            /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ghost-purple/50 to-transparent opacity-50" })
          ]
        }
      )
    ] }) }),
    document.body
  ) : null;
}, nr = ({
  size: t = "md",
  className: r
}) => {
  const a = {
    sm: 40,
    md: 60,
    lg: 80
  }[t];
  return /* @__PURE__ */ p("div", { className: g("relative inline-flex items-center justify-center", r), children: [
    /* @__PURE__ */ p(
      d.div,
      {
        className: "relative",
        style: { width: a, height: a },
        animate: {
          y: [0, -15, 0]
        },
        transition: {
          duration: 2,
          repeat: 1 / 0,
          ease: "easeInOut"
        },
        children: [
          /* @__PURE__ */ p(
            d.svg,
            {
              viewBox: "0 0 100 120",
              fill: "none",
              className: "w-full h-full",
              animate: {
                opacity: [0.6, 1, 0.6]
              },
              transition: {
                duration: 1.5,
                repeat: 1 / 0,
                ease: "easeInOut"
              },
              children: [
                /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: "ghost-glow", children: [
                  /* @__PURE__ */ e("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
                  /* @__PURE__ */ p("feMerge", { children: [
                    /* @__PURE__ */ e("feMergeNode", { in: "coloredBlur" }),
                    /* @__PURE__ */ e("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ] }) }),
                /* @__PURE__ */ e(
                  "path",
                  {
                    d: "M50 20 C30 20, 20 30, 20 50 L20 100 L30 95 L40 100 L50 95 L60 100 L70 95 L80 100 L80 50 C80 30, 70 20, 50 20 Z",
                    fill: "currentColor",
                    className: "text-ghost-white",
                    filter: "url(#ghost-glow)",
                    opacity: "0.9"
                  }
                ),
                /* @__PURE__ */ e(
                  d.circle,
                  {
                    cx: "38",
                    cy: "50",
                    r: "4",
                    fill: "currentColor",
                    className: "text-ghost-dark",
                    animate: {
                      scaleY: [1, 0.2, 1]
                    },
                    transition: {
                      duration: 3,
                      repeat: 1 / 0,
                      ease: "easeInOut"
                    }
                  }
                ),
                /* @__PURE__ */ e(
                  d.circle,
                  {
                    cx: "62",
                    cy: "50",
                    r: "4",
                    fill: "currentColor",
                    className: "text-ghost-dark",
                    animate: {
                      scaleY: [1, 0.2, 1]
                    },
                    transition: {
                      duration: 3,
                      repeat: 1 / 0,
                      ease: "easeInOut"
                    }
                  }
                ),
                /* @__PURE__ */ e(
                  "path",
                  {
                    d: "M40 65 Q50 70 60 65",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    fill: "none",
                    className: "text-ghost-dark",
                    opacity: "0.7"
                  }
                )
              ]
            }
          ),
          [...Array(3)].map((s, n) => /* @__PURE__ */ e(
            d.div,
            {
              className: "absolute w-1 h-1 rounded-full bg-ghost-purple/60",
              style: {
                left: `${30 + n * 20}%`,
                top: "50%"
              },
              animate: {
                y: [-20, -40, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              },
              transition: {
                duration: 2,
                repeat: 1 / 0,
                delay: n * 0.4,
                ease: "easeOut"
              }
            },
            n
          ))
        ]
      }
    ),
    /* @__PURE__ */ e(
      d.p,
      {
        className: "absolute -bottom-8 text-xs font-mono text-ghost-white/60 tracking-wider",
        animate: {
          opacity: [0.4, 1, 0.4]
        },
        transition: {
          duration: 1.5,
          repeat: 1 / 0,
          ease: "easeInOut"
        },
        children: "Loading..."
      }
    )
  ] });
}, ir = ({
  size: t = "md",
  className: r
}) => {
  const a = {
    sm: 60,
    md: 80,
    lg: 100
  }[t];
  return /* @__PURE__ */ p("div", { className: g("relative inline-flex items-center justify-center", r), children: [
    /* @__PURE__ */ p(
      "svg",
      {
        width: a,
        height: a,
        viewBox: "0 0 100 100",
        fill: "none",
        className: "relative",
        children: [
          /* @__PURE__ */ e(
            "path",
            {
              d: "M20 35 L15 70 Q15 80, 25 85 L75 85 Q85 80, 85 70 L80 35 Z",
              fill: "currentColor",
              className: "text-ghost-dark",
              stroke: "currentColor",
              strokeWidth: "2"
            }
          ),
          /* @__PURE__ */ e("line", { x1: "25", y1: "85", x2: "20", y2: "95", stroke: "currentColor", strokeWidth: "3", className: "text-ghost-dark" }),
          /* @__PURE__ */ e("line", { x1: "50", y1: "85", x2: "50", y2: "95", stroke: "currentColor", strokeWidth: "3", className: "text-ghost-dark" }),
          /* @__PURE__ */ e("line", { x1: "75", y1: "85", x2: "80", y2: "95", stroke: "currentColor", strokeWidth: "3", className: "text-ghost-dark" }),
          /* @__PURE__ */ e(
            d.ellipse,
            {
              cx: "50",
              cy: "60",
              rx: "28",
              ry: "20",
              fill: "currentColor",
              className: "text-ghost-green/60",
              animate: {
                ry: [20, 22, 20]
              },
              transition: {
                duration: 1.5,
                repeat: 1 / 0,
                ease: "easeInOut"
              }
            }
          ),
          [...Array(5)].map((s, n) => /* @__PURE__ */ e(
            d.circle,
            {
              cx: 30 + n * 10,
              cy: 65,
              r: "3",
              fill: "currentColor",
              className: "text-ghost-green/80",
              animate: {
                cy: [65, 40, 30],
                opacity: [1, 0.5, 0],
                r: [3, 4, 2]
              },
              transition: {
                duration: 2,
                repeat: 1 / 0,
                delay: n * 0.4,
                ease: "easeOut"
              }
            },
            n
          )),
          /* @__PURE__ */ e(
            d.path,
            {
              d: "M35 30 Q40 20, 45 25 T55 20 Q60 25, 65 30",
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none",
              className: "text-ghost-white/40",
              animate: {
                opacity: [0.4, 0.7, 0.4],
                y: [-5, -10, -5]
              },
              transition: {
                duration: 3,
                repeat: 1 / 0,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ e(
            d.path,
            {
              d: "M40 25 Q45 15, 50 20 T60 15",
              stroke: "currentColor",
              strokeWidth: "1.5",
              fill: "none",
              className: "text-ghost-white/30",
              animate: {
                opacity: [0.3, 0.6, 0.3],
                y: [-8, -15, -8]
              },
              transition: {
                duration: 3.5,
                repeat: 1 / 0,
                ease: "easeInOut",
                delay: 0.5
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(
      d.p,
      {
        className: "absolute -bottom-8 text-xs font-mono text-ghost-white/60 tracking-wider",
        animate: {
          opacity: [0.4, 1, 0.4]
        },
        transition: {
          duration: 1.5,
          repeat: 1 / 0,
          ease: "easeInOut"
        },
        children: "Brewing..."
      }
    )
  ] });
}, sr = ({
  intensity: t = "medium",
  className: r
}) => /* @__PURE__ */ p(
  "div",
  {
    className: g(
      "pointer-events-none fixed inset-0 z-0",
      {
        light: "opacity-30",
        medium: "opacity-50",
        heavy: "opacity-70"
      }[t],
      r
    ),
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: "radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%)"
          }
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: `
            linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%),
            linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%),
            linear-gradient(225deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%),
            linear-gradient(315deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%)
          `
          }
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0 bg-ghost-purple/5 mix-blend-overlay"
        }
      )
    ]
  }
);
function ue(...t) {
  return Me(Ne(t));
}
const jo = [
  { id: "dashboard", label: "The Dashboard", icon: /* @__PURE__ */ e(mo, { size: 20 }) },
  { id: "spirits", label: "Restless Spirits", icon: /* @__PURE__ */ e(q, { size: 20 }) },
  { id: "graveyard", label: "Graveyard", icon: /* @__PURE__ */ e(Ie, { size: 20 }) },
  { id: "rituals", label: "Dark Rituals", icon: /* @__PURE__ */ e(zo, { size: 20 }) },
  { id: "midnight", label: "Midnight Zone", icon: /* @__PURE__ */ e(it, { size: 20 }) },
  { id: "scrying", label: "Scrying Pool", icon: /* @__PURE__ */ e(bo, { size: 20 }) }
], Vo = () => /* @__PURE__ */ e("svg", { className: "absolute w-0 h-0", children: /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: "sidebar-goo-3d", colorInterpolationFilters: "sRGB", children: [
  /* @__PURE__ */ e("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "8", result: "blur1" }),
  /* @__PURE__ */ e(
    "feColorMatrix",
    {
      in: "blur1",
      mode: "matrix",
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",
      result: "goo"
    }
  ),
  /* @__PURE__ */ e("feGaussianBlur", { in: "goo", stdDeviation: "2", result: "smoothGoo" }),
  /* @__PURE__ */ e(
    "feSpecularLighting",
    {
      in: "smoothGoo",
      surfaceScale: "5",
      specularConstant: "1.2",
      specularExponent: "20",
      lightingColor: "#ffffff",
      result: "specular",
      children: /* @__PURE__ */ e("fePointLight", { x: "-100", y: "-200", z: "300" })
    }
  ),
  /* @__PURE__ */ e(
    "feComposite",
    {
      in: "specular",
      in2: "goo",
      operator: "in",
      result: "specularGoo"
    }
  ),
  /* @__PURE__ */ e(
    "feComposite",
    {
      in: "goo",
      in2: "specularGoo",
      operator: "arithmetic",
      k1: "0",
      k2: "1",
      k3: "1",
      k4: "0",
      result: "final"
    }
  )
] }) }) }), Do = () => /* @__PURE__ */ e(
  d.div,
  {
    className: "absolute pointer-events-none",
    initial: { x: "-100%", y: "20%", scale: 0.5, rotate: 10 },
    animate: {
      x: "400%",
      y: ["20%", "40%", "10%"],
      rotate: [-5, 5, -5]
    },
    transition: {
      duration: 25,
      repeat: 1 / 0,
      ease: "linear"
    },
    children: /* @__PURE__ */ e(q, { size: 120, className: "text-white opacity-5" })
  }
), Yo = ({
  menuItems: t = jo,
  activeId: r,
  onActiveChange: o,
  className: a,
  title: s = "MANOR",
  subtitle: n = "Navigation"
}) => {
  const [i, c] = S(
    t[0]?.id || ""
  ), [l, u] = S(null), f = r ?? i, k = ((w) => {
    const N = t.findIndex((M) => M.id === w);
    return N === -1 ? null : N * 52;
  })(f);
  return /* @__PURE__ */ p("div", { className: ue("relative", a), children: [
    /* @__PURE__ */ e(Vo, {}),
    /* @__PURE__ */ p("div", { className: "relative w-72 h-[650px] bg-[#0c0a0f] rounded-r-2xl border-r border-white/5 shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ p("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ e(Do, {}),
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0 opacity-10",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 50%, rgba(0, 0, 0, 0.8) 100%)"
            }
          }
        )
      ] }),
      k !== null && /* @__PURE__ */ e(ft, { children: /* @__PURE__ */ p(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          style: { filter: "url(#sidebar-goo-3d)" },
          children: [
            /* @__PURE__ */ e(
              d.div,
              {
                layoutId: "active-blob-head",
                className: "absolute h-12 bg-gray-700 rounded-lg",
                style: {
                  top: k,
                  left: 0,
                  width: "100%"
                },
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }
              }
            ),
            /* @__PURE__ */ e(
              d.div,
              {
                layoutId: "active-blob-tail",
                className: "absolute h-12 bg-gray-700 rounded-lg",
                style: {
                  top: k,
                  left: 16,
                  width: "75%"
                },
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 3
                }
              }
            ),
            /* @__PURE__ */ e(
              d.div,
              {
                layoutId: "active-blob-drip",
                className: "absolute h-12 bg-gray-700 rounded-lg",
                style: {
                  top: k + 8,
                  left: 40,
                  width: 40
                },
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 5,
                  delay: 0.05
                }
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ p("nav", { className: "p-6 relative z-10 flex flex-col h-full", children: [
        /* @__PURE__ */ p("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ e(Ie, { size: 24, className: "text-gray-200" }),
          /* @__PURE__ */ e("h1", { className: "font-serif text-2xl tracking-widest text-gray-200", children: s })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs uppercase tracking-widest text-gray-600 mb-8", children: n }),
        /* @__PURE__ */ e("div", { className: "flex-1 space-y-1", children: t.map((w) => {
          const N = w.id === f, M = w.id === l;
          return /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                c(w.id), o?.(w.id);
              },
              onMouseEnter: () => u(w.id),
              onMouseLeave: () => u(null),
              className: ue(
                "relative w-full h-12 flex items-center gap-3 px-4 rounded-lg",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#0c0a0f]",
                N && "text-white",
                !N && M && "text-gray-300",
                !N && !M && "text-gray-500"
              ),
              children: [
                w.icon && /* @__PURE__ */ e(
                  d.div,
                  {
                    className: "flex-shrink-0",
                    animate: {
                      scale: N ? 1.1 : 1,
                      x: N ? 4 : M ? 2 : 0
                    },
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    },
                    children: w.icon
                  }
                ),
                /* @__PURE__ */ e("span", { className: "text-sm font-medium", children: w.label }),
                M && !N && /* @__PURE__ */ e(
                  d.div,
                  {
                    initial: { opacity: 0, x: -5 },
                    animate: { opacity: 1, x: 0 },
                    className: "absolute right-4 w-1.5 h-1.5 rounded-full bg-gray-600"
                  }
                )
              ]
            },
            w.id
          );
        }) }),
        /* @__PURE__ */ p("div", { className: "pt-6 border-t border-white/5 space-y-1", children: [
          /* @__PURE__ */ p(
            "button",
            {
              className: ue(
                "w-full h-10 flex items-center gap-3 px-4 rounded-lg",
                "text-sm font-medium text-gray-500",
                "transition-colors duration-200",
                "hover:text-gray-300 hover:bg-white/5",
                "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#0c0a0f]"
              ),
              children: [
                /* @__PURE__ */ e(Lo, { size: 18 }),
                /* @__PURE__ */ e("span", { children: "Configuration" })
              ]
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              className: ue(
                "w-full h-10 flex items-center gap-3 px-4 rounded-lg",
                "text-sm font-medium text-red-900",
                "transition-colors duration-200",
                "hover:text-red-700 hover:bg-red-950/20",
                "focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-[#0c0a0f]"
              ),
              children: [
                /* @__PURE__ */ e(Co, { size: 18 }),
                /* @__PURE__ */ e("span", { children: "Abandon" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
};
Yo.displayName = "HauntedSidebar";
const lr = ({
  checked: t = !1,
  onChange: r,
  disabled: o = !1,
  className: a,
  tooltip: s,
  tooltipPosition: n,
  tooltipClassName: i
}) => {
  const l = /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": t,
      disabled: o,
      onClick: () => {
        !o && r && r(!t);
      },
      className: g(
        "relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 focus:ring-offset-2 focus:ring-offset-ghost-dark",
        t ? "bg-ghost-purple/30" : "bg-ghost-gray/30",
        o && "opacity-50 cursor-not-allowed",
        !o && "cursor-pointer",
        a
      ),
      children: [
        /* @__PURE__ */ e("div", { className: g(
          "absolute inset-0 rounded-full border-2 transition-colors",
          t ? "border-ghost-purple/50" : "border-ghost-gray/30"
        ) }),
        /* @__PURE__ */ p(
          d.div,
          {
            className: g(
              "relative h-8 w-8 rounded-full flex items-center justify-center",
              t ? "bg-ghost-purple" : "bg-ghost-gray"
            ),
            animate: {
              x: t ? 40 : 4
            },
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30
            },
            children: [
              /* @__PURE__ */ p(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-5 h-5 text-ghost-dark",
                  children: [
                    /* @__PURE__ */ e(
                      d.path,
                      {
                        d: "M2 12 Q6 8, 8 12 L12 12",
                        animate: {
                          d: t ? "M2 12 Q4 8, 8 12 L12 12" : "M2 12 Q6 10, 8 12 L12 12"
                        },
                        transition: { duration: 0.3 }
                      }
                    ),
                    /* @__PURE__ */ e(
                      d.path,
                      {
                        d: "M12 12 L16 12 Q18 8, 22 12",
                        animate: {
                          d: t ? "M12 12 L16 12 Q20 8, 22 12" : "M12 12 L16 12 Q18 10, 22 12"
                        },
                        transition: { duration: 0.3 }
                      }
                    ),
                    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor" }),
                    /* @__PURE__ */ e("path", { d: "M11 10 L11 8" }),
                    /* @__PURE__ */ e("path", { d: "M13 10 L13 8" })
                  ]
                }
              ),
              t && /* @__PURE__ */ e(
                d.div,
                {
                  className: "absolute inset-0 rounded-full bg-ghost-purple/30 blur-md",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 }
                }
              )
            ]
          }
        )
      ]
    }
  );
  return s ? /* @__PURE__ */ e(
    fe,
    {
      content: s,
      position: n,
      className: i,
      children: l
    }
  ) : l;
}, st = pt(void 0), cr = () => {
  const t = ut(st);
  if (!t)
    throw new Error("useToast must be used within a GhostToastProvider");
  return t;
}, dr = ({ children: t }) => {
  const [r, o] = S([]), a = mt((c, l = "info", u = 3e3) => {
    const f = Math.random().toString(36).substr(2, 9), x = { id: f, message: c, type: l, duration: u };
    o((C) => [...C, x]), u > 0 && setTimeout(() => {
      o((C) => C.filter((k) => k.id !== f));
    }, u);
  }, []), s = (c) => {
    o((l) => l.filter((u) => u.id !== c));
  }, n = (c) => {
    switch (c) {
      case "success":
        return /* @__PURE__ */ e(nt, { className: "w-5 h-5" });
      case "error":
        return /* @__PURE__ */ e(he, { className: "w-5 h-5" });
      case "warning":
        return /* @__PURE__ */ e(he, { className: "w-5 h-5" });
      case "info":
      default:
        return /* @__PURE__ */ e(ko, { className: "w-5 h-5" });
    }
  }, i = (c) => {
    switch (c) {
      case "success":
        return "border-ghost-green/50 bg-ghost-dark text-ghost-green";
      case "error":
        return "border-ghost-blood/50 bg-ghost-dark text-ghost-blood";
      case "warning":
        return "border-yellow-500/50 bg-ghost-dark text-yellow-500";
      case "info":
      default:
        return "border-ghost-purple/50 bg-ghost-dark text-ghost-purple";
    }
  };
  return /* @__PURE__ */ p(st.Provider, { value: { showToast: a }, children: [
    t,
    /* @__PURE__ */ e("div", { className: "fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none", children: /* @__PURE__ */ e(B, { children: r.map((c) => /* @__PURE__ */ p(
      d.div,
      {
        initial: { opacity: 0, x: 100, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: 100, scale: 0.8 },
        transition: { type: "spring", stiffness: 500, damping: 30 },
        className: g(
          "flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg backdrop-blur-sm pointer-events-auto min-w-[300px] max-w-md",
          i(c.type)
        ),
        children: [
          /* @__PURE__ */ p("div", { className: "relative flex-shrink-0", children: [
            n(c.type),
            /* @__PURE__ */ e("div", { className: "absolute inset-0 blur-sm opacity-50", children: n(c.type) })
          ] }),
          /* @__PURE__ */ e("p", { className: "flex-1 text-sm font-medium text-ghost-white", children: c.message }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => s(c.id),
              className: "flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors",
              "aria-label": "Close notification",
              children: /* @__PURE__ */ e(ze, { className: "w-4 h-4 text-ghost-white/60" })
            }
          ),
          /* @__PURE__ */ e("div", { className: g(
            "absolute inset-0 rounded-lg opacity-20 blur-md -z-10",
            c.type === "success" && "bg-ghost-green",
            c.type === "error" && "bg-ghost-blood",
            c.type === "warning" && "bg-yellow-500",
            c.type === "info" && "bg-ghost-purple"
          ) })
        ]
      },
      c.id
    )) }) })
  ] });
}, pr = ({
  message: t,
  type: r = "info",
  onClose: o,
  className: a
}) => {
  const s = (i) => {
    switch (i) {
      case "success":
        return /* @__PURE__ */ e(nt, { className: "w-5 h-5" });
      case "error":
        return /* @__PURE__ */ e(he, { className: "w-5 h-5" });
      case "warning":
        return /* @__PURE__ */ e(he, { className: "w-5 h-5" });
      case "info":
      default:
        return /* @__PURE__ */ e(q, { className: "w-5 h-5" });
    }
  }, n = (i) => {
    switch (i) {
      case "success":
        return "border-ghost-green/50 bg-ghost-dark text-ghost-green";
      case "error":
        return "border-ghost-blood/50 bg-ghost-dark text-ghost-blood";
      case "warning":
        return "border-yellow-500/50 bg-ghost-dark text-yellow-500";
      case "info":
      default:
        return "border-ghost-purple/50 bg-ghost-dark text-ghost-purple";
    }
  };
  return /* @__PURE__ */ p(
    d.div,
    {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      className: g(
        "flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg backdrop-blur-sm",
        n(r),
        a
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "relative flex-shrink-0", children: [
          s(r),
          /* @__PURE__ */ e("div", { className: "absolute inset-0 blur-sm opacity-50", children: s(r) })
        ] }),
        /* @__PURE__ */ e("p", { className: "flex-1 text-sm font-medium text-ghost-white", children: t }),
        o && /* @__PURE__ */ e(
          "button",
          {
            onClick: o,
            className: "flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors",
            "aria-label": "Close",
            children: /* @__PURE__ */ e(ze, { className: "w-4 h-4 text-ghost-white/60" })
          }
        )
      ]
    }
  );
}, ur = ({
  tabs: t,
  defaultTab: r,
  onTabChange: o,
  className: a
}) => {
  const [s, n] = S(r || t[0]?.id), i = (l) => {
    n(l), o?.(l);
  }, c = t.findIndex((l) => l.id === s);
  return /* @__PURE__ */ p("div", { className: g("w-full", a), children: [
    /* @__PURE__ */ p("div", { className: "relative border-b border-ghost-gray/30", children: [
      /* @__PURE__ */ e("div", { className: "flex gap-1 relative", children: t.map((l, u) => {
        const f = l.id === s, x = /* @__PURE__ */ p(
          "button",
          {
            onClick: () => i(l.id),
            className: g(
              "relative px-4 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 rounded-t-md",
              f ? "text-ghost-purple" : "text-ghost-white/60 hover:text-ghost-white/80"
            ),
            role: "tab",
            "aria-selected": f,
            "aria-controls": `panel-${l.id}`,
            id: `tab-${l.id}`,
            children: [
              /* @__PURE__ */ p("div", { className: "flex items-center gap-2 relative z-10", children: [
                l.icon && /* @__PURE__ */ e("span", { children: l.icon }),
                /* @__PURE__ */ e("span", { children: l.label })
              ] }),
              f && /* @__PURE__ */ e(
                d.div,
                {
                  layoutId: "activeTab",
                  className: "absolute inset-0 bg-ghost-purple/10 border-t-2 border-l-2 border-r-2 border-ghost-purple/40 rounded-t-md",
                  transition: { type: "spring", stiffness: 500, damping: 30 }
                }
              ),
              f && /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-ghost-purple/20 blur-md rounded-t-md -z-10" })
            ]
          },
          l.id
        );
        return l.tooltip ? /* @__PURE__ */ e(
          fe,
          {
            content: l.tooltip,
            position: l.tooltipPosition,
            className: l.tooltipClassName,
            children: x
          },
          l.id
        ) : x;
      }) }),
      /* @__PURE__ */ e(
        d.div,
        {
          className: "absolute bottom-0 h-0.5 bg-gradient-to-r from-transparent via-ghost-purple to-transparent",
          animate: {
            left: `${c / t.length * 100}%`,
            width: `${100 / t.length}%`
          },
          transition: { type: "spring", stiffness: 500, damping: 30 }
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "relative mt-4", children: t.map((l) => {
      const u = l.id === s;
      return /* @__PURE__ */ e(
        "div",
        {
          role: "tabpanel",
          id: `panel-${l.id}`,
          "aria-labelledby": `tab-${l.id}`,
          hidden: !u,
          className: g(
            "transition-opacity duration-200",
            u ? "opacity-100" : "opacity-0"
          ),
          children: u && /* @__PURE__ */ e(
            d.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 10 },
              transition: { duration: 0.2 },
              children: l.content
            }
          )
        },
        l.id
      );
    }) })
  ] });
}, De = [
  "᚛",
  "᚜",
  "ᚠ",
  "ᚢ",
  "ᚦ",
  "ᚨ",
  "ᚩ",
  "ᚳ",
  "ᚷ",
  "ᚹ",
  "ᚻ",
  "ᚾ",
  "ᛁ",
  "ᛃ",
  "ᛇ",
  "ᛈ",
  "ᛉ",
  "ᛋ",
  "ᛏ",
  "ᛒ",
  "ᛖ",
  "ᛗ",
  "ᛚ",
  "ᛝ",
  "ᛟ",
  "ᛞ"
], Wo = H.forwardRef(
  ({ className: t, label: r = "Invoke the Spirits", value: o, defaultValue: a, onChange: s, onFocus: n, onBlur: i, ...c }, l) => {
    const [u, f] = S(a || ""), [x, C] = S(!1), [k, w] = S(0), N = ht(Date.now()), M = o !== void 0, $ = M ? o : u, O = Math.min(k / 100, 0.8), F = 20 + k / 2;
    W(() => {
      const L = setInterval(() => {
        w((b) => Math.max(0, b - 5));
      }, 100);
      return () => clearInterval(L);
    }, []);
    const T = (L) => {
      M || f(L.target.value), w((b) => Math.min(100, b + 15)), N.current = Date.now(), s?.(L);
    }, E = (L) => {
      C(!0), n?.(L);
    }, j = (L) => {
      C(!1), i?.(L);
    };
    return /* @__PURE__ */ p("div", { className: "relative w-full max-w-xl", children: [
      /* @__PURE__ */ e("svg", { className: "absolute w-0 h-0 pointer-events-none", children: /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: "ectoplasm-distortion", children: [
        /* @__PURE__ */ e(
          "feTurbulence",
          {
            type: "fractalNoise",
            baseFrequency: "0.01 0.04",
            numOctaves: 3,
            result: "noise",
            children: /* @__PURE__ */ e(
              "animate",
              {
                attributeName: "baseFrequency",
                dur: "15s",
                values: "0.01 0.04; 0.02 0.06; 0.01 0.04",
                repeatCount: "indefinite"
              }
            )
          }
        ),
        /* @__PURE__ */ e(
          "feDisplacementMap",
          {
            in: "SourceGraphic",
            in2: "noise",
            scale: F
          }
        )
      ] }) }) }),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute -inset-1 bg-purple-900/30 rounded transition-opacity duration-300 pointer-events-none",
          style: {
            filter: "url(#ectoplasm-distortion)",
            opacity: x ? 0.6 + O / 2 : 0
          }
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0 bg-purple-500/10 blur-xl rounded pointer-events-none transition-opacity duration-100",
          style: {
            opacity: O
          }
        }
      ),
      /* @__PURE__ */ e(B, { children: k > 10 && /* @__PURE__ */ e(re, { children: Array.from({ length: 6 }).map((L, b) => {
        const P = De[Math.floor(Math.random() * De.length)], ae = 10 + Math.random() * 80, ne = 10 + Math.random() * 80, U = Math.random() * 360;
        return /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute text-4xl text-purple-300/20 font-rune pointer-events-none",
            style: {
              left: `${ae}%`,
              top: `${ne}%`,
              transform: `rotate(${U}deg)`
            },
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: Math.random() * 0.5 + k / 200,
              scale: 1,
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10
            },
            exit: { opacity: 0, scale: 1.2 },
            transition: { duration: 2, ease: "easeInOut" },
            children: P
          },
          `rune-${b}`
        );
      }) }) }),
      /* @__PURE__ */ e(
        "label",
        {
          className: g(
            "absolute left-4 top-4 font-rune uppercase tracking-widest transition-all duration-300 pointer-events-none z-10",
            x || $ ? "text-[10px] -translate-y-7 text-purple-400" : "text-xs text-purple-200/50"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ e(
        "textarea",
        {
          ref: l,
          className: g(
            "w-full min-h-[160px] resize-y relative z-10",
            "bg-[#0a0510]/80 backdrop-blur-sm",
            "border border-purple-500/20",
            "text-purple-100 text-lg leading-relaxed font-serif",
            "px-4 pt-8 pb-4",
            "outline-none",
            "placeholder:text-purple-900/50",
            "selection:bg-purple-500/30 selection:text-white",
            "ghost-text",
            x && "border-purple-500/50",
            t
          ),
          style: x ? {
            boxShadow: `0 0 ${20 + k}px rgba(168, 85, 247, ${0.1 + k / 500})`
          } : void 0,
          ...M ? { value: o } : { defaultValue: a },
          onChange: T,
          onFocus: E,
          onBlur: j,
          ...c
        }
      ),
      /* @__PURE__ */ e("div", { className: "absolute top-0 left-0 w-1 h-1 border-t border-l border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ e("div", { className: "absolute top-0 right-0 w-1 h-1 border-t border-r border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 w-1 h-1 border-b border-l border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ e("div", { className: "absolute bottom-0 right-0 w-1 h-1 border-b border-r border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ e("div", { className: "absolute bottom-4 right-4 z-20 transition-colors duration-500", children: k > 50 ? /* @__PURE__ */ e(Ao, { className: g("w-5 h-5 text-purple-400 animate-spin") }) : /* @__PURE__ */ e(q, { className: g(
        "w-5 h-5 transition-colors duration-500",
        x ? "text-purple-700" : "text-purple-900/40"
      ) }) }),
      /* @__PURE__ */ e("style", { children: `
          @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap');
          
          .ghost-text {
            text-shadow: 0 0 8px rgba(168, 85, 247, 0.4), 2px 2px 0px rgba(0,0,0,0.5);
            caret-color: #d8b4fe;
          }
          
          .font-rune {
            font-family: 'Cinzel', serif;
            user-select: none;
          }
        ` })
    ] });
  }
);
Wo.displayName = "WhisperBox";
const Qo = {
  blood: {
    container: "bg-gray-900 border-2 border-red-900",
    fill: "bg-red-900",
    glow: "shadow-[0_0_15px_rgba(138,28,28,0.8)]",
    filterId: "goo-3d-blood",
    dripColor: "bg-red-900",
    icon: /* @__PURE__ */ e(Ie, { className: "w-4 h-4" })
  },
  candle: {
    container: "bg-gray-900 border-2 border-orange-200",
    fill: "bg-orange-100",
    glow: "shadow-[0_0_15px_rgba(255,237,213,0.6)]",
    filterId: "goo-3d-candle",
    dripColor: "bg-orange-100",
    icon: /* @__PURE__ */ e(xo, { className: "w-4 h-4" })
  },
  soul: {
    container: "bg-gray-900 border-2 border-indigo-600",
    fill: "bg-indigo-600",
    glow: "shadow-[0_0_20px_rgba(79,70,229,0.8)]",
    filterId: "none",
    dripColor: "",
    icon: /* @__PURE__ */ e(q, { className: "w-4 h-4" })
  }
}, Xo = ({
  value: t,
  variant: r = "blood",
  className: o
}) => {
  const a = Math.min(100, Math.max(0, t)), s = a === 100, n = Qo[r], i = r !== "soul";
  return /* @__PURE__ */ p("div", { className: g("w-full", o), children: [
    /* @__PURE__ */ p("div", { className: "flex items-center justify-between mb-2 text-sm", children: [
      /* @__PURE__ */ p("div", { className: "flex items-center gap-2 text-gray-300", children: [
        n.icon,
        /* @__PURE__ */ e("span", { className: "uppercase font-semibold tracking-wide", children: r })
      ] }),
      /* @__PURE__ */ p("span", { className: "text-gray-400 font-mono", children: [
        Math.round(a),
        "%"
      ] })
    ] }),
    i && /* @__PURE__ */ e("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: n.filterId, children: [
      /* @__PURE__ */ e("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "4", result: "blur" }),
      /* @__PURE__ */ e(
        "feColorMatrix",
        {
          in: "blur",
          mode: "matrix",
          values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8",
          result: "goo"
        }
      ),
      /* @__PURE__ */ e("feGaussianBlur", { in: "goo", stdDeviation: "2", result: "gooBlur" }),
      /* @__PURE__ */ e(
        "feSpecularLighting",
        {
          in: "gooBlur",
          surfaceScale: "2",
          specularConstant: "1",
          specularExponent: "15",
          lightingColor: "#ffffff",
          result: "specular",
          children: /* @__PURE__ */ e("fePointLight", { x: "50", y: "50", z: "100" })
        }
      ),
      /* @__PURE__ */ e("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
      /* @__PURE__ */ e("feComposite", { in: "specularInGoo", in2: "goo", operator: "over" })
    ] }) }) }),
    /* @__PURE__ */ p("div", { className: g("relative h-6 rounded-full overflow-hidden", n.container), children: [
      /* @__PURE__ */ p(
        d.div,
        {
          className: g("absolute inset-y-0 left-0 rounded-full", n.fill, n.glow),
          style: {
            filter: i ? `url(#${n.filterId})` : "none"
          },
          initial: { width: 0 },
          animate: { width: `${a}%` },
          transition: {
            type: "spring",
            stiffness: 50,
            damping: 15
          },
          children: [
            r === "soul" && a > 0 && /* @__PURE__ */ p(re, { children: [
              /* @__PURE__ */ e(
                d.div,
                {
                  className: "absolute inset-0 rounded-full opacity-30",
                  style: {
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    backgroundSize: "200% 100%"
                  },
                  animate: {
                    backgroundPosition: ["0% 0%", "200% 0%"]
                  },
                  transition: {
                    duration: 3,
                    repeat: 1 / 0,
                    ease: "linear"
                  }
                }
              ),
              Array.from({ length: 5 }).map((c, l) => /* @__PURE__ */ e(
                d.div,
                {
                  className: "absolute w-1 h-1 bg-white rounded-full",
                  style: {
                    top: `${20 + l * 15}%`
                  },
                  animate: {
                    left: ["0%", "100%"],
                    opacity: [0, 1, 0]
                  },
                  transition: {
                    duration: 2 + l,
                    repeat: 1 / 0,
                    ease: "linear"
                  }
                },
                l
              )),
              /* @__PURE__ */ e(
                "div",
                {
                  className: "absolute right-0 inset-y-0 w-4 rounded-r-full",
                  style: {
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.8), transparent)",
                    filter: "blur(4px)"
                  }
                }
              )
            ] }),
            (r === "blood" || r === "candle") && a > 0 && /* @__PURE__ */ p(re, { children: [
              /* @__PURE__ */ e(
                d.div,
                {
                  className: g("absolute right-0 w-1 rounded-b-full", n.dripColor),
                  style: {
                    top: "100%",
                    zIndex: -1
                  },
                  animate: {
                    height: [10, 25, 10]
                  },
                  transition: {
                    duration: 2,
                    repeat: 1 / 0,
                    ease: "easeInOut"
                  }
                }
              ),
              /* @__PURE__ */ e(
                d.div,
                {
                  className: g("absolute w-1 rounded-b-full", n.dripColor),
                  style: {
                    right: "8px",
                    top: "100%",
                    zIndex: -1
                  },
                  animate: {
                    height: [8, 20, 8]
                  },
                  transition: {
                    duration: 3,
                    repeat: 1 / 0,
                    ease: "easeInOut"
                  }
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e(B, { children: s && /* @__PURE__ */ e(
        d.div,
        {
          className: g("absolute inset-0 rounded-full pointer-events-none", n.glow),
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 1, 0],
            scale: 1.2
          },
          exit: { opacity: 0 },
          transition: {
            duration: 1,
            repeat: 1 / 0
          }
        }
      ) })
    ] })
  ] });
};
Xo.displayName = "SpookyProgressBar";
const J = ({ variant: t, className: r }) => /* @__PURE__ */ e("div", { className: g("relative overflow-hidden rounded-md", (() => {
  switch (t) {
    case "sweep":
      return "animate-spirit-sweep";
    case "scan":
      return "bg-[#1e1e2e] scanline";
    case "flicker":
      return "animate-ecto-flicker";
    case "fog":
      return "bg-[#2d2d44]";
    default:
      return "animate-spirit-sweep";
  }
})(), r), children: t === "fog" && /* @__PURE__ */ e("div", { className: "absolute inset-0 fog-overlay" }) }), mr = ({ variant: t, className: r }) => /* @__PURE__ */ p(re, { children: [
  /* @__PURE__ */ e("style", { children: `
        @keyframes spirit-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .animate-spirit-sweep {
          background: linear-gradient(90deg, #1a0b2e 0%, #2e1065 25%, #22c55e 50%, #2e1065 75%, #1a0b2e 100%);
          background-size: 200% 100%;
          animation: spirit-sweep 3s linear infinite;
        }

        @keyframes scanline-move {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .scanline::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: #00ff7f;
          box-shadow: 0 0 10px #00ff7f, 0 0 20px #00ff7f;
          opacity: 0.6;
          animation: scanline-move 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 10;
        }

        @keyframes ecto-flicker {
          0%, 100% { opacity: 0.3; }
          5% { opacity: 0.8; }
          10% { opacity: 0.3; }
          15% { opacity: 0.3; }
          20% { opacity: 0.7; }
          40% { opacity: 0.3; }
          80% { opacity: 0.5; }
        }

        .animate-ecto-flicker {
          animation: ecto-flicker 3s steps(10, start) infinite;
          background-color: #4c1d95;
        }

        @keyframes fog-drift {
          0% { transform: translateX(-10%); opacity: 0.2; }
          50% { transform: translateX(10%); opacity: 0.5; }
          100% { transform: translateX(-10%); opacity: 0.2; }
        }

        .fog-overlay {
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          filter: blur(20px);
          animation: fog-drift 6s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spirit-sweep,
          .animate-ecto-flicker,
          .fog-overlay,
          .scanline::after {
            animation: none;
          }
        }
      ` }),
  /* @__PURE__ */ p(
    "div",
    {
      className: g(
        "relative p-6 rounded-2xl border border-ghost-purple/20 bg-[#0f0716] shadow-lg",
        r
      ),
      role: "status",
      "aria-label": "Loading content",
      children: [
        /* @__PURE__ */ p("div", { className: "flex items-start gap-4 mb-4", children: [
          /* @__PURE__ */ e(
            J,
            {
              variant: t,
              className: "w-12 h-12 rounded-full flex-shrink-0"
            }
          ),
          /* @__PURE__ */ p("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ e(J, { variant: t, className: "h-4 w-3/4" }),
            /* @__PURE__ */ e(J, { variant: t, className: "h-3 w-1/2" })
          ] })
        ] }),
        /* @__PURE__ */ p("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e(J, { variant: t, className: "h-3 w-full" }),
          /* @__PURE__ */ e(J, { variant: t, className: "h-3 w-5/6" }),
          /* @__PURE__ */ e(J, { variant: t, className: "h-3 w-4/5" })
        ] }),
        /* @__PURE__ */ e("div", { className: "absolute top-4 right-4 opacity-20", children: /* @__PURE__ */ e(q, { className: "w-6 h-6 text-ghost-purple" }) })
      ]
    }
  )
] }), hr = ({
  color: t = "#A855F7",
  size: r = 20,
  trailLength: o = 8
}) => {
  const [a, s] = S([]), [n, i] = S({ x: 0, y: 0 });
  return W(() => {
    let c = 0;
    const l = (u) => {
      const f = {
        x: u.clientX,
        y: u.clientY,
        id: c++
      };
      i({ x: u.clientX, y: u.clientY }), s((x) => [f, ...x].slice(0, o));
    };
    return window.addEventListener("mousemove", l), () => window.removeEventListener("mousemove", l);
  }, [o]), /* @__PURE__ */ p("div", { className: "pointer-events-none fixed inset-0 z-50", children: [
    /* @__PURE__ */ e(
      d.div,
      {
        className: "absolute",
        style: {
          left: n.x,
          top: n.y,
          width: r,
          height: r
        },
        animate: {
          x: -r / 2,
          y: -r / 2
        },
        children: /* @__PURE__ */ p("svg", { viewBox: "0 0 24 32", fill: "none", className: "w-full h-full", children: [
          /* @__PURE__ */ e(
            "path",
            {
              d: "M12 2 C7 2, 4 5, 4 10 L4 24 L7 22 L10 24 L12 22 L14 24 L17 22 L20 24 L20 10 C20 5, 17 2, 12 2 Z",
              fill: t,
              opacity: "0.6",
              filter: "url(#ghost-glow)"
            }
          ),
          /* @__PURE__ */ e("circle", { cx: "9", cy: "12", r: "1.5", fill: "white", opacity: "0.9" }),
          /* @__PURE__ */ e("circle", { cx: "15", cy: "12", r: "1.5", fill: "white", opacity: "0.9" }),
          /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("filter", { id: "ghost-glow", children: [
            /* @__PURE__ */ e("feGaussianBlur", { stdDeviation: "2", result: "coloredBlur" }),
            /* @__PURE__ */ p("feMerge", { children: [
              /* @__PURE__ */ e("feMergeNode", { in: "coloredBlur" }),
              /* @__PURE__ */ e("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ e(B, { children: a.map((c, l) => /* @__PURE__ */ e(
      d.div,
      {
        className: "absolute rounded-full",
        style: {
          left: c.x,
          top: c.y,
          width: r * 0.6,
          height: r * 0.6,
          backgroundColor: t
        },
        initial: { opacity: 0.4, scale: 1 },
        animate: {
          opacity: 0.4 - l / o * 0.4,
          scale: 1 - l / o * 0.5,
          x: -r * 0.3,
          y: -r * 0.3
        },
        exit: { opacity: 0, scale: 0 },
        transition: { duration: 0.3 }
      },
      c.id
    )) })
  ] });
}, fr = ({
  color: t = "#90FFB5",
  particleCount: r = 3
}) => {
  const [o, a] = S([]);
  return W(() => {
    let s = 0, n = 0;
    const i = (c) => {
      const l = Date.now();
      if (l - n < 50) return;
      n = l;
      const u = [];
      for (let f = 0; f < r; f++)
        u.push({
          x: c.clientX + (Math.random() - 0.5) * 20,
          y: c.clientY + (Math.random() - 0.5) * 20,
          id: s++,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1
        });
      a((f) => [...f, ...u].slice(-30));
    };
    return window.addEventListener("mousemove", i), () => window.removeEventListener("mousemove", i);
  }, [r]), /* @__PURE__ */ e("div", { className: "pointer-events-none fixed inset-0 z-50", children: /* @__PURE__ */ e(B, { children: o.map((s) => /* @__PURE__ */ e(
    d.div,
    {
      className: "absolute rounded-full",
      style: {
        left: s.x,
        top: s.y,
        width: 4 + Math.random() * 4,
        height: 4 + Math.random() * 4,
        backgroundColor: t,
        boxShadow: `0 0 10px ${t}`
      },
      initial: { opacity: 0.8, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0.2,
        x: s.vx * 50,
        y: s.vy * 50
      },
      exit: { opacity: 0 },
      transition: { duration: 1, ease: "easeOut" },
      onAnimationComplete: () => {
        a((n) => n.filter((i) => i.id !== s.id));
      }
    },
    s.id
  )) }) });
}, gr = ({
  variant: t = "orb",
  color: r = "#FF4D4D"
}) => {
  const [o, a] = S({ x: 0, y: 0 }), [s, n] = S(!1);
  W(() => {
    const c = (f) => {
      a({ x: f.clientX, y: f.clientY });
    }, l = () => n(!0), u = () => n(!1);
    return window.addEventListener("mousemove", c), window.addEventListener("mousedown", l), window.addEventListener("mouseup", u), () => {
      window.removeEventListener("mousemove", c), window.removeEventListener("mousedown", l), window.removeEventListener("mouseup", u);
    };
  }, []);
  const i = () => {
    switch (t) {
      case "claw":
        return /* @__PURE__ */ e("svg", { viewBox: "0 0 40 40", className: "w-10 h-10", children: /* @__PURE__ */ p("g", { transform: "translate(20, 20)", children: [
          [0, 1, 2].map((c) => /* @__PURE__ */ e(
            d.line,
            {
              x1: "0",
              y1: "0",
              x2: Math.cos(c * Math.PI / 3) * 15,
              y2: Math.sin(c * Math.PI / 3) * 15,
              stroke: r,
              strokeWidth: "2",
              strokeLinecap: "round",
              animate: s ? { x2: Math.cos(c * Math.PI / 3) * 10, y2: Math.sin(c * Math.PI / 3) * 10 } : {}
            },
            c
          )),
          /* @__PURE__ */ e("circle", { cx: "0", cy: "0", r: "3", fill: r })
        ] }) });
      case "finger":
        return /* @__PURE__ */ e("svg", { viewBox: "0 0 30 40", className: "w-8 h-10", children: /* @__PURE__ */ e(
          d.path,
          {
            d: "M15 5 L15 30 Q15 35, 12 35 L12 30 L15 30 L15 5 Q15 2, 18 5 L18 30 L15 30",
            fill: r,
            opacity: "0.8",
            animate: s ? { scaleY: 0.9 } : { scaleY: 1 },
            style: { transformOrigin: "center" }
          }
        ) });
      case "orb":
      default:
        return /* @__PURE__ */ p(
          d.div,
          {
            className: "relative",
            animate: s ? { scale: 0.8 } : { scale: 1 },
            children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "w-6 h-6 rounded-full",
                  style: {
                    backgroundColor: r,
                    boxShadow: `0 0 20px ${r}, 0 0 40px ${r}`
                  }
                }
              ),
              /* @__PURE__ */ e(
                d.div,
                {
                  className: "absolute inset-0 rounded-full border-2",
                  style: { borderColor: r },
                  animate: {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  },
                  transition: {
                    duration: 2,
                    repeat: 1 / 0,
                    ease: "easeOut"
                  }
                }
              )
            ]
          }
        );
    }
  };
  return /* @__PURE__ */ e("div", { className: "pointer-events-none fixed inset-0 z-50", children: /* @__PURE__ */ e(
    d.div,
    {
      className: "absolute",
      style: {
        left: o.x,
        top: o.y
      },
      animate: {
        x: -20,
        y: -20
      },
      children: i()
    }
  ) });
}, br = ({
  isVisible: t,
  children: r,
  duration: o = 0.5
}) => /* @__PURE__ */ e(B, { mode: "wait", children: t && /* @__PURE__ */ e(
  d.div,
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: o },
    children: r
  }
) }), yr = ({
  isActive: t,
  onComplete: r,
  duration: o = 1
}) => {
  const [a, s] = S([]);
  return W(() => {
    if (t) {
      const n = Array.from({ length: 15 }, (c, l) => ({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        id: l
      }));
      s(n);
      const i = setTimeout(() => {
        r?.();
      }, o * 1e3);
      return () => clearTimeout(i);
    }
  }, [t, o, r]), /* @__PURE__ */ e(B, { children: t && /* @__PURE__ */ p(
    d.div,
    {
      className: "fixed inset-0 z-50 pointer-events-none",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ e("svg", { className: "w-full h-full", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: a.map((n) => /* @__PURE__ */ e(
          d.line,
          {
            x1: n.x1,
            y1: n.y1,
            x2: n.x2,
            y2: n.y2,
            stroke: "white",
            strokeWidth: "0.2",
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 0.8 },
            transition: { duration: o * 0.5, delay: n.id * 0.05 }
          },
          n.id
        )) }),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute inset-0 bg-white",
            initial: { opacity: 0 },
            animate: { opacity: [0, 0.3, 1] },
            transition: { duration: o, times: [0, 0.7, 1] }
          }
        )
      ]
    }
  ) });
}, Ho = ({ className: t }) => /* @__PURE__ */ p(
  "svg",
  {
    width: "800px",
    height: "800px",
    viewBox: "0 0 512 512",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    children: [
      /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ p("linearGradient", { id: "bloodSmearGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#991b1b" }),
        /* @__PURE__ */ e("stop", { offset: "50%", stopColor: "#b91c1c" }),
        /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#7f1d1d" })
      ] }) }),
      /* @__PURE__ */ e(
        "path",
        {
          fill: "url(#bloodSmearGradient)",
          d: "M18 18v229.88c22.044 9.644 49.156-17.056 37.773-38.415-9.77-18.333-28.462-64.016 2.426-62.99 28.694.953-6.267 51.97 28.515 57.074 34.492 3.933 27.964-35.193 22.09-56.23-.83-24.395 41.38-26.67 43.338-2.185 8.49 38.33 1.755 77.958-10.797 114.553-6.183 26.524 23.463 53.067 48.754 40.68 21.484-8.98 27.2-37.24 15.63-56.155-9.393-21.09-14.358-46.482-7.056-68.848 15.266-17.564 34.26-2.558 31.67 19.4-2.603 22.057 34.583 31.325 47.707 12.366 12.132-13.536-3.528-44.482 25.866-38.55 24.315 8.45 20.396 42.19 23.975 63.074 1.875 57.63-4.794 115.585-17.48 171.766-6.737 21.168-15.6 49.026 4.77 65.818 20.44 19.52 57 2.728 57.87-24.834.22-41.152-14.95-80.59-16.593-121.685-1.99-51.07-6.23-102.407-1.945-153.452-1.35-22.65 26.44-52.9 47.29-33.247 14.973 22.996-3.973 48.37-2.218 71.568 2.93 38.73 64.42 11.456 42.328-19.217-15.696-21.732 21.673-62.3 29.37-24.413 9.04 28.41 11.366 62.216-2.663 88.127-10.492 19.376-17.404 46.694 5.806 56.666 7.55 3.914 15.26 3.6 19.574-.25V18zm58.988 120.832c21.007 14.74 2.246 37.2 10.23 48.88 1.113 2.357 9.44 7.467 7.966 7.622-27.937-2.57-17.47-21.197-16.758-39.598-1.642-9.125-3.514-16.687-1.438-16.904zm83.46 9.176c15.11 37.11 14.654 71.48.814 107.937-7.613 16.268 12.677 35.28 19.03 39.336-27.713-3.024-36.51-30.838-25.93-52.378 9.564-30.688 12.476-54.2 6.085-94.894zm79.997 28.32c-.87 14.396 8.95 22.896 30.348 29.96-17.49 11.152-43.003-10.59-30.348-29.96zm167.602 13.215c1.624-.008 3.56 2.88 5.043 10.062 3.194 15.478 16.705 9.406 26.406.688.426 17.666-31.39 25.417-34.154 3.49-1.372-8.03.33-14.228 2.705-14.24zm78.185 14.55a.422.422 0 0 1 .147.013c.786 6.186 1.374 13.183 1.243 19.416 3.29 24.09-15.953 44.724-7.834 67.03 4.092 11.247 3.7 18.713-7.085 10.108-13.438-12.492-2.112-35.942 4.592-52.05 6.498-9.613 5.937-44.258 8.935-44.518zm-150.543 59.9c4.252 13.3 1.957 33.317 3.156 48.777-1.066 44.92-10.64 87.364-14.39 131.2-.59 6.89 13.26 28.558-1.274 20.708-17.077-9.554-10.357-31.603-7.137-46.46 13.697-50.267 17.806-102.36 19.644-154.226z"
        }
      )
    ]
  }
), xr = ({
  isNavigating: t,
  onComplete: r,
  className: o
}) => /* @__PURE__ */ e(B, { mode: "wait", onExitComplete: r, children: t && /* @__PURE__ */ p(
  d.div,
  {
    className: g(
      "fixed inset-0 z-[100] pointer-events-none flex flex-col justify-end",
      o
    ),
    initial: { y: "-100%" },
    animate: { y: "200%" },
    exit: { y: "200%" },
    transition: {
      duration: 2.5,
      ease: [0.45, 0, 0.55, 1],
      times: [0, 1]
    },
    children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: "flex-grow w-full min-h-[100vh]",
          style: {
            background: "linear-gradient(180deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)"
          },
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: "absolute top-0 left-[15%] w-8 h-full opacity-20",
                style: {
                  background: "linear-gradient(180deg, transparent 0%, #ef4444 30%, #ef4444 70%, transparent 100%)"
                }
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                className: "absolute top-0 left-[45%] w-12 h-full opacity-15",
                style: {
                  background: "linear-gradient(180deg, transparent 0%, #f87171 20%, #f87171 80%, transparent 100%)"
                }
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                className: "absolute top-0 left-[75%] w-6 h-full opacity-20",
                style: {
                  background: "linear-gradient(180deg, transparent 0%, #ef4444 40%, #ef4444 60%, transparent 100%)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ p("div", { className: "relative w-full h-64 md:h-80 -mt-1", children: [
        /* @__PURE__ */ e(Ho, { className: "w-full h-full drop-shadow-lg" }),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[40%] left-[8%] w-3 h-5 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #ef4444 0%, #991b1b 60%, #7f1d1d 100%)"
            },
            initial: { y: 0, opacity: 1 },
            animate: { y: 350, scaleY: 1.8, opacity: [1, 1, 0.8] },
            transition: { duration: 0.9, repeat: 1 / 0, ease: "easeIn" }
          }
        ),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[30%] left-[25%] w-4 h-6 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #ef4444 0%, #b91c1c 50%, #991b1b 100%)"
            },
            initial: { y: 0 },
            animate: { y: 400, scaleY: 1.5 },
            transition: {
              duration: 1.2,
              repeat: 1 / 0,
              ease: "easeIn",
              delay: 0.3
            }
          }
        ),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[20%] left-[38%] w-5 h-8 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #f87171 0%, #dc2626 40%, #991b1b 100%)"
            },
            initial: { y: 0 },
            animate: { y: 450, scaleY: 1.6 },
            transition: {
              duration: 1.4,
              repeat: 1 / 0,
              ease: "easeIn",
              delay: 0.1
            }
          }
        ),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[50%] left-[52%] w-3 h-4 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #ef4444 0%, #991b1b 70%)"
            },
            initial: { y: 0 },
            animate: { y: 300, scaleY: 1.4 },
            transition: {
              duration: 0.8,
              repeat: 1 / 0,
              ease: "easeIn",
              delay: 0.5
            }
          }
        ),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[35%] left-[68%] w-4 h-7 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)"
            },
            initial: { y: 0 },
            animate: { y: 380, scaleY: 1.5 },
            transition: {
              duration: 1.1,
              repeat: 1 / 0,
              ease: "easeIn",
              delay: 0.4
            }
          }
        ),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[45%] left-[82%] w-2 h-4 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #f87171 0%, #991b1b 80%)"
            },
            initial: { y: 0 },
            animate: { y: 320, scaleY: 1.6 },
            transition: {
              duration: 0.7,
              repeat: 1 / 0,
              ease: "easeIn",
              delay: 0.6
            }
          }
        ),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute top-[25%] left-[92%] w-4 h-6 rounded-full",
            style: {
              background: "radial-gradient(ellipse at 30% 30%, #ef4444 0%, #dc2626 40%, #991b1b 100%)"
            },
            initial: { y: 0 },
            animate: { y: 420, scaleY: 1.7 },
            transition: {
              duration: 1.3,
              repeat: 1 / 0,
              ease: "easeIn",
              delay: 0.2
            }
          }
        )
      ] })
    ]
  }
) }), vr = ({
  isActive: t,
  onComplete: r,
  duration: o = 1.2
}) => /* @__PURE__ */ e(B, { onExitComplete: r, children: t && /* @__PURE__ */ p(d.div, { className: "fixed inset-0 z-50 pointer-events-none overflow-hidden", children: [
  Array.from({ length: 8 }).map((a, s) => /* @__PURE__ */ e(
    d.div,
    {
      className: "absolute bottom-0 w-full",
      style: {
        height: "100%",
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
        transformOrigin: "bottom"
      },
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1 },
      exit: { scaleY: 0, opacity: 0 },
      transition: {
        duration: o * 0.6,
        delay: s * 0.1,
        ease: "easeOut"
      }
    },
    s
  )),
  /* @__PURE__ */ e(
    d.div,
    {
      className: "absolute inset-0 bg-black",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: o * 0.4, delay: o * 0.6 }
    }
  )
] }) }), wr = ({
  isActive: t,
  onComplete: r,
  batCount: o = 20,
  duration: a = 1.5
}) => {
  const [s, n] = S([]);
  return W(() => {
    if (t) {
      const l = Array.from({ length: o }, (f, x) => {
        const C = x / o * Math.PI * 2, k = 150;
        return {
          id: x,
          startX: 50,
          startY: 50,
          endX: 50 + Math.cos(C) * k,
          endY: 50 + Math.sin(C) * k,
          delay: Math.random() * 0.3
        };
      });
      n(l);
      const u = setTimeout(() => {
        r?.();
      }, (a + 0.3) * 1e3);
      return () => clearTimeout(u);
    }
  }, [t, o, a, r]), /* @__PURE__ */ e(B, { children: t && /* @__PURE__ */ p(
    d.div,
    {
      className: "fixed inset-0 z-50 pointer-events-none",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ e("svg", { className: "w-full h-full", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: s.map((i) => /* @__PURE__ */ e(
          d.g,
          {
            initial: {
              x: i.startX,
              y: i.startY,
              opacity: 0,
              scale: 0
            },
            animate: {
              x: i.endX,
              y: i.endY,
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5]
            },
            transition: {
              duration: a,
              delay: i.delay,
              ease: "easeOut"
            },
            children: /* @__PURE__ */ e(
              "path",
              {
                d: "M0,-2 Q-3,-1 -4,0 Q-3,1 -2,1 L-1,0 Q-0.5,0.5 0,0.5 Q0.5,0.5 1,0 L2,1 Q3,1 4,0 Q3,-1 0,-2 Z",
                fill: "currentColor",
                className: "text-ghost-dark"
              }
            )
          },
          i.id
        )) }),
        /* @__PURE__ */ e(
          d.div,
          {
            className: "absolute inset-0 bg-black",
            initial: { opacity: 0 },
            animate: { opacity: [0, 0.5, 1] },
            transition: { duration: a, times: [0, 0.5, 1] }
          }
        )
      ]
    }
  ) });
};
export {
  wr as BatBurst,
  Ro as BatDivider,
  lr as BatToggle,
  xr as BloodSmear,
  ir as CauldronLoader,
  Po as CoffinCard,
  yr as CrackTransition,
  gr as CursedPointer,
  Jo as FogBackground,
  hr as GhostCursor,
  nr as GhostFloatLoader,
  pr as GhostToast,
  dr as GhostToastProvider,
  or as GlitchText,
  ao as GooeyButton,
  no as GooeyCard,
  ar as GraveModal,
  Yo as HauntedSidebar,
  sr as HauntedVignette,
  er as MoonBackdrop,
  Oo as MoonlightSwitch,
  vr as ShadowCrawl,
  J as SkeletonBlock,
  tr as SkullLoader,
  ur as SpectralTabs,
  rr as SpiderWeb,
  Eo as SpiritInput,
  Xo as SpookyProgressBar,
  mr as SpookySkeleton,
  fe as SpookyTooltip,
  br as VeilFade,
  Wo as WhisperBox,
  fr as WispTrail,
  cr as useToast
};
