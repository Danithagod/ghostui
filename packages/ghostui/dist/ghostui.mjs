import { jsxs as p, jsx as t, Fragment as W } from "react/jsx-runtime";
import O, { createContext as Le, useContext as Se, useState as G, useCallback as Q, useEffect as A, forwardRef as De, createElement as Ae, useId as ht, isValidElement as mt, cloneElement as Kt, useRef as L, useLayoutEffect as Jt, useMemo as ce, Children as Qt } from "react";
import { motion as v, AnimatePresence as D, useMotionValue as Ce, useSpring as re, useMotionTemplate as eo, useTransform as V } from "framer-motion";
import to, { createPortal as oo } from "react-dom";
function ft(e) {
  var o, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (o = 0; o < s; o++) e[o] && (r = ft(e[o])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ro() {
  for (var e, o, r = 0, n = "", s = arguments.length; r < s; r++) (e = arguments[r]) && (o = ft(e)) && (n && (n += " "), n += o);
  return n;
}
const no = (e, o) => {
  const r = new Array(e.length + o.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < o.length; n++)
    r[e.length + n] = o[n];
  return r;
}, so = (e, o) => ({
  classGroupId: e,
  validator: o
}), gt = (e = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: e,
  validators: o,
  classGroupId: r
}), Ne = "-", Ue = [], io = "arbitrary..", ao = (e) => {
  const o = co(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (l) => {
      if (l.startsWith("[") && l.endsWith("]"))
        return lo(l);
      const a = l.split(Ne), c = a[0] === "" && a.length > 1 ? 1 : 0;
      return bt(a, c, o);
    },
    getConflictingClassGroupIds: (l, a) => {
      if (a) {
        const c = n[l], d = r[l];
        return c ? d ? no(d, c) : c : d || Ue;
      }
      return r[l] || Ue;
    }
  };
}, bt = (e, o, r) => {
  if (e.length - o === 0)
    return r.classGroupId;
  const s = e[o], i = r.nextPart.get(s);
  if (i) {
    const d = bt(e, o + 1, i);
    if (d) return d;
  }
  const l = r.validators;
  if (l === null)
    return;
  const a = o === 0 ? e.join(Ne) : e.slice(o).join(Ne), c = l.length;
  for (let d = 0; d < c; d++) {
    const u = l[d];
    if (u.validator(a))
      return u.classGroupId;
  }
}, lo = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = e.slice(1, -1), r = o.indexOf(":"), n = o.slice(0, r);
  return n ? io + n : void 0;
})(), co = (e) => {
  const {
    theme: o,
    classGroups: r
  } = e;
  return uo(r, o);
}, uo = (e, o) => {
  const r = gt();
  for (const n in e) {
    const s = e[n];
    Pe(s, r, n, o);
  }
  return r;
}, Pe = (e, o, r, n) => {
  const s = e.length;
  for (let i = 0; i < s; i++) {
    const l = e[i];
    po(l, o, r, n);
  }
}, po = (e, o, r, n) => {
  if (typeof e == "string") {
    ho(e, o, r);
    return;
  }
  if (typeof e == "function") {
    mo(e, o, r, n);
    return;
  }
  fo(e, o, r, n);
}, ho = (e, o, r) => {
  const n = e === "" ? o : yt(o, e);
  n.classGroupId = r;
}, mo = (e, o, r, n) => {
  if (go(e)) {
    Pe(e(n), o, r, n);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(so(r, e));
}, fo = (e, o, r, n) => {
  const s = Object.entries(e), i = s.length;
  for (let l = 0; l < i; l++) {
    const [a, c] = s[l];
    Pe(c, yt(o, a), r, n);
  }
}, yt = (e, o) => {
  let r = e;
  const n = o.split(Ne), s = n.length;
  for (let i = 0; i < s; i++) {
    const l = n[i];
    let a = r.nextPart.get(l);
    a || (a = gt(), r.nextPart.set(l, a)), r = a;
  }
  return r;
}, go = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, bo = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  const s = (i, l) => {
    r[i] = l, o++, o > e && (o = 0, n = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let l = r[i];
      if (l !== void 0)
        return l;
      if ((l = n[i]) !== void 0)
        return s(i, l), l;
    },
    set(i, l) {
      i in r ? r[i] = l : s(i, l);
    }
  };
}, Be = "!", Ke = ":", yo = [], Je = (e, o, r, n, s) => ({
  modifiers: e,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: s
}), xo = (e) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = e;
  let n = (s) => {
    const i = [];
    let l = 0, a = 0, c = 0, d;
    const u = s.length;
    for (let g = 0; g < u; g++) {
      const x = s[g];
      if (l === 0 && a === 0) {
        if (x === Ke) {
          i.push(s.slice(c, g)), c = g + 1;
          continue;
        }
        if (x === "/") {
          d = g;
          continue;
        }
      }
      x === "[" ? l++ : x === "]" ? l-- : x === "(" ? a++ : x === ")" && a--;
    }
    const h = i.length === 0 ? s : s.slice(c);
    let m = h, f = !1;
    h.endsWith(Be) ? (m = h.slice(0, -1), f = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      h.startsWith(Be) && (m = h.slice(1), f = !0)
    );
    const y = d && d > c ? d - c : void 0;
    return Je(i, f, m, y);
  };
  if (o) {
    const s = o + Ke, i = n;
    n = (l) => l.startsWith(s) ? i(l.slice(s.length)) : Je(yo, !1, l, void 0, !0);
  }
  if (r) {
    const s = n;
    n = (i) => r({
      className: i,
      parseClassName: s
    });
  }
  return n;
}, vo = (e) => {
  const o = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    o.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let s = [];
    for (let i = 0; i < r.length; i++) {
      const l = r[i], a = l[0] === "[", c = o.has(l);
      a || c ? (s.length > 0 && (s.sort(), n.push(...s), s = []), n.push(l)) : s.push(l);
    }
    return s.length > 0 && (s.sort(), n.push(...s)), n;
  };
}, wo = (e) => ({
  cache: bo(e.cacheSize),
  parseClassName: xo(e),
  sortModifiers: vo(e),
  ...ao(e)
}), ko = /\s+/, Co = (e, o) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: s,
    sortModifiers: i
  } = o, l = [], a = e.trim().split(ko);
  let c = "";
  for (let d = a.length - 1; d >= 0; d -= 1) {
    const u = a[d], {
      isExternal: h,
      modifiers: m,
      hasImportantModifier: f,
      baseClassName: y,
      maybePostfixModifierPosition: g
    } = r(u);
    if (h) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let x = !!g, w = n(x ? y.substring(0, g) : y);
    if (!w) {
      if (!x) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (w = n(y), !w) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      x = !1;
    }
    const k = m.length === 0 ? "" : m.length === 1 ? m[0] : i(m).join(":"), $ = f ? k + Be : k, M = $ + w;
    if (l.indexOf(M) > -1)
      continue;
    l.push(M);
    const F = s(w, x);
    for (let E = 0; E < F.length; ++E) {
      const z = F[E];
      l.push($ + z);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, No = (...e) => {
  let o = 0, r, n, s = "";
  for (; o < e.length; )
    (r = e[o++]) && (n = xt(r)) && (s && (s += " "), s += n);
  return s;
}, xt = (e) => {
  if (typeof e == "string")
    return e;
  let o, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (o = xt(e[n])) && (r && (r += " "), r += o);
  return r;
}, Mo = (e, ...o) => {
  let r, n, s, i;
  const l = (c) => {
    const d = o.reduce((u, h) => h(u), e());
    return r = wo(d), n = r.cache.get, s = r.cache.set, i = a, a(c);
  }, a = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = Co(c, r);
    return s(c, u), u;
  };
  return i = l, (...c) => i(No(...c));
}, So = [], P = (e) => {
  const o = (r) => r[e] || So;
  return o.isThemeGetter = !0, o;
}, vt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, wt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Io = /^\d+\/\d+$/, Eo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, To = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, $o = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, zo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ro = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ie = (e) => Io.test(e), R = (e) => !!e && !Number.isNaN(Number(e)), J = (e) => !!e && Number.isInteger(Number(e)), Te = (e) => e.endsWith("%") && R(e.slice(0, -1)), K = (e) => Eo.test(e), Go = () => !0, Ao = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  To.test(e) && !$o.test(e)
), kt = () => !1, Bo = (e) => zo.test(e), Fo = (e) => Ro.test(e), Oo = (e) => !S(e) && !I(e), Lo = (e) => de(e, Mt, kt), S = (e) => vt.test(e), oe = (e) => de(e, St, Ao), $e = (e) => de(e, Wo, R), Qe = (e) => de(e, Ct, kt), Do = (e) => de(e, Nt, Fo), ve = (e) => de(e, It, Bo), I = (e) => wt.test(e), he = (e) => ue(e, St), Po = (e) => ue(e, Zo), et = (e) => ue(e, Ct), _o = (e) => ue(e, Mt), Ho = (e) => ue(e, Nt), we = (e) => ue(e, It, !0), de = (e, o, r) => {
  const n = vt.exec(e);
  return n ? n[1] ? o(n[1]) : r(n[2]) : !1;
}, ue = (e, o, r = !1) => {
  const n = wt.exec(e);
  return n ? n[1] ? o(n[1]) : r : !1;
}, Ct = (e) => e === "position" || e === "percentage", Nt = (e) => e === "image" || e === "url", Mt = (e) => e === "length" || e === "size" || e === "bg-size", St = (e) => e === "length", Wo = (e) => e === "number", Zo = (e) => e === "family-name", It = (e) => e === "shadow", jo = () => {
  const e = P("color"), o = P("font"), r = P("text"), n = P("font-weight"), s = P("tracking"), i = P("leading"), l = P("breakpoint"), a = P("container"), c = P("spacing"), d = P("radius"), u = P("shadow"), h = P("inset-shadow"), m = P("text-shadow"), f = P("drop-shadow"), y = P("blur"), g = P("perspective"), x = P("aspect"), w = P("ease"), k = P("animate"), $ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [
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
  ], F = () => [...M(), I, S], E = () => ["auto", "hidden", "clip", "visible", "scroll"], z = () => ["auto", "contain", "none"], C = () => [I, S, c], N = () => [ie, "full", "auto", ...C()], B = () => [J, "none", "subgrid", I, S], _ = () => ["auto", {
    span: ["full", J, I, S]
  }, J, I, S], Z = () => [J, "auto", I, S], ne = () => ["auto", "min", "max", "fr", I, S], ee = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], se = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], U = () => ["auto", ...C()], te = () => [ie, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], T = () => [e, I, S], je = () => [...M(), et, Qe, {
    position: [I, S]
  }], Ye = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Ve = () => ["auto", "cover", "contain", _o, Lo, {
    size: [I, S]
  }], Ie = () => [Te, he, oe], j = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    I,
    S
  ], Y = () => ["", R, he, oe], ge = () => ["solid", "dashed", "dotted", "double"], Xe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], H = () => [R, Te, et, Qe], qe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    y,
    I,
    S
  ], be = () => ["none", R, I, S], ye = () => ["none", R, I, S], Ee = () => [R, I, S], xe = () => [ie, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [K],
      breakpoint: [K],
      color: [Go],
      container: [K],
      "drop-shadow": [K],
      ease: ["in", "out", "in-out"],
      font: [Oo],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [K],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [K],
      shadow: [K],
      spacing: ["px", R],
      text: [K],
      "text-shadow": [K],
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
        aspect: ["auto", "square", ie, S, I, x]
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
        columns: [R, S, I, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": $()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": $()
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
        object: F()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: E()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": E()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": E()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: z()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": z()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": z()
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
        inset: N()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": N()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": N()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: N()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: N()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: N()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: N()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: N()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: N()
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
        z: [J, "auto", I, S]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ie, "full", "auto", a, ...C()]
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
        flex: [R, ie, "auto", "initial", "none", S]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", R, I, S]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", R, I, S]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [J, "first", "last", "none", I, S]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": B()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: _()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": B()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: _()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Z()
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
        "auto-cols": ne()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ne()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: C()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": C()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": C()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ee(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...se(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...se()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ee()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...se(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...se(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ee()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...se(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...se()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: C()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: C()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: C()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: C()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: C()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: C()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: C()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: C()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: C()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: U()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: U()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: U()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: U()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: U()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: U()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: U()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: U()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: U()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": C()
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
        "space-y": C()
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
        size: te()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...te()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...te()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [l]
          },
          ...te()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...te()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...te()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...te()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, he, oe]
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
        font: [n, I, $e]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Te, S]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Po, S, o]
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
        tracking: [s, I, S]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [R, "none", I, $e]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...C()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", I, S]
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
        list: ["disc", "decimal", "none", I, S]
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
        placeholder: T()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: T()
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
        decoration: [...ge(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [R, "from-font", "auto", I, oe]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: T()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [R, "auto", I, S]
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
        indent: C()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", I, S]
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
        content: ["none", I, S]
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
        bg: je()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Ye()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Ve()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, J, I, S],
          radial: ["", I, S],
          conic: [J, I, S]
        }, Ho, Do]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: T()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Ie()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Ie()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Ie()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: T()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: T()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: T()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: j()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": j()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": j()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": j()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": j()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": j()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": j()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": j()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": j()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": j()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": j()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": j()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": j()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": j()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": j()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Y()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Y()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Y()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Y()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Y()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Y()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Y()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Y()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Y()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Y()
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
        "divide-y": Y()
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
        border: [...ge(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ge(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: T()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": T()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": T()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": T()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": T()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": T()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": T()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": T()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": T()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: T()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ge(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [R, I, S]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", R, he, oe]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: T()
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
          u,
          we,
          ve
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: T()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", h, we, ve]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": T()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Y()
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
        ring: T()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [R, oe]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": T()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Y()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": T()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, we, ve]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": T()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [R, I, S]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Xe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Xe()
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
        "mask-linear": [R]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": H()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": H()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": T()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": T()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": H()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": H()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": T()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": T()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": H()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": H()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": T()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": T()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": H()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": H()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": T()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": T()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": H()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": H()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": T()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": T()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": H()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": H()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": T()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": T()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": H()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": H()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": T()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": T()
      }],
      "mask-image-radial": [{
        "mask-radial": [I, S]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": H()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": H()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": T()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": T()
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
        "mask-radial-at": M()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [R]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": H()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": H()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": T()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": T()
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
        mask: je()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Ye()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Ve()
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
        mask: ["none", I, S]
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
          I,
          S
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: qe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [R, I, S]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [R, I, S]
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
          f,
          we,
          ve
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": T()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", R, I, S]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [R, I, S]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", R, I, S]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [R, I, S]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", R, I, S]
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
          I,
          S
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": qe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [R, I, S]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [R, I, S]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", R, I, S]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [R, I, S]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", R, I, S]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [R, I, S]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [R, I, S]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", R, I, S]
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
        "border-spacing": C()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": C()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": C()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", I, S]
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
        duration: [R, "initial", I, S]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, I, S]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [R, I, S]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", k, I, S]
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
        perspective: [g, I, S]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": F()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: be()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": be()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": be()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": be()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ye()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ye()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ye()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ye()
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
        skew: Ee()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ee()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ee()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [I, S, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: F()
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
        translate: xe()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": xe()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": xe()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": xe()
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
        accent: T()
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
        caret: T()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", I, S]
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
        "scroll-m": C()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": C()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": C()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": C()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": C()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": C()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": C()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": C()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": C()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": C()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": C()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": C()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": C()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": C()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": C()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": C()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": C()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": C()
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
        "will-change": ["auto", "scroll", "contents", "transform", I, S]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...T()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [R, he, oe, $e]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...T()]
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
}, Yo = /* @__PURE__ */ Mo(jo);
function b(...e) {
  return Yo(ro(e));
}
const tt = {
  slime: {
    bg: "bg-[#32CD32]",
    glow: "shadow-[0_0_20px_rgba(50,205,50,0.7)]",
    text: "text-lime-950",
    drip: "bg-[#32CD32]"
  },
  blood: {
    bg: "bg-[#dc2626]",
    glow: "shadow-[0_0_25px_rgba(220,38,38,0.9)]",
    text: "text-red-50",
    drip: "bg-[#dc2626]"
  },
  ectoplasm: {
    bg: "bg-[#A855F7]",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.8)]",
    text: "text-purple-100",
    drip: "bg-[#A855F7]"
  }
}, ot = {
  low: { duration: 2.5, displacement: 25 },
  medium: { duration: 1.8, displacement: 40 },
  high: { duration: 1.2, displacement: 55 }
}, Vo = O.forwardRef(
  ({
    className: e,
    variant: o = "ectoplasm",
    fluidity: r = "medium",
    children: n,
    disabled: s,
    onClick: i,
    ...l
  }, a) => {
    const d = `goo-filter-${O.useId().replace(/:/g, "")}`, [u, h] = O.useState(!1), [m, f] = O.useState(0), y = tt[o] || tt.ectoplasm, g = ot[r] || ot.medium, x = (M) => {
      f((F) => F + 1), i?.(M);
    }, w = (M) => ({
      initial: { y: 0, scaleY: 1 },
      hover: {
        y: [0, g.displacement * 0.3, 0],
        scaleY: [1, 2, 1],
        // Stretch vertically to connect to leading circle
        transition: {
          duration: g.duration,
          repeat: 1 / 0,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: M
        }
      }
    }), k = (M) => ({
      initial: { y: 0, scale: 1 },
      hover: {
        y: [0, g.displacement, 0],
        scale: [1, 1.2, 1],
        // Grow slightly as it drops
        transition: {
          duration: g.duration,
          repeat: 1 / 0,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: M
        }
      }
    }), $ = {
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
        onMouseEnter: () => h(!0),
        onMouseLeave: () => h(!1),
        children: [
          /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: d, children: [
            /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
            /* @__PURE__ */ t(
              "feColorMatrix",
              {
                in: "blur",
                mode: "matrix",
                values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",
                result: "goo"
              }
            ),
            /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "3", result: "gooBlur" }),
            /* @__PURE__ */ t(
              "feSpecularLighting",
              {
                in: "gooBlur",
                surfaceScale: "3",
                specularConstant: "1.2",
                specularExponent: "20",
                lightingColor: "#ffffff",
                result: "specular",
                children: /* @__PURE__ */ t("feDistantLight", { azimuth: "225", elevation: "45" })
              }
            ),
            /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
            /* @__PURE__ */ t("feComposite", { in: "specularInGoo", in2: "goo", operator: "over" })
          ] }) }) }),
          /* @__PURE__ */ t(
            "div",
            {
              className: b(
                "absolute inset-0 rounded-full pointer-events-none transition-all duration-300",
                y.glow,
                u ? "opacity-100 scale-105" : "opacity-60 scale-100"
              ),
              style: { zIndex: -1 }
            }
          ),
          /* @__PURE__ */ p(
            "div",
            {
              className: "absolute inset-0",
              style: { filter: `url(#${d})` },
              children: [
                /* @__PURE__ */ t(
                  v.div,
                  {
                    className: b(
                      "w-full h-full rounded-full",
                      y.bg,
                      s && "opacity-50"
                    ),
                    variants: $,
                    initial: "initial",
                    animate: u && !s ? "hover" : "initial",
                    whileTap: s ? void 0 : "tap"
                  }
                ),
                /* @__PURE__ */ p(
                  v.div,
                  {
                    initial: "initial",
                    animate: u && !s ? "hover" : "initial",
                    className: "absolute inset-0",
                    children: [
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: b("absolute w-3 h-4 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "25%", bottom: "50%", transformOrigin: "top" },
                          variants: w(0)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: b("absolute w-5 h-5 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "25%", bottom: "45%", transform: "translateX(-15%)", transformOrigin: "top" },
                          variants: k(0)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: b("absolute w-4 h-5 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "50%", bottom: "50%", transformOrigin: "top" },
                          variants: w(0.2)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: b("absolute w-7 h-7 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "50%", bottom: "42%", transform: "translateX(-20%)", transformOrigin: "top" },
                          variants: k(0.2)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: b("absolute w-3 h-4 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "75%", bottom: "50%", transformOrigin: "top" },
                          variants: w(0.4)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: b("absolute w-5 h-5 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "75%", bottom: "45%", transform: "translateX(-15%)", transformOrigin: "top" },
                          variants: k(0.4)
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ t(D, { children: m > 0 && /* @__PURE__ */ t(
                  v.div,
                  {
                    className: b("absolute inset-0 rounded-full", y.bg),
                    initial: { scale: 0.8, opacity: 1 },
                    animate: { scale: 1.8, opacity: 0 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.6, ease: "easeOut" }
                  },
                  m
                ) })
              ]
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              ref: a,
              onClick: x,
              className: b(
                "relative block w-full h-full px-8 py-3 rounded-full font-bold text-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500",
                y.text,
                s && "cursor-not-allowed",
                e
              ),
              disabled: s,
              ...l,
              children: [
                /* @__PURE__ */ t("span", { className: "relative z-10 drop-shadow-sm", children: n }),
                /* @__PURE__ */ t(
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
Vo.displayName = "GooeyButton";
const _e = Le(void 0), Xo = {
  spectral: {
    "--ghost-bg": "#1a0b2e",
    "--ghost-bg-secondary": "#2e1065",
    "--ghost-text": "#e9d5ff",
    "--ghost-text-secondary": "#c4b5fd",
    "--ghost-border": "#FF6F00",
    "--ghost-accent": "#FF6F00",
    "--ghost-accent-rgb": "255, 111, 0"
  },
  blood: {
    "--ghost-bg": "#1f0a0a",
    "--ghost-bg-secondary": "#450a0a",
    "--ghost-text": "#fecaca",
    "--ghost-text-secondary": "#fca5a5",
    "--ghost-border": "#991b1b",
    "--ghost-accent": "#ef4444",
    "--ghost-accent-rgb": "239, 68, 68"
  }
};
function qo(e) {
  if (typeof window > "u") return null;
  const o = localStorage.getItem(e);
  return o === "spectral" || o === "blood" ? o : null;
}
function ze(e) {
  if (typeof document > "u") return;
  const o = document.documentElement;
  o.setAttribute("data-theme", e);
  const r = Xo[e];
  Object.entries(r).forEach(([n, s]) => {
    o.style.setProperty(n, s);
  });
}
function Uo({
  children: e,
  defaultTheme: o = "spectral",
  storageKey: r = "ghostui-theme"
}) {
  const [n, s] = G(o), [i, l] = G(!1), a = Q((u) => {
    s(u), typeof window < "u" && localStorage.setItem(r, u), ze(u);
  }, [r]), c = Q(() => {
    a(n === "spectral" ? "blood" : "spectral");
  }, [n, a]);
  A(() => {
    const h = qo(r) ?? o;
    s(h), ze(h), l(!0);
  }, [r, o]), A(() => {
    i && ze(n);
  }, [n, i]), A(() => {
    const u = (h) => {
      h.key === r && (h.newValue === "spectral" || h.newValue === "blood") && s(h.newValue);
    };
    return window.addEventListener("storage", u), () => window.removeEventListener("storage", u);
  }, [r]);
  const d = { theme: n, setTheme: a, toggleTheme: c };
  return /* @__PURE__ */ t(_e.Provider, { value: d, children: e });
}
function Xn() {
  const e = Se(_e);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
function X() {
  return Se(_e);
}
Uo.displayName = "ThemeProvider";
const Ko = {
  spectral: "bg-[#5b21b6]",
  // Purple
  blood: "bg-[#dc2626]"
  // Red
}, Jo = O.forwardRef(
  ({ children: e, className: o, gooColor: r, variant: n }, s) => {
    const i = X(), l = n ?? i?.theme ?? "spectral", a = r ?? Ko[l], c = O.useId(), d = [
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
    ], u = [
      { position: "right-4", width: "w-12", height: "h-6", bottom: "-bottom-2" },
      { position: "right-16", width: "w-8", height: "h-6", bottom: "-bottom-2" },
      { position: "right-32", width: "w-5", height: "h-4", bottom: "-bottom-1" }
    ];
    return /* @__PURE__ */ p("div", { ref: s, className: "relative inline-block min-w-[320px] min-h-[200px]", children: [
      /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `card-goo-${c}`, children: [
        /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "8", result: "blur" }),
        /* @__PURE__ */ t(
          "feColorMatrix",
          {
            in: "blur",
            mode: "matrix",
            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9",
            result: "goo"
          }
        ),
        /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "2", result: "gooBlur" }),
        /* @__PURE__ */ t(
          "feSpecularLighting",
          {
            in: "gooBlur",
            surfaceScale: "6",
            specularConstant: "1.5",
            specularExponent: "40",
            lightingColor: "#ffffff",
            result: "specular",
            children: /* @__PURE__ */ t("feDistantLight", { azimuth: "225", elevation: "45" })
          }
        ),
        /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
        /* @__PURE__ */ t("feComposite", { in: "specularInGoo", in2: "goo", operator: "over" })
      ] }) }) }),
      /* @__PURE__ */ p(
        "div",
        {
          className: "absolute inset-0",
          style: { filter: `url(#card-goo-${c})` },
          children: [
            /* @__PURE__ */ t("div", { className: b("absolute inset-0 rounded-3xl", a) }),
            d.map((h, m) => /* @__PURE__ */ t(
              v.div,
              {
                className: b(
                  "absolute rounded-full motion-reduce:hidden",
                  h.width,
                  h.position,
                  a
                ),
                style: {
                  top: h.top,
                  transformOrigin: "top"
                },
                animate: {
                  height: h.heights
                },
                transition: {
                  duration: h.duration,
                  repeat: 1 / 0,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: h.delay
                }
              },
              `drip-${m}`
            )),
            u.map((h, m) => /* @__PURE__ */ t(
              "div",
              {
                className: b(
                  "absolute rounded-full",
                  h.width,
                  h.height,
                  h.position,
                  h.bottom,
                  a
                )
              },
              `pool-${m}`
            ))
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: b("relative z-20 p-6", o), children: e }),
      /* @__PURE__ */ t("div", { className: "absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-30" }),
      /* @__PURE__ */ t("div", { className: "absolute inset-0 rounded-3xl border-2 border-black/5 pointer-events-none z-30" })
    ] });
  }
);
Jo.displayName = "GooeyCard";
const Qo = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), er = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, n) => n ? n.toUpperCase() : r.toLowerCase()
), rt = (e) => {
  const o = er(e);
  return o.charAt(0).toUpperCase() + o.slice(1);
}, Et = (...e) => e.filter((o, r, n) => !!o && o.trim() !== "" && n.indexOf(o) === r).join(" ").trim(), tr = (e) => {
  for (const o in e)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
};
var or = {
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
const rr = De(
  ({
    color: e = "currentColor",
    size: o = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: s = "",
    children: i,
    iconNode: l,
    ...a
  }, c) => Ae(
    "svg",
    {
      ref: c,
      ...or,
      width: o,
      height: o,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(o) : r,
      className: Et("lucide", s),
      ...!i && !tr(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...l.map(([d, u]) => Ae(d, u)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
const pe = (e, o) => {
  const r = De(
    ({ className: n, ...s }, i) => Ae(rr, {
      ref: i,
      iconNode: o,
      className: Et(
        `lucide-${Qo(rt(e))}`,
        `lucide-${e}`,
        n
      ),
      ...s
    })
  );
  return r.displayName = rt(e), r;
};
const nr = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], sr = pe("flame", nr);
const ir = [
  ["path", { d: "M9 10h.01", key: "qbtxuw" }],
  ["path", { d: "M15 10h.01", key: "1qmjsl" }],
  [
    "path",
    {
      d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
      key: "uwwb07"
    }
  ]
], He = pe("ghost", ir);
const ar = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], lr = pe("moon", ar);
const cr = [
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
], dr = pe("skull", cr);
const ur = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], pr = pe("sun", ur);
const hr = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], We = pe("x", hr), mr = {
  spectral: {
    background: "#2e1065",
    // Deep purple background (--ghost-bg-secondary)
    accent: "#FF6F00",
    // Orange accent (--ghost-accent)
    accentRgb: "255, 111, 0",
    text: "#e9d5ff"
    // Light purple text (--ghost-text)
  },
  blood: {
    background: "#450a0a",
    // Deep red background (--ghost-bg-secondary)
    accent: "#ef4444",
    // Red accent (--ghost-accent)
    accentRgb: "239, 68, 68",
    text: "#fecaca"
    // Light red text (--ghost-text)
  }
}, fr = {
  right: "fixed top-1/2 right-8 h-[70vh] w-[350px] -translate-y-1/2",
  left: "fixed top-1/2 left-8 h-[70vh] w-[350px] -translate-y-1/2",
  bottom: "fixed bottom-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2",
  top: "fixed top-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2"
}, gr = (e) => {
  const r = {
    right: { x: "120%", y: "0%" },
    left: { x: "-120%", y: "0%" },
    bottom: { x: "0%", y: "120%" },
    top: { x: "0%", y: "-120%" }
  }[e];
  return {
    hidden: {
      x: r.x,
      y: r.y,
      scale: 0.8,
      opacity: 0
    },
    visible: {
      x: "0%",
      y: "0%",
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 180,
        mass: 0.8
      }
    },
    exit: {
      x: r.x,
      y: r.y,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "anticipate"
      }
    }
  };
}, br = () => /* @__PURE__ */ t("style", { children: `
      @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');

      .font-creep {
        font-family: 'Creepster', cursive;
      }

      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
    ` }), yr = ({ backgroundColor: e, placement: o }) => {
  const r = () => o === "right" ? [
    { position: "right-8", width: "w-6", top: "calc(100% - 44px)", heights: ["50px", "113px", "50px"], duration: 5, delay: 0 },
    { position: "right-20", width: "w-5", top: "calc(100% - 38px)", heights: ["44px", "100px", "44px"], duration: 5.5, delay: 0.6 },
    { position: "right-32", width: "w-7", top: "calc(100% - 50px)", heights: ["56px", "125px", "56px"], duration: 4.7, delay: 1.2 },
    { position: "right-44", width: "w-5", top: "calc(100% - 40px)", heights: ["48px", "106px", "48px"], duration: 5.3, delay: 1.8 },
    { position: "right-56", width: "w-6", top: "calc(100% - 45px)", heights: ["53px", "119px", "53px"], duration: 5.1, delay: 2.4 },
    { position: "right-68", width: "w-5", top: "calc(100% - 41px)", heights: ["46px", "103px", "46px"], duration: 5.2, delay: 3 }
  ] : o === "left" ? [
    { position: "left-8", width: "w-6", top: "calc(100% - 44px)", heights: ["50px", "113px", "50px"], duration: 5, delay: 0 },
    { position: "left-20", width: "w-5", top: "calc(100% - 38px)", heights: ["44px", "100px", "44px"], duration: 5.5, delay: 0.6 },
    { position: "left-32", width: "w-7", top: "calc(100% - 50px)", heights: ["56px", "125px", "56px"], duration: 4.7, delay: 1.2 },
    { position: "left-44", width: "w-5", top: "calc(100% - 40px)", heights: ["48px", "106px", "48px"], duration: 5.3, delay: 1.8 },
    { position: "left-56", width: "w-6", top: "calc(100% - 45px)", heights: ["53px", "119px", "53px"], duration: 5.1, delay: 2.4 },
    { position: "left-68", width: "w-5", top: "calc(100% - 41px)", heights: ["46px", "103px", "46px"], duration: 5.2, delay: 3 }
  ] : [
    { position: "left-[10%]", width: "w-6", top: "calc(100% - 44px)", heights: ["50px", "113px", "50px"], duration: 5, delay: 0 },
    { position: "left-[25%]", width: "w-5", top: "calc(100% - 38px)", heights: ["44px", "100px", "44px"], duration: 5.5, delay: 0.6 },
    { position: "left-[40%]", width: "w-7", top: "calc(100% - 50px)", heights: ["56px", "125px", "56px"], duration: 4.7, delay: 1.2 },
    { position: "left-[55%]", width: "w-5", top: "calc(100% - 40px)", heights: ["48px", "106px", "48px"], duration: 5.3, delay: 1.8 },
    { position: "left-[70%]", width: "w-6", top: "calc(100% - 45px)", heights: ["53px", "119px", "53px"], duration: 5.1, delay: 2.4 },
    { position: "left-[85%]", width: "w-5", top: "calc(100% - 41px)", heights: ["46px", "103px", "46px"], duration: 5.2, delay: 3 }
  ], n = () => o === "right" ? [
    { position: "right-6", width: "w-15", height: "h-8", bottom: "-bottom-3" },
    { position: "right-24", width: "w-10", height: "h-8", bottom: "-bottom-3" },
    { position: "right-48", width: "w-6", height: "h-5", bottom: "-bottom-2" }
  ] : o === "left" ? [
    { position: "left-6", width: "w-15", height: "h-8", bottom: "-bottom-3" },
    { position: "left-24", width: "w-10", height: "h-8", bottom: "-bottom-3" },
    { position: "left-48", width: "w-6", height: "h-5", bottom: "-bottom-2" }
  ] : [
    { position: "left-[20%]", width: "w-15", height: "h-8", bottom: "-bottom-3" },
    { position: "left-[50%]", width: "w-10", height: "h-8", bottom: "-bottom-3" },
    { position: "left-[80%]", width: "w-6", height: "h-5", bottom: "-bottom-2" }
  ], s = r(), i = n();
  return /* @__PURE__ */ p("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "absolute inset-0 rounded-[2rem]",
        style: { backgroundColor: e }
      }
    ),
    s.map((l, a) => /* @__PURE__ */ t(
      v.div,
      {
        className: b(
          "absolute rounded-full motion-reduce:hidden",
          l.width,
          l.position
        ),
        style: {
          top: l.top,
          transformOrigin: "top",
          backgroundColor: e
        },
        animate: {
          height: l.heights
        },
        transition: {
          duration: l.duration,
          repeat: 1 / 0,
          repeatType: "loop",
          ease: "easeInOut",
          delay: l.delay
        }
      },
      `drip-${a}`
    )),
    i.map((l, a) => /* @__PURE__ */ t(
      "div",
      {
        className: b(
          "absolute rounded-full",
          l.width,
          l.height,
          l.position,
          l.bottom
        ),
        style: { backgroundColor: e }
      },
      `pool-${a}`
    ))
  ] });
}, xr = ({
  isOpen: e,
  onClose: o,
  placement: r = "right",
  children: n,
  className: s
}) => {
  const l = X()?.theme ?? "spectral", a = mr[l], d = O.useId().replace(/:/g, "");
  return O.useEffect(() => {
    if (!e) return;
    const u = (h) => {
      h.key === "Escape" && o();
    };
    return document.addEventListener("keydown", u), () => {
      document.removeEventListener("keydown", u);
    };
  }, [e, o]), /* @__PURE__ */ p(W, { children: [
    /* @__PURE__ */ t(br, {}),
    /* @__PURE__ */ t(
      "svg",
      {
        className: "absolute w-0 h-0",
        "aria-hidden": "true",
        children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `goo-drawer-${d}`, children: [
          /* @__PURE__ */ t(
            "feGaussianBlur",
            {
              in: "SourceGraphic",
              stdDeviation: "10",
              result: "blur"
            }
          ),
          /* @__PURE__ */ t(
            "feColorMatrix",
            {
              in: "blur",
              mode: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9",
              result: "goo"
            }
          ),
          /* @__PURE__ */ t(
            "feGaussianBlur",
            {
              in: "goo",
              stdDeviation: "2",
              result: "smoothGoo"
            }
          ),
          /* @__PURE__ */ t(
            "feSpecularLighting",
            {
              in: "smoothGoo",
              surfaceScale: "8",
              specularConstant: "2.5",
              specularExponent: "30",
              lightingColor: a.accent,
              result: "specular",
              children: /* @__PURE__ */ t("feDistantLight", { azimuth: "235", elevation: "50" })
            }
          ),
          /* @__PURE__ */ t(
            "feComposite",
            {
              in: "specular",
              in2: "smoothGoo",
              operator: "in",
              result: "specularGoo"
            }
          ),
          /* @__PURE__ */ t(
            "feComposite",
            {
              in: "specular",
              in2: "goo",
              operator: "in",
              result: "specularClean"
            }
          ),
          /* @__PURE__ */ t(
            "feComposite",
            {
              in: "SourceGraphic",
              in2: "goo",
              operator: "atop",
              result: "solidGoo"
            }
          ),
          /* @__PURE__ */ t(
            "feComposite",
            {
              in: "specularClean",
              in2: "solidGoo",
              operator: "over"
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ t(D, { children: e && /* @__PURE__ */ p(W, { children: [
      /* @__PURE__ */ t(
        v.div,
        {
          className: "fixed inset-0 z-40 bg-[#05020a]/60 backdrop-blur-sm cursor-pointer",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: o
        }
      ),
      /* @__PURE__ */ t(
        v.div,
        {
          className: b(
            fr[r],
            "z-50 pointer-events-none",
            s
          ),
          variants: gr(r),
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          children: /* @__PURE__ */ p("div", { className: "relative w-full h-full pointer-events-auto", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: "absolute inset-0 z-10 h-[120%]",
                style: {
                  filter: `url(#goo-drawer-${d})`,
                  top: 0
                },
                children: /* @__PURE__ */ t("div", { className: "w-full h-[83.3%] relative", children: /* @__PURE__ */ t(yr, { backgroundColor: a.background, placement: r }) })
              }
            ),
            /* @__PURE__ */ t("div", { className: "relative z-10 w-full h-full flex flex-col p-1", children: /* @__PURE__ */ p(
              "div",
              {
                className: "flex-1 rounded-[2rem] border overflow-hidden flex flex-col shadow-inner",
                style: { borderColor: `rgba(${a.accentRgb}, 0.1)` },
                children: [
                  /* @__PURE__ */ p(
                    "div",
                    {
                      className: "p-5 border-b flex items-center justify-between",
                      style: {
                        borderColor: `rgba(${a.accentRgb}, 0.1)`,
                        backgroundColor: `rgba(${a.accentRgb}, 0.05)`
                      },
                      children: [
                        /* @__PURE__ */ p("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ t(
                            "div",
                            {
                              className: "p-2 rounded-lg shadow-sm",
                              style: { backgroundColor: a.background },
                              children: /* @__PURE__ */ t(He, { className: "w-5 h-5", style: { color: a.accent } })
                            }
                          ),
                          /* @__PURE__ */ t(
                            "h2",
                            {
                              className: "font-creep text-2xl tracking-wider drop-shadow-sm",
                              style: { color: a.text },
                              children: "Possession"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: o,
                            className: "p-2 rounded-full",
                            style: {
                              color: a.text,
                              opacity: 0.6
                            },
                            "aria-label": "Close drawer",
                            children: /* @__PURE__ */ t(We, { className: "w-5 h-5" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto no-scrollbar p-5 space-y-3", children: n })
                ]
              }
            ) }),
            /* @__PURE__ */ t(
              "div",
              {
                className: "absolute inset-0 rounded-[2rem] pointer-events-none z-30",
                style: {
                  border: `1px solid rgba(${a.accentRgb}, 0.25)`,
                  boxShadow: `inset 0 0 30px rgba(${a.accentRgb}, 0.08)`
                }
              }
            )
          ] })
        }
      )
    ] }) })
  ] });
};
xr.displayName = "GooeyDrawer";
const vr = {
  spectral: {
    border: "border-purple-500/40",
    arrowColor: "purple-500",
    glowBg: "bg-purple-500/10"
  },
  blood: {
    border: "border-red-500/40",
    arrowColor: "red-500",
    glowBg: "bg-red-500/10"
  }
}, wr = (e) => {
  const o = e === "blood" ? "border-t-red-500" : "border-t-purple-500", r = e === "blood" ? "border-b-red-500" : "border-b-purple-500", n = e === "blood" ? "border-l-red-500" : "border-l-purple-500", s = e === "blood" ? "border-r-red-500" : "border-r-purple-500";
  return {
    top: `top-full left-1/2 -translate-x-1/2 ${o} border-l-transparent border-r-transparent border-b-transparent`,
    bottom: `bottom-full left-1/2 -translate-x-1/2 ${r} border-l-transparent border-r-transparent border-t-transparent`,
    left: `left-full top-1/2 -translate-y-1/2 ${n} border-t-transparent border-b-transparent border-r-transparent`,
    right: `right-full top-1/2 -translate-y-1/2 ${s} border-t-transparent border-b-transparent border-l-transparent`
  };
}, Ze = O.forwardRef(
  ({ content: e, children: o, position: r = "top", className: n }, s) => {
    const [i, l] = G(!1), a = ht(), d = X()?.theme ?? "spectral", u = vr[d], h = wr(d), m = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2"
    }, f = mt(o) ? Kt(o, {
      "aria-describedby": i ? a : void 0,
      onFocus: (y) => {
        l(!0);
        const g = o.props.onFocus;
        g && g(y);
      },
      onBlur: (y) => {
        l(!1);
        const g = o.props.onBlur;
        g && g(y);
      }
    }) : o;
    return /* @__PURE__ */ p(
      "div",
      {
        ref: s,
        className: "relative inline-block",
        onMouseEnter: () => l(!0),
        onMouseLeave: () => l(!1),
        children: [
          f,
          /* @__PURE__ */ t(D, { children: i && /* @__PURE__ */ p(
            v.div,
            {
              id: a,
              initial: { opacity: 0, scale: 0.9 },
              animate: {
                opacity: 1,
                scale: 1,
                // Ghostly float animation
                rotate: [0, -2, 2, 0],
                x: [0, -2, 2, 0]
              },
              exit: { opacity: 0, scale: 0.9 },
              transition: {
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                // Loop the float
                rotate: { repeat: 1 / 0, duration: 2, ease: "easeInOut" },
                x: { repeat: 1 / 0, duration: 3, ease: "easeInOut" }
              },
              className: b(
                "absolute z-50 px-3 py-2 text-sm text-ghost-white bg-ghost-dark rounded-md shadow-lg border max-w-xs",
                u.border,
                m[r],
                n
              ),
              role: "tooltip",
              children: [
                /* @__PURE__ */ t("div", { className: "relative z-10", children: e }),
                /* @__PURE__ */ t(
                  "div",
                  {
                    className: b(
                      "absolute w-0 h-0 border-[6px]",
                      h[r]
                    )
                  }
                ),
                /* @__PURE__ */ t("div", { className: b("absolute inset-0 rounded-md blur-sm -z-10", u.glowBg) })
              ]
            }
          ) })
        ]
      }
    );
  }
);
Ze.displayName = "SpookyTooltip";
function kr({
  checked: e,
  onChange: o,
  disabled: r = !1,
  className: n,
  variant: s = "spectral-blood",
  tooltip: i,
  tooltipPosition: l,
  tooltipClassName: a
}) {
  const c = X(), d = e !== void 0, u = d ? e : c?.theme === "spectral", h = (k) => {
    d && o ? o(k) : c && c.setTheme(k ? "spectral" : "blood");
  }, m = s === "spectral-blood" ? /* @__PURE__ */ p(
    v.button,
    {
      type: "button",
      role: "switch",
      "aria-checked": u,
      disabled: r,
      onClick: () => !r && h(!u),
      className: b(
        "relative w-24 h-12 rounded-full cursor-pointer p-1 transition-all duration-700 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        u ? "bg-[#2e0202] focus-visible:ring-orange-500" : "bg-[#1a0505] focus-visible:ring-red-600",
        r && "opacity-50 cursor-not-allowed grayscale",
        n
      ),
      animate: {
        backgroundColor: u ? "#3b0764" : "#450a0a",
        borderColor: u ? "#FF6F00" : "#991b1b"
      },
      style: { borderWidth: "1px", borderStyle: "solid" },
      children: [
        /* @__PURE__ */ p(
          v.div,
          {
            className: "absolute inset-0 pointer-events-none",
            initial: !1,
            animate: { opacity: 1 },
            children: [
              /* @__PURE__ */ t(
                v.span,
                {
                  className: "absolute top-2 left-8 w-[2px] h-[2px] rounded-full opacity-80",
                  animate: { backgroundColor: u ? "#e9d5ff" : "#fca5a5" }
                }
              ),
              /* @__PURE__ */ t(
                v.span,
                {
                  className: "absolute top-6 left-12 w-[1px] h-[1px] rounded-full opacity-60",
                  animate: { backgroundColor: u ? "#e9d5ff" : "#fca5a5" }
                }
              ),
              /* @__PURE__ */ t(
                v.span,
                {
                  className: "absolute bottom-3 left-5 w-[2px] h-[2px] rounded-full opacity-90",
                  animate: { backgroundColor: u ? "#e9d5ff" : "#fca5a5" }
                }
              ),
              /* @__PURE__ */ t(
                v.span,
                {
                  className: "absolute top-4 right-8 w-[1px] h-[1px] bg-white rounded-full",
                  animate: {
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                    backgroundColor: u ? "#d8b4fe" : "#ef4444"
                  },
                  transition: { duration: 3, repeat: 1 / 0 }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: b(
              "w-full h-full flex items-center",
              u ? "justify-end" : "justify-start"
            ),
            children: /* @__PURE__ */ t(
              v.div,
              {
                layout: !0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                },
                className: "w-10 h-10 rounded-full shadow-md relative z-10 flex items-center justify-center",
                animate: {
                  backgroundColor: u ? "#FBBF24" : "#b91c1c",
                  boxShadow: u ? "0 0 20px 2px rgba(255, 111, 0, 0.6)" : "0 0 20px 2px rgba(220, 38, 38, 0.5)"
                },
                children: /* @__PURE__ */ p("svg", { viewBox: "0 0 100 100", className: "w-full h-full opacity-30 absolute inset-0 pointer-events-none", children: [
                  /* @__PURE__ */ t("circle", { cx: "30", cy: "30", r: "10", fill: "currentColor", className: u ? "text-purple-300" : "text-red-900" }),
                  /* @__PURE__ */ t("circle", { cx: "70", cy: "60", r: "8", fill: "currentColor", className: u ? "text-purple-300" : "text-red-900" }),
                  /* @__PURE__ */ t("circle", { cx: "40", cy: "80", r: "5", fill: "currentColor", className: u ? "text-purple-300" : "text-red-900" })
                ] })
              }
            )
          }
        )
      ]
    }
  ) : null, f = {
    on: {
      bg: "bg-slate-900",
      border: "border-indigo-500",
      thumb: "bg-slate-100",
      icon: lr,
      iconColor: "text-slate-800",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.6)]"
    },
    off: {
      bg: "bg-sky-300",
      border: "border-yellow-400",
      thumb: "bg-yellow-100",
      icon: pr,
      iconColor: "text-orange-500",
      glow: "shadow-[0_0_20px_rgba(250,204,21,0.6)]"
    }
  }, y = u ? f.on : f.off, g = y.icon, x = /* @__PURE__ */ p(
    v.button,
    {
      type: "button",
      role: "switch",
      "aria-checked": u,
      disabled: r,
      onClick: () => !r && h(!u),
      className: b(
        "relative w-20 h-10 rounded-full cursor-pointer p-1 transition-colors duration-500 border-2",
        y.bg,
        y.border,
        r && "opacity-50 cursor-not-allowed grayscale",
        n
      ),
      whileTap: { scale: 0.95 },
      children: [
        /* @__PURE__ */ t("div", { className: "absolute inset-0 overflow-hidden rounded-full pointer-events-none", children: u && /* @__PURE__ */ p(W, { children: [
          /* @__PURE__ */ t(
            v.div,
            {
              className: "absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-50",
              animate: { opacity: [0.2, 0.8, 0.2] },
              transition: { duration: 2, repeat: 1 / 0 }
            }
          ),
          /* @__PURE__ */ t(
            v.div,
            {
              className: "absolute bottom-3 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-30",
              animate: { opacity: [0.2, 0.8, 0.2] },
              transition: { duration: 3, repeat: 1 / 0, delay: 1 }
            }
          )
        ] }) }),
        /* @__PURE__ */ t(
          v.div,
          {
            className: b(
              "w-7 h-7 rounded-full flex items-center justify-center relative z-10",
              y.thumb,
              y.glow
            ),
            animate: {
              x: u ? 40 : 0
            },
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30
            },
            children: /* @__PURE__ */ t(D, { mode: "wait", children: /* @__PURE__ */ t(
              v.div,
              {
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                exit: { scale: 0, rotate: 180 },
                transition: { duration: 0.2 },
                children: /* @__PURE__ */ t(g, { size: 14, className: y.iconColor })
              },
              u ? "on" : "off"
            ) })
          }
        )
      ]
    }
  ), w = s === "spectral-blood" ? m : x;
  return i ? /* @__PURE__ */ t(
    Ze,
    {
      content: i,
      position: l,
      className: a,
      children: w
    }
  ) : w;
}
kr.displayName = "MoonlightSwitch";
const nt = "polygon(15% 0%, 85% 0%, 100% 10%, 90% 100%, 10% 100%, 0% 10%)", Cr = {
  spectral: {
    borderHover: "group-hover:border-purple-500/30",
    gradientOverlay: "from-purple-900/30 via-purple-900/10 to-transparent",
    titleHover: "group-hover:text-purple-400",
    glowBg: "bg-purple-600/30"
  },
  blood: {
    borderHover: "group-hover:border-red-500/30",
    gradientOverlay: "from-red-900/30 via-red-900/10 to-transparent",
    titleHover: "group-hover:text-red-400",
    glowBg: "bg-red-600/30"
  }
};
function Nr({
  className: e,
  children: o,
  title: r,
  index: n = 0,
  animated: s = !0,
  intensity: i = "medium",
  showGlow: l = !0
}) {
  const c = X()?.theme ?? "spectral", d = Cr[c];
  return /* @__PURE__ */ p(
    v.div,
    {
      initial: s ? { opacity: 0, y: 50 } : void 0,
      whileInView: s ? { opacity: 1, y: 0 } : void 0,
      viewport: { once: !0 },
      transition: { delay: n * 0.1, duration: 0.5 },
      className: b("relative group", e),
      children: [
        /* @__PURE__ */ p(
          "div",
          {
            className: b(
              "relative z-10 bg-[#0a0a0a] border border-white/5 p-8 pt-10 pb-12 text-center transition-all duration-500 group-hover:-translate-y-2",
              d.borderHover
            ),
            style: {
              clipPath: nt,
              boxShadow: "none"
            },
            children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: b(
                    "absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    d.gradientOverlay
                  )
                }
              ),
              r && /* @__PURE__ */ t("h3", { className: b(
                "font-creep text-3xl text-gray-200 mb-4 tracking-wider transition-colors duration-300",
                d.titleHover
              ), children: r }),
              /* @__PURE__ */ t("div", { className: "text-gray-500 text-sm leading-relaxed relative z-20 font-mono group-hover:text-gray-300 transition-colors duration-300", children: o })
            ]
          }
        ),
        l && /* @__PURE__ */ t(
          "div",
          {
            className: b(
              "absolute inset-0 blur-2xl -z-10 translate-y-4 opacity-0 group-hover:opacity-40 transition-opacity duration-700",
              d.glowBg
            ),
            style: { clipPath: nt }
          }
        )
      ]
    }
  );
}
Nr.displayName = "CoffinCard";
const Mr = O.forwardRef(
  ({ className: e, label: o, error: r, ghostIcon: n, id: s, ...i }, l) => {
    const [a, c] = G(!1), d = s || O.useId();
    return /* @__PURE__ */ p("div", { className: b("relative w-full max-w-md", r ? "mb-10" : "mb-6"), children: [
      o && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: d,
          className: b(
            "block mb-1.5 text-sm font-medium tracking-wide transition-colors duration-500",
            r ? "text-red-500" : a ? "text-[var(--ghost-accent)]" : "text-gray-400"
          ),
          children: o
        }
      ),
      /* @__PURE__ */ p(
        v.div,
        {
          className: "relative flex items-center",
          animate: r ? { x: [-5, 5, -5, 5, 0] } : { x: 0 },
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
          children: [
            n && /* @__PURE__ */ t(
              "div",
              {
                className: b(
                  "absolute left-0 flex items-center justify-center w-8 h-full transition-all duration-500",
                  r ? "text-red-500" : a ? "text-[var(--ghost-accent)]" : "text-gray-600"
                ),
                style: a && !r ? {
                  filter: "drop-shadow(0 0 8px var(--ghost-accent))"
                } : void 0,
                children: /* @__PURE__ */ t(He, { size: 18 })
              }
            ),
            /* @__PURE__ */ t(
              "input",
              {
                ref: l,
                id: d,
                className: b(
                  "w-full bg-transparent border-none h-9 text-gray-100 outline-none transition-colors duration-500 placeholder:text-gray-700",
                  n ? "pl-8" : "pl-0.5",
                  "pr-0.5",
                  e
                ),
                onFocus: (u) => {
                  c(!0), i.onFocus?.(u);
                },
                onBlur: (u) => {
                  c(!1), i.onBlur?.(u);
                },
                ...i
              }
            ),
            /* @__PURE__ */ t(
              "div",
              {
                className: b(
                  "absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-500",
                  r ? "bg-red-900/50" : "bg-gray-700"
                )
              }
            ),
            /* @__PURE__ */ t(
              v.div,
              {
                className: "absolute bottom-0 left-0 h-[2px] w-full origin-center",
                style: {
                  backgroundColor: r ? "#ef4444" : "var(--ghost-accent)",
                  boxShadow: r ? "0 0 20px rgba(239,68,68,0.9), 0 0 40px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.3)" : "0 0 20px rgba(var(--ghost-accent-rgb),0.9), 0 0 40px rgba(var(--ghost-accent-rgb),0.6), 0 0 60px rgba(var(--ghost-accent-rgb),0.3)"
                },
                initial: { scaleX: 0, opacity: 0 },
                animate: {
                  scaleX: a || r ? 1 : 0,
                  opacity: a || r ? 1 : 0
                },
                transition: {
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            ),
            /* @__PURE__ */ t(
              v.div,
              {
                className: "absolute bottom-0 left-0 w-full h-12 pointer-events-none -z-10",
                style: {
                  filter: "blur(12px)",
                  backgroundColor: r ? "rgba(239,68,68,0.15)" : "rgba(var(--ghost-accent-rgb),0.15)"
                },
                initial: { opacity: 0, y: 10, scaleY: 0 },
                animate: {
                  opacity: a && !r ? 0.8 : 0,
                  y: a ? -15 : 10,
                  scaleY: a ? 2 : 0
                },
                transition: {
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            ),
            /* @__PURE__ */ t(
              v.div,
              {
                className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none -z-20 rounded-full",
                style: {
                  filter: "blur(20px)",
                  backgroundColor: r ? "rgba(239,68,68,0.2)" : "rgba(var(--ghost-accent-rgb),0.2)"
                },
                initial: { opacity: 0, scale: 0.5 },
                animate: {
                  opacity: a && !r ? 0.6 : 0,
                  scale: a ? 1.2 : 0.5
                },
                transition: {
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(D, { children: r && /* @__PURE__ */ p(
        v.p,
        {
          initial: { opacity: 0, y: -3 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -3 },
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          className: b(
            "mt-2 text-xs text-red-500 font-mono flex items-center gap-1",
            n ? "pl-8" : "pl-0.5"
          ),
          children: [
            /* @__PURE__ */ t("span", { children: "†" }),
            " ",
            r
          ]
        }
      ) })
    ] });
  }
);
Mr.displayName = "SpiritInput";
const Sr = ({ className: e }) => /* @__PURE__ */ t(
  "svg",
  {
    viewBox: "0 0 512 512",
    fill: "currentColor",
    className: e,
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ t("path", { d: "M372.084,106.642c9.277,64.285-67.483,102.934-76.724,103.858c-15.122,1.498-2.291-20.244,0.566-43.667c2.857-23.414-22.813,21.742-39.922,21.742c-17.108,0-42.778-45.156-39.93-21.742c2.858,23.423,15.688,45.165,0.566,43.667c-9.242-0.923-86.001-39.573-76.724-103.858C79.202,131.363-9.325,265.891,0.797,276.762c10.122,10.889,57.334-15.827,88.527,53.424c28.293-26.785,62.865-20.845,80.104,40.558c56.507-40.035,74.747,16.62,86.576,34.616c11.821-17.996,30.061-74.65,86.568-34.616c17.238-61.402,51.812-67.343,80.112-40.558c31.194-69.251,78.406-42.535,88.519-53.424C521.324,265.891,432.797,131.363,372.084,106.642z" })
  }
);
Sr.displayName = "BatIcon";
const Ir = O.forwardRef(
  ({ isOpen: e, onClose: o, title: r, children: n, className: s }, i) => {
    const [l, a] = G(!1);
    return A(() => (a(!0), () => a(!1)), []), A(() => {
      const c = (d) => {
        d.key === "Escape" && o();
      };
      return e && document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
    }, [e, o]), l ? oo(
      /* @__PURE__ */ t(D, { children: e && /* @__PURE__ */ p("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
        /* @__PURE__ */ t(
          v.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: o,
            className: "absolute inset-0 backdrop-blur-sm",
            style: { backgroundColor: "rgba(var(--ghost-accent-rgb), 0.1)", backdropFilter: "blur(4px)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ p(
          v.div,
          {
            ref: i,
            initial: { opacity: 0, y: 100, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 100, scale: 0.95 },
            transition: { type: "spring", damping: 20, stiffness: 300 },
            className: b(
              "relative w-full max-w-lg overflow-hidden rounded-xl border-2 shadow-2xl",
              "before:absolute before:inset-0 before:z-0 before:bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] before:opacity-10 before:mix-blend-overlay",
              s
            ),
            style: {
              backgroundColor: "var(--ghost-bg)",
              borderColor: "var(--ghost-accent)",
              boxShadow: `
                                0 0 20px rgba(var(--ghost-accent-rgb), 0.4),
                                0 0 40px rgba(var(--ghost-accent-rgb), 0.2),
                                0 0 60px rgba(var(--ghost-accent-rgb), 0.1),
                                inset 0 0 30px rgba(var(--ghost-accent-rgb), 0.05)
                            `
            },
            role: "dialog",
            "aria-modal": "true",
            children: [
              /* @__PURE__ */ p(
                "div",
                {
                  className: "relative z-10 flex items-center justify-between px-6 py-4",
                  style: {
                    borderBottom: "1px solid var(--ghost-border)",
                    backgroundColor: "var(--ghost-bg-secondary)"
                  },
                  children: [
                    r && /* @__PURE__ */ t(
                      "h2",
                      {
                        className: "text-xl font-display tracking-wide",
                        style: { color: "var(--ghost-text)" },
                        children: r
                      }
                    ),
                    /* @__PURE__ */ p(
                      "button",
                      {
                        onClick: o,
                        className: "grave-modal-close rounded-full p-2 transition-all duration-200 focus:outline-none",
                        "aria-label": "Close modal",
                        children: [
                          /* @__PURE__ */ t(We, { className: "h-5 w-5" }),
                          /* @__PURE__ */ t("style", { children: `
                                    .grave-modal-close {
                                        color: var(--ghost-text-secondary);
                                        background: transparent;
                                    }
                                    .grave-modal-close:hover {
                                        color: var(--ghost-accent);
                                        background: rgba(var(--ghost-accent-rgb), 0.15);
                                    }
                                    .grave-modal-close:focus {
                                        box-shadow: 0 0 0 2px rgba(var(--ghost-accent-rgb), 0.5);
                                    }
                                ` })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "div",
                {
                  className: "relative z-10 p-6",
                  style: { color: "var(--ghost-text-secondary)" },
                  children: n
                }
              ),
              /* @__PURE__ */ t(
                "div",
                {
                  className: "absolute bottom-0 left-0 right-0 h-1 opacity-70",
                  style: {
                    background: "linear-gradient(to right, transparent, var(--ghost-accent), transparent)"
                  }
                }
              )
            ]
          }
        )
      ] }) }),
      document.body
    ) : null;
  }
);
Ir.displayName = "GraveModal";
const Tt = () => /* @__PURE__ */ t(
  "style",
  {
    dangerouslySetInnerHTML: {
      __html: `
        @keyframes float-y {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
        .ghost-animate-float { animation: float-y 3s ease-in-out infinite; }
        .ghost-animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
    `
    }
  }
), Er = ({ className: e }) => /* @__PURE__ */ p(
  "svg",
  {
    viewBox: "0 0 101.11 162.77",
    className: b(e, "ghost-animate-float"),
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M12.68,162.77s34.15-40.76,4.88-80.45C-11.71,42.63,7.44-9.47,57.81,1.48,123.66,15.8,118.8,149.97,12.68,162.77Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M15.56,79.47c6.61,14.44-4.43,17.31-11.79,16.37s-2.83,8.49,4.03,9.75c6.86,1.26,20.02-.94,21.62,11.33,1.6,12.27,19.49.31,18.25-19.5-1.24-19.82-35.94-26.3-32.11-17.94Z"
        }
      ),
      /* @__PURE__ */ t("g", { className: "ghost-animate-wiggle origin-center", children: /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M75.84,83.61c-.85,2.18-2.14,4.2-3.76,5.94-1.64,1.7-3.78,3.05-6.19,3.45-.6.11-1.22.14-1.81.15-.57.01-1.15.03-1.72.07-1.14.09-2.28.26-3.4.52-2.2.53-4.45,1.35-6.07,2.81-.8.72-1.25,1.7-.77,2.56.46.87,1.45,1.51,2.44,2.02,2.04.99,4.31,1.57,6.56,2.17,2.26.59,4.56,1.1,6.76,1.97,1.09.45,2.18.97,3.07,1.77.91.77,1.49,1.96,1.41,3.14-.02-1.19-.66-2.26-1.57-2.95-.9-.71-1.98-1.17-3.07-1.54-2.2-.73-4.49-1.18-6.77-1.69-2.28-.51-4.6-1.02-6.79-2.06-1.06-.54-2.19-1.17-2.88-2.38-.34-.6-.41-1.4-.18-2.07.22-.67.64-1.19,1.1-1.64.92-.88,2.02-1.44,3.12-1.92,1.11-.47,2.26-.81,3.43-1.06,1.17-.25,2.35-.42,3.54-.49.59-.04,1.19-.06,1.79-.03.58.01,1.13,0,1.69-.08,2.24-.28,4.31-1.47,5.97-3.05,1.69-1.57,3.04-3.51,4.09-5.6Z"
        }
      ) }),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M36.45,42.91c-1.09,6.11-4.93,10.53-8.58,9.88s-5.73-6.13-4.64-12.24c1.09-6.11,4.93-10.53,8.58-9.88,3.65.65,5.73,6.13,4.64,12.24Z"
        }
      ),
      /* @__PURE__ */ t("ellipse", { fill: "#2b2b28", cx: "47.1", cy: "41.29", rx: "5.27", ry: "8.8" }),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#474743",
          d: "M50.95,61.53c0,2.52-2.04,4.56-4.56,4.56s-4.56-2.04-4.56-4.56,2.04-4.56,4.56-4.56,4.56,2.04,4.56,4.56Z"
        }
      )
    ]
  }
), Tr = ({ className: e }) => /* @__PURE__ */ p(
  "svg",
  {
    viewBox: "0 0 130.89 156.25",
    className: b(e, "ghost-animate-float"),
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M130.89,156.25s-34.1-35.33-28.1-80.81c4.93-37.37-3.44-84.83-50.17-72.04C24.87,11,13.93,51.73,26.38,88.15c11.67,34.13,44.31,65.84,104.51,68.1Z"
        }
      ),
      /* @__PURE__ */ p("g", { className: "ghost-animate-wiggle origin-center", children: [
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#2b2b28",
            d: "M68.37,63.04c2.71-.21,5.4,2.68,5.12-.98-.28-3.66-2.57-9.03-5.28-8.83-2.71.21-4.81,5.92-4.53,9.58.28,3.66,1.98.44,4.69.23Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#fff",
            d: "M103.48,69.69s-2.18,24.45,13.21,31.54c9.53,4.39-8.8,9.21-16.58,3.28-7.78-5.94,3.38-34.82,3.38-34.82Z"
          }
        )
      ] }),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M31.4,99.83s-7.33-23.43-24.25-24.11c-10.48-.42,4.62-11.88,14.08-9.36,9.46,2.52,10.18,33.47,10.18,33.47Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M65.33,40.47c-1.16,6.54-5.28,11.28-9.19,10.58-3.91-.7-6.14-6.56-4.97-13.1,1.16-6.54,5.28-11.28,9.19-10.58,3.91.7,6.14,6.56,4.97,13.1Z"
        }
      ),
      /* @__PURE__ */ t("ellipse", { fill: "#2b2b28", cx: "76.74", cy: "38.74", rx: "5.64", ry: "9.43" }),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M127.31,154.98s-34.1-35.33-28.1-80.81c4.93-37.37-3.44-84.83-50.17-72.04C21.28,9.73,10.34,50.46,22.79,86.88c11.67,34.13,44.31,65.84,104.51,68.1Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M64.78,61.78c2.71-.21,5.4,2.68,5.12-.98-.28-3.66-2.57-9.03-5.28-8.83-2.71.21-4.81,5.92-4.53,9.58.28,3.66,1.98.44,4.69.23Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M99.89,68.42s-2.18,24.45,13.21,31.54c9.53,4.39-8.8,9.21-16.58,3.28-7.78-5.94,3.38-34.82,3.38-34.82Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M27.81,98.56s-7.33-23.43-24.25-24.11c-10.48-.42,4.62-11.88,14.08-9.36,9.46,2.52,10.18,33.47,10.18,33.47Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M61.75,39.2c-1.16,6.54-5.28,11.28-9.19,10.58-3.91-.7-6.14-6.56-4.97-13.1,1.16-6.54,5.28-11.28,9.19-10.58,3.91.7,6.14,6.56,4.97,13.1Z"
        }
      ),
      /* @__PURE__ */ t("ellipse", { fill: "#2b2b28", cx: "73.16", cy: "37.47", rx: "5.64", ry: "9.43" })
    ]
  }
), $r = ({ className: e }) => /* @__PURE__ */ p(
  "svg",
  {
    viewBox: "0 0 105.71 147.07",
    className: b(e, "ghost-animate-float"),
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M11.08,131.12C10.48,128.23-1.8,6.76,60.67.2c13.36-1.4,20.2,4.89,23.33,10.16,13.04,21.93-20.69,67.61,20.36,118.3,2.22,2.74,1.65,6.82-1.28,8.79-4.94,3.33-13.26,6.53-23.75,1.49-17.35-8.33-11.66,4.97-25.5,7.86-13.84,2.89-16.09-19.71-25.07-11.01-7.37,7.14-14.84,8.9-17.69-4.68Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M42.88,30.75c-1.58,3.35-4.41,5.33-6.32,4.43-1.91-.9-2.17-4.35-.59-7.69,1.58-3.35,4.41-5.33,6.32-4.43,1.91.9,2.17,4.35.59,7.69Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M56.54,37.79c-2.03,3.09-5.11,4.66-6.87,3.51-1.77-1.16-1.55-4.61.48-7.7s5.11-4.66,6.87-3.51c1.77,1.16,1.55,4.61-.48,7.7Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M39.5,44.48c2.42,1.58,5.61,1.49,4.42,3.31-1.19,1.81-4.65,3.46-7.07,1.88-2.42-1.58-2.88-5.8-1.69-7.61,1.19-1.81,1.92.84,4.34,2.43Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M23.84,34S8.02,14.89,1.94,16.67c-8.15,2.38,11.89,48.76,13.49,52.45,1.61,3.69,8.41-35.12,8.41-35.12Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M79.68,63.17s14.83,14.36,22.17,19.92c9.51,7.2-9.21,20.92-26.24,6.79-17.03-14.13,4.07-26.71,4.07-26.71Z"
        }
      )
    ]
  }
), st = [Er, Tr, $r], $t = ({
  children: e,
  className: o,
  peekDelay: r = 250,
  ghostEnabled: n = !0,
  ghostSize: s = 112,
  showBoo: i = !0,
  contentClassName: l
}) => {
  const [a, c] = G(null), d = L(null), u = Q(() => {
    n && (d.current && clearTimeout(d.current), d.current = setTimeout(() => {
      const x = st[Math.floor(Math.random() * st.length)], w = ["top", "left", "right"], k = w[Math.floor(Math.random() * w.length)];
      c({ id: Date.now(), Component: x, edge: k });
    }, r));
  }, [n, r]), h = Q(() => {
    d.current && clearTimeout(d.current), c(null);
  }, []);
  A(() => () => {
    d.current && clearTimeout(d.current);
  }, []);
  const m = {
    hidden: (x) => ({
      y: x === "top" ? "20%" : 0,
      x: x === "left" ? "20%" : x === "right" ? "-20%" : 0,
      opacity: 0,
      rotate: x === "left" ? -15 : x === "right" ? 15 : 0,
      scale: 0.8
    }),
    visible: (x) => ({
      y: x === "top" ? "-55%" : 0,
      x: x === "left" ? "-55%" : x === "right" ? "55%" : 0,
      opacity: 0.7,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 1
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: "backIn" }
    }
  }, f = {
    hidden: { scale: 0, opacity: 0, y: 0 },
    visible: {
      scale: 1.1,
      opacity: 1,
      y: -30,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
  }, y = (x) => {
    switch (x) {
      case "top":
        return "top-0";
      case "left":
        return "left-0";
      case "right":
        return "right-0";
    }
  }, g = (x) => {
    switch (x) {
      case "top":
        return "-top-24";
      case "left":
        return "-left-20 top-0";
      case "right":
        return "-right-20 top-0";
    }
  };
  return /* @__PURE__ */ p(
    "div",
    {
      className: b("relative group", o),
      onMouseEnter: u,
      onMouseLeave: h,
      children: [
        /* @__PURE__ */ t(Tt, {}),
        /* @__PURE__ */ t("div", { className: b("relative z-20", l), children: e }),
        /* @__PURE__ */ t("div", { className: "absolute inset-0 z-10 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ t(D, { children: a && /* @__PURE__ */ p(W, { children: [
          /* @__PURE__ */ t(
            v.div,
            {
              custom: a.edge,
              variants: m,
              initial: "hidden",
              animate: "visible",
              exit: "exit",
              className: b(
                "absolute mix-blend-screen",
                y(a.edge)
              ),
              style: { width: s, height: s },
              children: /* @__PURE__ */ t(a.Component, { className: "w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] opacity-90" })
            },
            `ghost-${a.id}`
          ),
          i && /* @__PURE__ */ t(
            v.div,
            {
              variants: f,
              initial: "hidden",
              animate: "visible",
              exit: "exit",
              className: b(
                "absolute z-50 font-black italic text-4xl text-white tracking-widest pointer-events-none",
                g(a.edge)
              ),
              style: {
                textShadow: "3px 3px 0 #000",
                WebkitTextStroke: "1px #A855F7",
                filter: "drop-shadow(0 0 10px #A855F7)"
              },
              children: "BOO!"
            },
            `boo-${a.id}`
          )
        ] }) }) })
      ]
    }
  );
};
$t.displayName = "HauntedCard";
const ae = $t, zt = ({
  radius: e = 350,
  darkness: o = 0.9,
  blur: r = 2,
  enabled: n = !0,
  springDamping: s = 25,
  springStiffness: i = 150,
  className: l
}) => {
  const a = Ce(0), c = Ce(0), [d, u] = G(!1), h = { damping: s, stiffness: i }, m = re(a, h), f = re(c, h);
  A(() => {
    u(!0), n && typeof window < "u" && (a.set(window.innerWidth / 2), c.set(window.innerHeight / 2));
  }, [n, a, c]), A(() => {
    if (!n || !d) return;
    const g = (x) => {
      a.set(x.clientX), c.set(x.clientY);
    };
    return window.addEventListener("mousemove", g), () => window.removeEventListener("mousemove", g);
  }, [n, d, a, c]);
  const y = eo`radial-gradient(circle ${e}px at ${m}px ${f}px, transparent 10%, black 100%)`;
  return n ? /* @__PURE__ */ t(
    v.div,
    {
      className: b(
        "fixed inset-0 z-50 pointer-events-none",
        l
      ),
      "aria-hidden": "true",
      style: {
        backgroundColor: `rgba(0, 0, 0, ${o})`,
        backdropFilter: r > 0 ? `blur(${r}px)` : void 0,
        WebkitBackdropFilter: r > 0 ? `blur(${r}px)` : void 0,
        maskImage: y,
        WebkitMaskImage: y
      }
    }
  ) : null;
};
zt.displayName = "HauntedVignette";
const qn = ({
  initialFlashlightOn: e = !0,
  showToggle: o = !0,
  className: r
}) => {
  const [n, s] = G(e);
  return /* @__PURE__ */ p(
    "div",
    {
      className: b(
        "min-h-screen bg-[#050505] text-gray-200 font-sans p-8 md:p-20 relative overflow-hidden",
        r
      ),
      children: [
        /* @__PURE__ */ t(Tt, {}),
        o && /* @__PURE__ */ t("div", { className: "fixed top-8 right-8 z-[60]", children: /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s(!n),
            className: "px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20",
            children: n ? "Disable Flashlight" : "Enable Flashlight"
          }
        ) }),
        n && /* @__PURE__ */ t(zt, {}),
        /* @__PURE__ */ p("div", { className: "max-w-5xl mx-auto space-y-16 pt-20", children: [
          /* @__PURE__ */ p("div", { className: "text-center space-y-4", children: [
            /* @__PURE__ */ t("h1", { className: "text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 tracking-tighter", children: "THE DARK ROOM" }),
            /* @__PURE__ */ p("p", { className: "text-gray-500 max-w-xl mx-auto", children: [
              "Move your cursor to explore. ",
              /* @__PURE__ */ t("br", {}),
              /* @__PURE__ */ t("span", { className: "text-purple-400", children: "Wait for the spirits..." })
            ] })
          ] }),
          /* @__PURE__ */ p("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8", children: [
            /* @__PURE__ */ t(ae, { children: /* @__PURE__ */ p("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "The Attic" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "Dust motes dance in the sliver of moonlight. Something scuttles in the corner." })
            ] }) }),
            /* @__PURE__ */ t(ae, { children: /* @__PURE__ */ p("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Cellar Door" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "Locked from the inside. Scratch marks mar the heavy oak surface." })
            ] }) }),
            /* @__PURE__ */ t(ae, { children: /* @__PURE__ */ p("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Dusty Mirror" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "Your reflection seems to lag just a second behind your movements." })
            ] }) }),
            /* @__PURE__ */ t(ae, { children: /* @__PURE__ */ p("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Ancient Grimoire" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "The pages turn by themselves when the wind isn't blowing." })
            ] }) }),
            /* @__PURE__ */ t(ae, { children: /* @__PURE__ */ p("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Music Box" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "It plays a lullaby you haven't heard since... since then." })
            ] }) }),
            /* @__PURE__ */ t(ae, { children: /* @__PURE__ */ p("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Cold Spot" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "The temperature drops 20 degrees in this exact spot." })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ t(
          "div",
          {
            className: "fixed inset-0 pointer-events-none opacity-[0.03] z-0",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
            }
          }
        )
      ]
    }
  );
}, Fe = 48, zr = 4, le = Fe + zr, Rt = {
  spectral: {
    bgGradient: "from-purple-950/90 via-purple-900/80 to-purple-950/90",
    border: "border-purple-500/20",
    blobBg: "bg-orange-500/80",
    blobColor: "#f97316",
    activeText: "text-white",
    inactiveText: "text-purple-300/60",
    hoverText: "text-purple-200",
    hoverDot: "bg-orange-400",
    specularColor: "#fed7aa"
  },
  blood: {
    bgGradient: "from-red-950/90 via-red-900/80 to-red-950/90",
    border: "border-red-500/20",
    blobBg: "bg-red-500/80",
    blobColor: "#ef4444",
    activeText: "text-white",
    inactiveText: "text-red-300/60",
    hoverText: "text-red-200",
    hoverDot: "bg-red-400",
    specularColor: "#fecaca"
  }
}, Rr = ({ theme: e }) => {
  const o = Rt[e];
  return /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `sidebar-goo-3d-${e}`, colorInterpolationFilters: "sRGB", children: [
    /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
    /* @__PURE__ */ t("feColorMatrix", { in: "blur", mode: "matrix", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12", result: "goo" }),
    /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "3", result: "smoothGoo" }),
    /* @__PURE__ */ t("feSpecularLighting", { in: "smoothGoo", surfaceScale: "6", specularConstant: "1.4", specularExponent: "25", lightingColor: o.specularColor, result: "specular", children: /* @__PURE__ */ t("fePointLight", { x: "-100", y: "-200", z: "350" }) }),
    /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularClean" }),
    /* @__PURE__ */ t("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop", result: "solidGoo" }),
    /* @__PURE__ */ t("feComposite", { in: "specularClean", in2: "solidGoo", operator: "over" })
  ] }) }) });
}, Gr = ({
  activeIndex: e,
  previousIndex: o,
  isAnimating: r,
  colors: n
}) => {
  const s = e * le, i = e > o ? 1 : -1, l = Math.abs(e - o), a = { stiffness: 300, damping: 30, mass: 0.8 }, c = { stiffness: 120, damping: 25, mass: 2.5 }, d = re(s, a), u = re(s, c);
  A(() => {
    d.set(s), u.set(s);
  }, [s, d, u]);
  const h = V([d, u], ([E, z]) => Math.min(E, z)), m = V([d, u], ([E, z]) => {
    const C = Math.abs(E - z);
    return Math.max(Fe, C + Fe);
  }), f = V([d, u], ([E, z]) => {
    const C = Math.abs(E - z), N = Math.min(C / le, 1);
    return z < E ? `${Math.max(4, 16 - N * 12)}px` : "16px";
  }), y = V([d, u], ([E, z]) => {
    const C = Math.abs(E - z), N = Math.min(C / le, 1);
    return z > E ? `${Math.max(4, 16 - N * 12)}px` : "16px";
  }), g = V([d, u], ([E, z]) => {
    const C = Math.abs(E - z), N = Math.min(C / le, 1);
    return z < E ? `${100 - N * 40}%` : "100%";
  }), x = V([d, u], ([E, z]) => {
    const C = Math.abs(E - z), N = Math.min(C / le, 1);
    return z > E ? `${100 - N * 40}%` : "100%";
  }), w = V(
    [f, y],
    ([E, z]) => `${E} ${E} ${z} ${z}`
  ), k = V(
    [g, x],
    ([E, z]) => {
      const C = (100 - parseFloat(E)) / 2, N = (100 - parseFloat(z)) / 2;
      return `polygon(${C}% 0%, ${100 - C}% 0%, ${100 - N}% 100%, ${N}% 100%)`;
    }
  ), $ = re(s, { stiffness: 80, damping: 20, mass: 3.5 });
  A(() => {
    $.set(s);
  }, [s, $]);
  const M = V([d, $], ([E, z]) => {
    const C = Math.abs(E - z);
    return 0.3 + Math.min(C / (le * 2), 1) * 0.7;
  }), F = V([d, $], ([E, z]) => {
    const C = Math.abs(E - z);
    return Math.min(C / 20, 0.8);
  });
  return /* @__PURE__ */ p(W, { children: [
    /* @__PURE__ */ t(
      v.div,
      {
        className: b("absolute left-0 w-full", n.blobBg),
        style: {
          y: h,
          height: m,
          borderRadius: w,
          clipPath: k
        }
      }
    ),
    /* @__PURE__ */ t(
      v.div,
      {
        className: b("absolute left-1/4 w-1/2 h-8 rounded-full", n.blobBg),
        style: {
          y: $,
          scale: M,
          opacity: F
        }
      }
    ),
    /* @__PURE__ */ t(
      v.div,
      {
        className: b("absolute left-1/3 w-1/3 h-6 rounded-full", n.blobBg),
        style: {
          y: V($, (E) => E + (i > 0 ? -20 : 20)),
          scale: V(M, (E) => E * 0.6),
          opacity: V(F, (E) => l > 2 ? E * 0.8 : 0)
        }
      }
    )
  ] });
}, Gt = O.forwardRef(
  ({ menuItems: e, activeId: o, onActiveChange: r, className: n }, s) => {
    const l = X()?.theme ?? "spectral", a = Rt[l], [c, d] = G(
      e[0]?.id || ""
    ), [u, h] = G(null), [m, f] = G(0), [y, g] = G(!1), x = L(), w = o ?? c, k = e.findIndex((M) => M.id === w);
    A(() => (k !== m && (g(!0), x.current && clearTimeout(x.current), x.current = setTimeout(() => {
      f(k), g(!1);
    }, 600)), () => {
      x.current && clearTimeout(x.current);
    }), [k, m]);
    const $ = (M, F) => {
      f(k), d(M), r?.(M);
    };
    return /* @__PURE__ */ p(
      "div",
      {
        ref: s,
        className: b(
          "relative w-72 h-[650px] bg-gradient-to-b overflow-hidden rounded-2xl shadow-2xl border",
          a.bgGradient,
          a.border,
          n
        ),
        children: [
          /* @__PURE__ */ t(Rr, { theme: l }),
          /* @__PURE__ */ p("nav", { className: "relative flex flex-col gap-1 p-6 pt-8", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: "absolute left-6 top-8 right-6 bottom-6 pointer-events-none",
                style: { filter: `url(#sidebar-goo-3d-${l})` },
                children: /* @__PURE__ */ t(
                  Gr,
                  {
                    activeIndex: k >= 0 ? k : 0,
                    previousIndex: m,
                    isAnimating: y,
                    colors: a
                  }
                )
              }
            ),
            e.map((M, F) => {
              const E = w === M.id, z = u === M.id;
              return /* @__PURE__ */ p(
                "button",
                {
                  onClick: () => $(M.id),
                  onMouseEnter: () => h(M.id),
                  onMouseLeave: () => h(null),
                  className: b(
                    "relative w-full h-12 flex items-center gap-4 px-4 text-sm transition-all duration-300 rounded-lg outline-none group z-10",
                    E ? `${a.activeText} font-medium` : `${a.inactiveText} hover:${a.hoverText} font-normal`
                  ),
                  children: [
                    M.icon && /* @__PURE__ */ t(
                      v.div,
                      {
                        animate: E ? { scale: 1.1, x: 4 } : z ? { x: 2 } : { x: 0, scale: 1 },
                        className: b(
                          "relative z-20 transition-colors",
                          E ? `${a.activeText} drop-shadow-md` : `group-hover:${a.hoverText}`
                        ),
                        children: M.icon
                      }
                    ),
                    /* @__PURE__ */ t("span", { className: "relative z-20 tracking-wide", children: M.label }),
                    z && !E && /* @__PURE__ */ t(
                      v.div,
                      {
                        initial: { opacity: 0, x: -5 },
                        animate: { opacity: 1, x: 0 },
                        className: b("absolute right-4 w-1.5 h-1.5 rounded-full", a.hoverDot)
                      }
                    )
                  ]
                },
                M.id
              );
            })
          ] })
        ]
      }
    );
  }
);
Gt.displayName = "GooeySidebar";
const Ar = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "messages", label: "Messages" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" }
], it = {
  home: {
    title: "Welcome Home",
    description: "Your haunted dashboard awaits. Navigate through the shadows to explore different sections."
  },
  dashboard: {
    title: "Dashboard",
    description: "Overview of your spectral activities. Monitor ghost sightings and paranormal metrics."
  },
  projects: {
    title: "Projects",
    description: "Manage your supernatural projects. Track progress on hauntings and ethereal endeavors."
  },
  team: {
    title: "Team",
    description: "Your ghostly crew. Collaborate with fellow spirits on otherworldly tasks."
  },
  messages: {
    title: "Messages",
    description: "Whispers from beyond. Check your spectral inbox for communications from the other side."
  },
  analytics: {
    title: "Analytics",
    description: "Paranormal statistics. Analyze haunting patterns and supernatural trends."
  },
  settings: {
    title: "Settings",
    description: "Configure your haunted experience. Adjust preferences for optimal spookiness."
  }
}, Br = ({
  initialActiveId: e = "home",
  className: o
}) => {
  const [r, n] = G(e), i = X()?.theme ?? "spectral", l = it[r] || it.home, a = i === "blood" ? {
    bg: "bg-red-950/30",
    border: "border-red-800/50",
    title: "text-red-100",
    description: "text-red-300/80",
    accent: "text-red-400"
  } : {
    bg: "bg-purple-950/30",
    border: "border-purple-800/50",
    title: "text-purple-100",
    description: "text-purple-300/80",
    accent: "text-orange-400"
  };
  return /* @__PURE__ */ p("div", { className: b("flex gap-6 w-full min-h-[700px]", o), children: [
    /* @__PURE__ */ t(
      Gt,
      {
        menuItems: Ar,
        activeId: r,
        onActiveChange: n
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: b(
          "flex-1 rounded-2xl p-8 border transition-colors duration-300",
          a.bg,
          a.border
        ),
        children: /* @__PURE__ */ p(
          v.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "h-full flex flex-col",
            children: [
              /* @__PURE__ */ t("h2", { className: b("text-3xl font-bold mb-4", a.title), children: l.title }),
              /* @__PURE__ */ t("p", { className: b("text-lg leading-relaxed", a.description), children: l.description }),
              /* @__PURE__ */ t("div", { className: "mt-8 flex-1 flex items-center justify-center", children: /* @__PURE__ */ p(
                "div",
                {
                  className: b(
                    "text-center p-8 rounded-xl border border-dashed",
                    a.border
                  ),
                  children: [
                    /* @__PURE__ */ p("p", { className: b("text-sm", a.accent), children: [
                      "Active Section: ",
                      /* @__PURE__ */ t("span", { className: "font-mono font-bold", children: r })
                    ] }),
                    /* @__PURE__ */ p("p", { className: b("text-xs mt-2", a.description), children: [
                      "Theme: ",
                      /* @__PURE__ */ t("span", { className: "font-mono", children: i })
                    ] })
                  ]
                }
              ) })
            ]
          },
          r
        )
      }
    )
  ] });
};
Br.displayName = "GooeySidebarDemo";
const Fr = ({ className: e }) => /* @__PURE__ */ p(
  "svg",
  {
    viewBox: "0 0 174.57 164.28",
    className: e,
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("style", { children: ".cls-1{fill:#fff;}.cls-2{fill:#2b2b28;}" }) }),
      /* @__PURE__ */ p("g", { id: "Objects", children: [
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
          }
        ),
        /* @__PURE__ */ p("g", { className: "animate-[blink_4s_infinite]", children: [
          /* @__PURE__ */ t(
            "path",
            {
              className: "cls-2",
              d: "M42.43,23.31c-.36,2.1-1.5,3.78-2.53,3.74s-1.59-1.78-1.23-3.88c.36-2.1,1.5-3.78,2.53-3.74,1.04.04,1.59,1.78,1.23,3.88Z"
            }
          ),
          /* @__PURE__ */ t(
            "path",
            {
              className: "cls-2",
              d: "M54.14,22.78c.36,2.1-1.5,4.06-1.14,4.32-0.99,0.25-2.08-1.27-2.44-3.4-0.36-2.13,0.15-4.06,1.14-4.32,0.99-0.25,2.08,1.27,2.44,3.4Z"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-2",
            d: "M55.18,40.26c1.67,5.63-0.17,11.28-4.12,12.63-3.95,1.34-8.5-2.13-10.17-7.76-1.67-5.63,0.17-11.28,4.12-12.63,3.95-1.34,8.5,2.13,10.17,7.76Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M91.39,40.23s20.26,8.26,34.47,3.98,11.53,19.96-12.92,20.27c-24.44,0.31-21.56-24.24-21.56-24.24Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M31.75,71.66c-5.18-16.45-12.67-23.61-26.6-28.73-13.94-5.11,2.77-22.88,22.5-8.45,19.73,14.44,6.91,46.09,4.11,37.17Z"
          }
        )
      ] })
    ]
  }
), At = Le(null), Bt = De(({ toast: e, removeToast: o }, r) => {
  const n = e.side === "right";
  return /* @__PURE__ */ p(
    v.div,
    {
      ref: r,
      layout: !0,
      role: "status",
      "aria-atomic": "true",
      initial: {
        x: n ? "150%" : "-150%",
        opacity: 0,
        rotate: n ? 45 : -45
      },
      animate: {
        x: n ? -e.offsetX : e.offsetX,
        opacity: 1,
        rotate: e.rotation
      },
      exit: {
        x: n ? "150%" : "-150%",
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.4, ease: "backIn" }
      },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      },
      className: b(
        "pointer-events-auto relative flex items-center mb-2",
        // Reduced margin for tighter stack
        n ? "flex-row-reverse self-end" : "flex-row self-start"
      ),
      style: {
        scale: e.scale,
        zIndex: 100
        // Ensure new toasts pop on top if desired, or let natural DOM order handle it
      },
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: b(
              "relative z-20 w-24 h-24 filter drop-shadow-2xl",
              n ? "-mr-6" : "-ml-6 scale-x-[-1]"
            ),
            children: /* @__PURE__ */ t(Fr, { className: "w-full h-full" })
          }
        ),
        /* @__PURE__ */ p(
          "div",
          {
            className: b(
              "relative z-10 p-4 rounded-xl border backdrop-blur-md shadow-2xl max-w-xs",
              e.type === "curse" ? "bg-[#2a0a0a]/95 border-red-900/50 text-red-100" : e.type === "success" ? "bg-[#0a1f0a]/95 border-green-900/50 text-green-100" : "bg-[#0f0a1f]/95 border-purple-900/50 text-purple-100",
              n ? "mr-4 rounded-tr-none" : "ml-4 rounded-tl-none"
            ),
            children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: b(
                    "absolute top-6 w-3 h-3 rotate-45 border-l border-t",
                    e.type === "curse" ? "bg-[#2a0a0a] border-red-900/50" : e.type === "success" ? "bg-[#0a1f0a] border-green-900/50" : "bg-[#0f0a1f] border-purple-900/50",
                    n ? "-right-1.5 border-r border-t-0 border-l-0" : "-left-1.5"
                  )
                }
              ),
              /* @__PURE__ */ p("div", { className: "flex justify-between items-start gap-3", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-medium leading-relaxed drop-shadow-md", children: e.message }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => o(e.id),
                    className: "opacity-40 hover:opacity-100 transition-opacity",
                    children: /* @__PURE__ */ t(We, { size: 14 })
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
});
Bt.displayName = "GhostToastItem";
const Or = ({
  toasts: e,
  removeToast: o
}) => /* @__PURE__ */ p(
  "div",
  {
    className: "fixed inset-y-0 left-0 right-0 pointer-events-none flex flex-col justify-end p-6 z-[9999] overflow-hidden",
    "aria-live": "polite",
    "aria-label": "Notifications",
    children: [
      /* @__PURE__ */ t("style", { children: `
        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
      ` }),
      /* @__PURE__ */ t(D, { mode: "popLayout", children: e.map((r) => /* @__PURE__ */ t(
        Bt,
        {
          toast: r,
          removeToast: o
        },
        r.id
      )) })
    ]
  }
), Lr = ({
  children: e
}) => {
  const [o, r] = G([]), n = (i, l = "info") => {
    const a = Math.random().toString(36).substr(2, 9), c = Math.random() > 0.5 ? "right" : "left", d = 0.85 + Math.random() * 0.25, u = (Math.random() - 0.5) * 30, h = Math.random() * 60;
    r((m) => [
      ...m,
      { id: a, message: i, type: l, side: c, scale: d, rotation: u, offsetX: h }
    ]), setTimeout(() => s(a), 5e3);
  }, s = (i) => {
    r((l) => l.filter((a) => a.id !== i));
  };
  return /* @__PURE__ */ p(At.Provider, { value: { addToast: n }, children: [
    e,
    /* @__PURE__ */ t(Or, { toasts: o, removeToast: s })
  ] });
};
Lr.displayName = "GhostToastProvider";
const Un = () => {
  const e = Se(At);
  if (!e)
    throw new Error("useGhostToast must be used within a GhostToastProvider");
  return e;
}, at = [
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
], Dr = {
  spectral: {
    accent: "rgb(168, 85, 247)",
    // ghost-purple
    accentRgb: "168, 85, 247",
    glow: "rgba(168, 85, 247, 0.4)",
    glowStrong: "rgba(168, 85, 247, 0.6)",
    border: "rgba(168, 85, 247, 0.3)",
    bg: "rgba(168, 85, 247, 0.1)",
    bgHover: "rgba(168, 85, 247, 0.15)",
    ectoplasmBorder: "bg-purple-900/30",
    runeText: "text-purple-300/20"
  },
  blood: {
    accent: "rgb(239, 68, 68)",
    // blood-red
    accentRgb: "239, 68, 68",
    glow: "rgba(239, 68, 68, 0.4)",
    glowStrong: "rgba(239, 68, 68, 0.6)",
    border: "rgba(239, 68, 68, 0.3)",
    bg: "rgba(239, 68, 68, 0.1)",
    bgHover: "rgba(239, 68, 68, 0.15)",
    ectoplasmBorder: "bg-red-900/30",
    runeText: "text-red-300/20"
  }
}, Pr = O.forwardRef(
  ({
    tabs: e,
    defaultTab: o,
    onTabChange: r,
    className: n,
    variant: s
  }, i) => {
    const l = O.useId(), [a, c] = G(o || e[0]?.id), [d, u] = G(null), [h, m] = G(null), [f, y] = G(0), g = L(/* @__PURE__ */ new Map()), x = L(null), w = L(null), k = X(), $ = s ?? k?.theme ?? "spectral", M = Dr[$];
    A(() => {
      const N = setInterval(() => {
        y((B) => Math.max(0, B - 3));
      }, 100);
      return () => clearInterval(N);
    }, []);
    const F = Math.min(f / 100, 0.6), E = 15 + f / 3, z = (N) => {
      N !== a && (u(a), c(N), y((B) => Math.min(100, B + 40)), r?.(N));
    };
    Jt(() => {
      const N = g.current.get(a), B = x.current;
      if (N && B) {
        const _ = B.getBoundingClientRect(), Z = N.getBoundingClientRect();
        m({
          left: Z.left - _.left,
          width: Z.width
        });
      }
    }, [a, e]);
    const C = (() => {
      if (!d) return 0;
      const N = e.findIndex((_) => _.id === d);
      return e.findIndex((_) => _.id === a) > N ? 1 : -1;
    })();
    return /* @__PURE__ */ p("div", { ref: i, className: b("w-full relative", n), children: [
      /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `ectoplasm-distortion-${l}`, children: [
        /* @__PURE__ */ t(
          "feTurbulence",
          {
            type: "fractalNoise",
            baseFrequency: "0.015 0.05",
            numOctaves: 2,
            result: "noise",
            children: /* @__PURE__ */ t(
              "animate",
              {
                attributeName: "baseFrequency",
                dur: "12s",
                values: "0.015 0.05; 0.025 0.07; 0.015 0.05",
                repeatCount: "indefinite"
              }
            )
          }
        ),
        /* @__PURE__ */ t(
          "feDisplacementMap",
          {
            in: "SourceGraphic",
            in2: "noise",
            scale: E
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t(
        "div",
        {
          className: b(
            "absolute -inset-[2px] transition-opacity duration-300 pointer-events-none",
            M.ectoplasmBorder
          ),
          style: {
            filter: `url(#ectoplasm-distortion-${l})`,
            opacity: f > 20 ? 0.4 + F / 3 : 0
          }
        }
      ),
      /* @__PURE__ */ t(D, { children: f > 30 && /* @__PURE__ */ t(W, { children: Array.from({ length: 4 }).map((N, B) => {
        const _ = at[Math.floor(Math.random() * at.length)], Z = 10 + Math.random() * 80, ne = 10 + Math.random() * 80, ee = Math.random() * 360;
        return /* @__PURE__ */ t(
          v.div,
          {
            className: b("absolute text-2xl font-rune pointer-events-none z-0", M.runeText),
            style: {
              left: `${Z}%`,
              top: `${ne}%`,
              transform: `rotate(${ee}deg)`
            },
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: Math.random() * 0.3 + f / 300,
              scale: 1,
              x: Math.random() * 15 - 7.5,
              y: Math.random() * 15 - 7.5
            },
            exit: { opacity: 0, scale: 1.2 },
            transition: { duration: 1.5, ease: "easeInOut" },
            children: _
          },
          `rune-${a}-${B}`
        );
      }) }) }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: x,
          className: "relative z-10",
          style: {
            borderBottom: `1px solid ${M.border}`
          },
          children: [
            /* @__PURE__ */ p("div", { className: "flex gap-1 relative", role: "tablist", children: [
              h && /* @__PURE__ */ t(
                v.div,
                {
                  className: "absolute top-0 bottom-0 -z-10",
                  style: {
                    background: `linear-gradient(180deg, ${M.bg} 0%, transparent 100%)`,
                    borderTop: `2px solid ${M.accent}`,
                    borderLeft: `1px solid ${M.border}`,
                    borderRight: `1px solid ${M.border}`,
                    filter: f > 20 ? `url(#ectoplasm-distortion-${l})` : "none",
                    boxShadow: `0 0 ${15 + f / 5}px ${M.glow}`
                  },
                  animate: {
                    left: h.left,
                    width: h.width
                  },
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8
                  }
                }
              ),
              e.map((N) => {
                const B = N.id === a, _ = /* @__PURE__ */ p(
                  "button",
                  {
                    ref: (Z) => {
                      Z && g.current.set(N.id, Z);
                    },
                    onClick: () => z(N.id),
                    className: b(
                      "relative px-5 py-3.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2",
                      B ? "text-ghost-white" : "text-ghost-white/50 hover:text-ghost-white/80"
                    ),
                    style: {
                      ...B && {
                        textShadow: `0 0 20px ${M.glow}`
                      }
                    },
                    role: "tab",
                    "aria-selected": B,
                    "aria-controls": `panel-${N.id}`,
                    id: `tab-${N.id}`,
                    children: [
                      /* @__PURE__ */ p("div", { className: "flex items-center gap-2.5 relative z-10", children: [
                        N.icon && /* @__PURE__ */ t(
                          v.span,
                          {
                            animate: {
                              scale: B ? 1.1 : 1,
                              color: B ? M.accent : void 0
                            },
                            transition: { duration: 0.2 },
                            children: N.icon
                          }
                        ),
                        /* @__PURE__ */ t("span", { children: N.label })
                      ] }),
                      B && /* @__PURE__ */ t(
                        v.div,
                        {
                          className: "absolute inset-0 -z-10 pointer-events-none",
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          exit: { opacity: 0 },
                          style: {
                            background: `radial-gradient(ellipse at center bottom, ${M.glow} 0%, transparent 70%)`,
                            filter: "blur(8px)"
                          }
                        }
                      )
                    ]
                  },
                  N.id
                );
                return N.tooltip ? /* @__PURE__ */ t(
                  Ze,
                  {
                    content: N.tooltip,
                    position: N.tooltipPosition,
                    className: N.tooltipClassName,
                    children: _
                  },
                  N.id
                ) : _;
              })
            ] }),
            h && /* @__PURE__ */ t(
              v.div,
              {
                className: "absolute bottom-0 h-0.5",
                style: {
                  background: `linear-gradient(90deg, transparent, ${M.accent}, transparent)`,
                  boxShadow: `0 0 ${10 + f / 10}px ${M.glow}, 0 0 ${20 + f / 5}px ${M.glow}`,
                  filter: f > 30 ? `url(#ectoplasm-distortion-${l})` : "none"
                },
                animate: {
                  left: h.left,
                  width: h.width
                },
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t("div", { ref: w, className: "relative overflow-hidden z-10", children: /* @__PURE__ */ t(D, { mode: "wait", initial: !1, children: e.map((N) => N.id === a ? /* @__PURE__ */ t(
        v.div,
        {
          role: "tabpanel",
          id: `panel-${N.id}`,
          "aria-labelledby": `tab-${N.id}`,
          initial: {
            opacity: 0,
            x: C * 30,
            scale: 0.98,
            filter: "blur(4px)"
          },
          animate: {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)"
          },
          exit: {
            opacity: 0,
            x: C * -30,
            scale: 0.98,
            filter: "blur(4px)"
          },
          transition: {
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.25 },
            filter: { duration: 0.3 }
          },
          className: "pt-6",
          children: N.content
        },
        N.id
      ) : null) }) }),
      /* @__PURE__ */ t("style", { children: `
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
                
                .font-rune {
                    font-family: 'Cinzel', serif;
                    user-select: none;
                }
            ` })
    ] });
  }
);
Pr.displayName = "SpectralTabs";
const _r = {
  spectral: {
    ectoplasmBorder: "bg-purple-900/30",
    whisperGlow: "bg-purple-500/10",
    runeText: "text-purple-300/20",
    labelFocused: "text-purple-400",
    labelDefault: "text-purple-200/50",
    border: "border-purple-500/20",
    borderFocused: "border-purple-500/50",
    cornerBorder: "border-purple-500/40",
    iconActive: "text-purple-400",
    iconFocused: "text-purple-700",
    iconDefault: "text-purple-900/40",
    textColor: "text-purple-100",
    placeholder: "placeholder:text-purple-900/50",
    selection: "selection:bg-purple-500/30",
    glowRgba: "rgba(168, 85, 247,",
    textShadowRgba: "rgba(168, 85, 247, 0.4)",
    caretColor: "#d8b4fe"
  },
  blood: {
    ectoplasmBorder: "bg-red-900/30",
    whisperGlow: "bg-red-500/10",
    runeText: "text-red-300/20",
    labelFocused: "text-red-400",
    labelDefault: "text-red-200/50",
    border: "border-red-500/20",
    borderFocused: "border-red-500/50",
    cornerBorder: "border-red-500/40",
    iconActive: "text-red-400",
    iconFocused: "text-red-700",
    iconDefault: "text-red-900/40",
    textColor: "text-red-100",
    placeholder: "placeholder:text-red-900/50",
    selection: "selection:bg-red-500/30",
    glowRgba: "rgba(239, 68, 68,",
    textShadowRgba: "rgba(239, 68, 68, 0.4)",
    caretColor: "#fca5a5"
  }
}, lt = [
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
], Hr = O.forwardRef(
  ({ className: e, value: o, defaultValue: r, onChange: n, onFocus: s, onBlur: i, ...l }, a) => {
    const c = O.useId(), [d, u] = G(r || ""), [h, m] = G(!1), [f, y] = G(0), g = L(Date.now()), w = X()?.theme ?? "spectral", k = _r[w], $ = o !== void 0, M = Math.min(f / 100, 0.8), F = 20 + f / 2;
    A(() => {
      const N = setInterval(() => {
        y((B) => Math.max(0, B - 5));
      }, 100);
      return () => clearInterval(N);
    }, []);
    const E = (N) => {
      $ || u(N.target.value), y((B) => Math.min(100, B + 15)), g.current = Date.now(), n?.(N);
    }, z = (N) => {
      m(!0), s?.(N);
    }, C = (N) => {
      m(!1), i?.(N);
    };
    return /* @__PURE__ */ p("div", { className: "relative w-full", children: [
      /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `ectoplasm-distortion-${c}`, children: [
        /* @__PURE__ */ t(
          "feTurbulence",
          {
            type: "fractalNoise",
            baseFrequency: "0.01 0.04",
            numOctaves: 3,
            result: "noise",
            children: /* @__PURE__ */ t(
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
        /* @__PURE__ */ t(
          "feDisplacementMap",
          {
            in: "SourceGraphic",
            in2: "noise",
            scale: F
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t(
        "div",
        {
          className: b("absolute -inset-1 rounded transition-opacity duration-300 pointer-events-none", k.ectoplasmBorder),
          style: {
            filter: `url(#ectoplasm-distortion-${c})`,
            opacity: h ? 0.6 + M / 2 : 0
          }
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: b("absolute inset-0 blur-xl rounded pointer-events-none transition-opacity duration-100", k.whisperGlow),
          style: {
            opacity: M
          }
        }
      ),
      /* @__PURE__ */ t(D, { children: f > 10 && /* @__PURE__ */ t(W, { children: Array.from({ length: 6 }).map((N, B) => {
        const _ = lt[Math.floor(Math.random() * lt.length)], Z = 10 + Math.random() * 80, ne = 10 + Math.random() * 80, ee = Math.random() * 360;
        return /* @__PURE__ */ t(
          v.div,
          {
            className: b("absolute text-4xl font-rune pointer-events-none", k.runeText),
            style: {
              left: `${Z}%`,
              top: `${ne}%`,
              transform: `rotate(${ee}deg)`
            },
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: Math.random() * 0.5 + f / 200,
              scale: 1,
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10
            },
            exit: { opacity: 0, scale: 1.2 },
            transition: { duration: 2, ease: "easeInOut" },
            children: _
          },
          `rune-${B}`
        );
      }) }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          ref: a,
          className: b(
            "w-full min-h-[240px] resize-y relative z-10",
            "bg-[#0a0510]/80 backdrop-blur-sm",
            "border",
            k.border,
            k.textColor,
            "text-lg leading-relaxed font-serif",
            "px-6 py-6",
            "outline-none",
            k.placeholder,
            k.selection,
            "selection:text-white",
            `ghost-text-${w}`,
            h && k.borderFocused,
            e
          ),
          style: {
            ...h && {
              boxShadow: `0 0 ${20 + f}px ${k.glowRgba} ${0.1 + f / 500})`
            },
            textShadow: `0 0 8px ${k.textShadowRgba}, 2px 2px 0px rgba(0,0,0,0.5)`,
            caretColor: k.caretColor
          },
          ...$ ? { value: o } : { defaultValue: r },
          onChange: E,
          onFocus: z,
          onBlur: C,
          ...l
        }
      ),
      /* @__PURE__ */ t("div", { className: b("absolute top-0 left-0 w-1 h-1 border-t border-l pointer-events-none z-20", k.cornerBorder) }),
      /* @__PURE__ */ t("div", { className: b("absolute top-0 right-0 w-1 h-1 border-t border-r pointer-events-none z-20", k.cornerBorder) }),
      /* @__PURE__ */ t("div", { className: b("absolute bottom-0 left-0 w-1 h-1 border-b border-l pointer-events-none z-20", k.cornerBorder) }),
      /* @__PURE__ */ t("div", { className: b("absolute bottom-0 right-0 w-1 h-1 border-b border-r pointer-events-none z-20", k.cornerBorder) }),
      /* @__PURE__ */ t("style", { children: `
          @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap');
          
          .font-rune {
            font-family: 'Cinzel', serif;
            user-select: none;
          }
        ` })
    ] });
  }
);
Hr.displayName = "WhisperBox";
const Wr = {
  blood: {
    container: "bg-red-950/30 border-red-900/50",
    fill: "bg-[#8a1c1c]",
    glow: "shadow-[0_0_15px_rgba(220,38,38,0.4)]",
    dripColor: "bg-[#8a1c1c]",
    icon: /* @__PURE__ */ t(dr, { size: 16, className: "text-red-400" })
  },
  candle: {
    container: "bg-orange-950/30 border-orange-900/30",
    fill: "bg-[#ffedd5]",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.4)]",
    dripColor: "bg-[#ffedd5]",
    icon: /* @__PURE__ */ t(sr, { size: 16, className: "text-orange-400" })
  },
  soul: {
    container: "bg-indigo-950/40 border-indigo-500/30",
    fill: "bg-indigo-600",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.6)]",
    dripColor: "bg-transparent",
    icon: /* @__PURE__ */ t(He, { size: 16, className: "text-indigo-300" })
  }
}, Ft = O.memo(({ filterId: e, variant: o }) => /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `goo-3d-${o}-${e}`, colorInterpolationFilters: "sRGB", children: [
  /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "4", result: "blur" }),
  /* @__PURE__ */ t(
    "feColorMatrix",
    {
      in: "blur",
      mode: "matrix",
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",
      result: "goo"
    }
  ),
  /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "2", result: "smoothGoo" }),
  /* @__PURE__ */ t(
    "feSpecularLighting",
    {
      in: "smoothGoo",
      surfaceScale: "5",
      specularConstant: "1.2",
      specularExponent: "20",
      lightingColor: "#ffffff",
      result: "specular",
      children: /* @__PURE__ */ t("fePointLight", { x: "-100", y: "-200", z: "200" })
    }
  ),
  /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularClean" }),
  /* @__PURE__ */ t("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop", result: "solidGoo" }),
  /* @__PURE__ */ t("feComposite", { in: "specularClean", in2: "solidGoo", operator: "over" })
] }) }) }));
Ft.displayName = "GooFilter";
const Ot = O.memo(({ dripColor: e }) => /* @__PURE__ */ p(W, { children: [
  /* @__PURE__ */ t(
    v.div,
    {
      className: b("absolute right-0 top-full w-4 h-4 -mt-2 rounded-full", e),
      animate: { height: [10, 25, 10] },
      transition: { duration: 2, repeat: 1 / 0, ease: "easeInOut" }
    }
  ),
  /* @__PURE__ */ t(
    v.div,
    {
      className: b("absolute right-4 top-full w-3 h-3 -mt-2 rounded-full", e),
      animate: { height: [8, 20, 8] },
      transition: { duration: 3, repeat: 1 / 0, ease: "easeInOut", delay: 1 }
    }
  )
] }));
Ot.displayName = "Drips";
const Lt = O.memo(() => /* @__PURE__ */ p(W, { children: [
  /* @__PURE__ */ p("div", { className: "absolute inset-0 overflow-hidden rounded-full", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "absolute inset-0 opacity-20",
        style: {
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          animation: "shimmer 2s linear infinite"
        }
      }
    ),
    [0, 1, 2].map((e) => /* @__PURE__ */ t(
      v.div,
      {
        className: "absolute top-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]",
        initial: { left: "0%", opacity: 0 },
        animate: {
          left: ["0%", "100%"],
          opacity: [0, 1, 0]
        },
        transition: {
          duration: 2.5 + e * 0.5,
          repeat: 1 / 0,
          ease: "linear",
          delay: e * 0.8
        }
      },
      e
    ))
  ] }),
  /* @__PURE__ */ t("div", { className: "absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-sm" })
] }));
Lt.displayName = "SoulEffects";
const Zr = O.forwardRef(
  ({ value: e, variant: o = "blood", className: r }, n) => {
    const s = O.useId(), i = Math.min(100, Math.max(0, e)), l = i === 100, a = Wr[o], c = o !== "soul", d = ce(
      () => c ? { filter: `url(#goo-3d-${o}-${s})` } : void 0,
      [c, o, s]
    ), u = ce(
      () => ({ type: "spring", stiffness: 50, damping: 15 }),
      []
    );
    return /* @__PURE__ */ p("div", { ref: n, className: b("w-full max-w-md", r), children: [
      /* @__PURE__ */ p("div", { className: "flex justify-between items-center mb-2 px-1", children: [
        /* @__PURE__ */ p("div", { className: "flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-gray-500", children: [
          a.icon,
          /* @__PURE__ */ p("span", { children: [
            o,
            " Gauge"
          ] })
        ] }),
        /* @__PURE__ */ p("span", { className: "font-mono text-xs text-gray-400", children: [
          Math.round(i),
          "%"
        ] })
      ] }),
      c && /* @__PURE__ */ t(Ft, { filterId: s, variant: o }),
      /* @__PURE__ */ p(
        "div",
        {
          className: "relative h-6 w-full",
          role: "progressbar",
          "aria-valuenow": Math.round(i),
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-label": `${o} progress: ${Math.round(i)}%`,
          children: [
            /* @__PURE__ */ t("div", { className: b("absolute inset-0 rounded-full border", a.container) }),
            /* @__PURE__ */ t("div", { className: "absolute inset-0 w-full h-full overflow-visible", style: d, children: /* @__PURE__ */ p(
              v.div,
              {
                className: b("h-full rounded-full relative", a.fill),
                initial: !1,
                animate: { width: `${i}%` },
                transition: u,
                children: [
                  o === "soul" && i > 0 && /* @__PURE__ */ t(Lt, {}),
                  c && i > 0 && /* @__PURE__ */ t(Ot, { dripColor: a.dripColor })
                ]
              }
            ) }),
            /* @__PURE__ */ t(D, { children: l && /* @__PURE__ */ t(
              v.div,
              {
                initial: { opacity: 0, scale: 1 },
                animate: { opacity: [0, 1, 0], scale: 1.2 },
                exit: { opacity: 0 },
                transition: { duration: 1, repeat: 1 / 0 },
                className: b(
                  "absolute inset-0 rounded-full border-2 border-white/50 pointer-events-none",
                  a.glow
                )
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ t("style", { children: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      ` })
    ] });
  }
);
Zr.displayName = "GooeyProgressBar";
const Dt = {
  spectral: {
    primary: "#2e1065",
    secondary: "#1a0b2e",
    accent: "#22c55e",
    glow: "#00ff7f",
    block: "#1e1e2e",
    flicker: "#4c1d95",
    fog: "#2d2d44",
    border: "rgba(139, 92, 246, 0.2)",
    bg: "#0f0716"
  },
  blood: {
    primary: "#450a0a",
    secondary: "#1f0a0a",
    accent: "#f97316",
    glow: "#ff6b35",
    block: "#2e1a1a",
    flicker: "#7f1d1d",
    fog: "#3d2424",
    border: "rgba(239, 68, 68, 0.2)",
    bg: "#150a0a"
  }
};
let jr = 0;
const Yr = () => `spooky-skeleton-${++jr}`;
function Re(e) {
  const { className: o = "", style: r } = e.props, n = String(o);
  let s = "w-full";
  const i = n.match(/w-(\[[\d\w%]+\]|\d+\/\d+|full|auto|screen|min|max|fit|\d+)/);
  i ? s = `w-${i[1]}` : r?.width && (s = `w-[${r.width}]`);
  let l = "h-4";
  const a = n.match(/h-(\[[\d\w%]+\]|\d+\/\d+|full|auto|screen|min|max|fit|\d+)/);
  a ? l = `h-${a[1]}` : r?.height && (l = `h-[${r.height}]`);
  let c = "rounded-md";
  return n.includes("rounded-full") || e.type === "img" && n.includes("avatar") ? c = "rounded-full" : n.includes("rounded-lg") ? c = "rounded-lg" : n.includes("rounded-xl") ? c = "rounded-xl" : n.includes("rounded-2xl") ? c = "rounded-2xl" : n.includes("rounded-none") && (c = "rounded-none"), { width: s, height: l, rounded: c };
}
function Vr(e) {
  const o = ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label", "a"];
  return typeof e.type == "string" && o.includes(e.type);
}
function Xr(e) {
  const { className: o = "" } = e.props, r = String(o);
  return e.type === "img" || r.includes("avatar") || r.includes("rounded-full") || r.includes("w-") && r.includes("h-") && /w-\d+/.test(r) && /h-\d+/.test(r);
}
function qr(e) {
  const o = ["div", "section", "article", "main", "aside", "header", "footer", "nav"];
  return typeof e.type == "string" && o.includes(e.type);
}
function ke(e, o, r, n = 0) {
  if (!e) return null;
  if (Array.isArray(e))
    return e.map((s, i) => ke(s, o, r, n));
  if (typeof e == "string" || typeof e == "number") {
    const s = String(e).trim();
    if (!s) return null;
    const i = Math.min(s.length * 8, 200);
    return /* @__PURE__ */ t(
      q,
      {
        variant: o,
        theme: r,
        className: `h-4 w-[${i}px] inline-block`
      }
    );
  }
  if (mt(e)) {
    const s = e, { className: i = "", children: l, style: a } = s.props, c = String(i);
    if (c.includes("hidden") || c.includes("sr-only"))
      return null;
    if (Xr(s)) {
      const u = Re(s);
      return /* @__PURE__ */ t(
        q,
        {
          variant: o,
          theme: r,
          className: b(u.width, u.height, u.rounded, "flex-shrink-0")
        }
      );
    }
    if (Vr(s)) {
      const u = Re(s), h = ["w-full", "w-11/12", "w-5/6", "w-4/5", "w-3/4"], m = u.width === "w-full" ? h[Math.floor(Math.random() * h.length)] : u.width;
      return /* @__PURE__ */ t(
        q,
        {
          variant: o,
          theme: r,
          className: b(m, u.height || "h-4", u.rounded)
        }
      );
    }
    if (qr(s)) {
      const u = Qt.map(
        l,
        (m) => ke(m, o, r, n + 1)
      ), h = c.split(" ").filter(
        (m) => m.startsWith("flex") || m.startsWith("grid") || m.startsWith("gap") || m.startsWith("space-") || m.startsWith("p-") || m.startsWith("px-") || m.startsWith("py-") || m.startsWith("m-") || m.startsWith("mx-") || m.startsWith("my-") || m.startsWith("w-") || m.startsWith("h-") || m.startsWith("max-") || m.startsWith("min-") || m.startsWith("rounded") || m.startsWith("items-") || m.startsWith("justify-") || m.startsWith("self-") || m.startsWith("col-") || m.startsWith("row-")
      ).join(" ");
      return /* @__PURE__ */ t("div", { className: h, children: u });
    }
    if (l)
      return ke(l, o, r, n + 1);
    const d = Re(s);
    return /* @__PURE__ */ t(
      q,
      {
        variant: o,
        theme: r,
        className: b(d.width, d.height, d.rounded)
      }
    );
  }
  return null;
}
const q = ({ variant: e, className: o, theme: r }) => {
  const n = X(), s = r ?? n?.theme ?? "spectral", i = Dt[s];
  return /* @__PURE__ */ t(
    "div",
    {
      className: b("relative overflow-hidden rounded-md", (() => {
        switch (e) {
          case "sweep":
            return "skeleton-sweep";
          case "scan":
            return `bg-[${i.block}] skeleton-scan`;
          case "flicker":
            return "skeleton-flicker";
          case "fog":
            return `bg-[${i.fog}]`;
          default:
            return "skeleton-sweep";
        }
      })(), o),
      style: {
        backgroundColor: e === "scan" ? i.block : e === "flicker" ? i.flicker : e === "fog" ? i.fog : void 0
      },
      children: e === "fog" && /* @__PURE__ */ t("div", { className: "absolute inset-0 skeleton-fog-overlay" })
    }
  );
}, Pt = ({ variant: e, children: o, className: r }) => {
  const s = X()?.theme ?? "spectral", i = Dt[s], l = O.useMemo(() => Yr(), []), a = o ? ke(o, e, s) : (
    // Default fallback layout when no children provided
    /* @__PURE__ */ p(W, { children: [
      /* @__PURE__ */ p("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ t(q, { variant: e, theme: s, className: "w-12 h-12 rounded-full flex-shrink-0" }),
        /* @__PURE__ */ p("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ t(q, { variant: e, theme: s, className: "h-4 w-3/4" }),
          /* @__PURE__ */ t(q, { variant: e, theme: s, className: "h-3 w-1/2" })
        ] })
      ] }),
      /* @__PURE__ */ p("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(q, { variant: e, theme: s, className: "h-3 w-full" }),
        /* @__PURE__ */ t(q, { variant: e, theme: s, className: "h-3 w-5/6" }),
        /* @__PURE__ */ t(q, { variant: e, theme: s, className: "h-3 w-4/5" })
      ] })
    ] })
  );
  return /* @__PURE__ */ p(W, { children: [
    /* @__PURE__ */ t("style", { children: `
        .${l} .skeleton-sweep {
          background: linear-gradient(90deg, ${i.secondary} 0%, ${i.primary} 25%, ${i.accent} 50%, ${i.primary} 75%, ${i.secondary} 100%);
          background-size: 200% 100%;
          animation: skeleton-sweep-anim 4.5s ease-in-out infinite;
          box-shadow: 0 0 8px ${i.accent}40, inset 0 0 4px ${i.accent}20;
        }

        @keyframes skeleton-sweep-anim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .${l} .skeleton-scan {
          position: relative;
          box-shadow: 0 0 6px ${i.glow}30, inset 0 0 3px ${i.glow}15;
        }

        .${l} .skeleton-scan::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: ${i.glow};
          box-shadow: 0 0 12px ${i.glow}, 0 0 24px ${i.glow}, 0 0 36px ${i.glow}80;
          opacity: 0.7;
          animation: skeleton-scan-anim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 10;
        }

        @keyframes skeleton-scan-anim {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .${l} .skeleton-flicker {
          animation: skeleton-flicker-anim 4.5s steps(10, start) infinite;
          box-shadow: 0 0 10px ${i.accent}50, 0 0 20px ${i.accent}25;
        }

        @keyframes skeleton-flicker-anim {
          0%, 100% { opacity: 0.3; box-shadow: 0 0 6px ${i.accent}30; }
          5% { opacity: 0.8; box-shadow: 0 0 16px ${i.accent}70, 0 0 24px ${i.accent}40; }
          10% { opacity: 0.3; box-shadow: 0 0 6px ${i.accent}30; }
          15% { opacity: 0.3; box-shadow: 0 0 6px ${i.accent}30; }
          20% { opacity: 0.7; box-shadow: 0 0 14px ${i.accent}60, 0 0 20px ${i.accent}35; }
          40% { opacity: 0.3; box-shadow: 0 0 6px ${i.accent}30; }
          80% { opacity: 0.5; box-shadow: 0 0 10px ${i.accent}45; }
        }

        .${l} .skeleton-fog-overlay {
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          filter: blur(20px);
          animation: skeleton-fog-anim 8s ease-in-out infinite alternate;
        }

        @keyframes skeleton-fog-anim {
          0% { transform: translateX(-10%); opacity: 0.3; }
          50% { transform: translateX(10%); opacity: 0.6; }
          100% { transform: translateX(-10%); opacity: 0.3; }
        }

        .${l}.skeleton-flow-container {
          animation: skeleton-flow-wave 6s ease-in-out infinite;
        }

        @keyframes skeleton-flow-wave {
          0%, 100% { 
            transform: translateY(0px);
            box-shadow: 0 0 20px ${i.accent}15, 0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px ${i.accent}08;
          }
          25% { 
            transform: translateY(-2px);
            box-shadow: 0 0 24px ${i.accent}20, 0 6px 24px rgba(0,0,0,0.35), inset 0 0 35px ${i.accent}12;
          }
          50% { 
            transform: translateY(0px);
            box-shadow: 0 0 20px ${i.accent}15, 0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px ${i.accent}08;
          }
          75% { 
            transform: translateY(2px);
            box-shadow: 0 0 16px ${i.accent}12, 0 2px 16px rgba(0,0,0,0.25), inset 0 0 25px ${i.accent}06;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .${l} .skeleton-sweep,
          .${l} .skeleton-flicker,
          .${l} .skeleton-fog-overlay,
          .${l} .skeleton-scan::after,
          .${l}.skeleton-flow-container {
            animation: none;
          }
        }
      ` }),
    /* @__PURE__ */ t(
      "div",
      {
        className: b(
          l,
          "relative p-6 rounded-2xl border shadow-lg skeleton-flow-container",
          r
        ),
        style: {
          backgroundColor: i.bg,
          borderColor: i.border,
          boxShadow: `0 0 20px ${i.accent}15, 0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px ${i.accent}08`
        },
        role: "status",
        "aria-label": "Loading content",
        children: a
      }
    )
  ] });
};
Pt.displayName = "SpookySkeleton";
const Kn = Pt, Ur = `
/* Hide native scrollbar for various browsers */
.hide-native-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.hide-native-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Ghost Floating Animation */
@keyframes ghost-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
`, Kr = ({ className: e }) => /* @__PURE__ */ t(
  "svg",
  {
    viewBox: "0 0 174.57 164.28",
    className: b("w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]", e),
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ p("g", { style: { animation: "ghost-float 3s ease-in-out infinite" }, children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#ffffff",
          d: "M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M42.43,23.31c-.36,2.1-1.5,3.78-2.53,3.74s-1.59-1.78-1.23-3.88c.36-2.1,1.5-3.78,2.53-3.74,1.04.04,1.59,1.78,1.23,3.88Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M54.14,22.78c.36,2.13-.15,4.06-1.14,4.32-.99.25-2.08-1.27-2.44-3.4-.36-2.13.15-4.06,1.14-4.32.99-.25,2.08,1.27,2.44,3.4Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#2b2b28",
          d: "M55.18,40.26c1.67,5.63-.17,11.28-4.12,12.63-3.95,1.34-8.5-2.13-10.17-7.76-1.67-5.63.17-11.28,4.12-12.63,3.95-1.34,8.5,2.13,10.17,7.76Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#ffffff",
          d: "M91.39,40.23s20.26,8.26,34.47,3.98,11.53,19.96-12.92,20.27c-24.44.31-21.56-24.24-21.56-24.24Z",
          opacity: "0.5"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#ffffff",
          d: "M31.75,71.66c-5.18-16.45-12.67-23.61-26.6-28.73-13.94-5.11,2.77-22.88,22.5-8.45,19.73,14.44,6.91,46.09,4.11,37.17Z",
          opacity: "0.3"
        }
      )
    ] })
  }
), Jr = ({ className: e }) => /* @__PURE__ */ t(
  "svg",
  {
    viewBox: "0 0 116.24 100.37",
    className: b("w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]", e),
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ p("g", { children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#f9f8f7",
          d: "M70.58,2.81c-11.62-6.35-23.33-1.1-32.03,7.42-1.62,1.58-3.63,3.01-5.76,3.82-6.14,2.33-12.92,2.27-19.28,3.81-7.11,1.73-7.83,5.94-7.98,12.28-.19,8.37-2.03,17.7-4.3,25.74-.86,3.03-3.2,9.49,2.28,6.87,3.45-1.65,8.91-8.56,12.86-6.5,3.29,1.71,2.01,7.09,4.59,9.14,1.74,1.38,2.29.3,3.47-1.32,1.56-2.14,3.82-4.46,5.93-.74,1.62,2.85,1.01,7.4.42,10.52-1.03,5.44-3.8,10.7-4.53,16.18-.64,4.79,1.51,6.43,5.73,4.24,2.06-1.07,4.03-2.74,6.27-3.38,4.32-1.24,6.27.99,7.84,4.43,1.68,3.7,4.5,7.46,7.97,3.07,2.53-3.2,4.41-12.03,9.98-7.76,2.17,1.66,2.36,4.64,4.3,6.38,3.47,3.11,4.44-1.11,7.4-1.94,2.36-.66,3.98,2.69,6.88,1.82,3.76-1.12,4.01-4.44,3-7.64-.87-2.78-2.12-5.37-3.13-8.08-1.5-4.04-4.41-17.51,2.01-18.75,4.81-.93,6.43,7.02,12.19,3.72,3.27-1.87,2.64-4.52,2.36-7.57-.29-3.2-1.48-8.14,2.76-6.99,3.15.85,5.51,3.68,8.8,4.13,4.54.61,5.64-3.41,5.63-7.16-.02-9.46-.99-22.74-10.74-27.4-2.95-1.41-6.34-1.81-9.57-2.31-.61-.1-1.22-.19-1.82-.31-1.97-.37-3.83-.95-5.58-1.91-2.83-1.56-5.35-4.75-7.85-6.88-3.13-2.67-6.49-4.97-10.1-6.94Z"
        }
      ),
      /* @__PURE__ */ p("g", { children: [
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#3a4d57",
            d: "M44.79,33.52s15.08,7.03,28.62-1.11c0,0-1.2,17.91-14.31,17.39-13.11-.51-14.31-16.28-14.31-16.28Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#f9f8f7",
            d: "M70.63,28.2s.91,6.81-3.81,11.23c0,0,1.28-4.92-.64-10.51l4.45-.72Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#f9f8f7",
            d: "M48.92,28.66s-.91,6.81,3.81,11.23c0,0-1.28-4.92.64-10.51l-4.45-.72Z"
          }
        )
      ] }),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#3a4d57",
          d: "M63.07,30.9c.01-1.42,1.48-3.65,2.24-4.84,1.59-2.49,3.12-4.98,4.5-7.58.99-1.87,1.87-3.81,3.02-5.59.26-.41.63-1.25,1.13-1.3.72,1.74.06,4.12-.36,5.85-.67,2.75-2.22,5.22-3.92,7.44-1.34,1.75-2.56,3.3-4.47,4.44-.68.41-1.82.78-2.16,1.6Z"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#3a4d57",
          d: "M55.04,30.9c-.01-1.42-1.48-3.65-2.24-4.84-1.59-2.49-3.12-4.98-4.5-7.58-.99-1.87-1.87-3.81-3.02-5.59-.26-.41-.63-1.25-1.13-1.3-.72,1.74-.06,4.12.36,5.85.67,2.75,2.22,5.22,3.92,7.44,1.34,1.75,2.56,3.3,4.47,4.44.68.41,1.82.78,2.16,1.6Z"
        }
      ),
      /* @__PURE__ */ p("g", { children: [
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M90.9,62.71c-1.33-3.12-3.59-5.45-4.96-8.61-.62-1.43-1.63-6.33-3.45-3.52-1.39,2.15-1.54,6.26-1.59,8.79-.04,2.49-.19,5.11-.14,7.72.45-2.4,1.55-4.24,3.73-4.66,3.28-.63,5.07,2.86,7.71,4.1-.42-1.35-.82-2.69-1.3-3.82Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M73.66,29.68c.49.01,1.48-.73,1.88-1.01.98-.71,1.34-1.6,1.66-2.74.47-1.67.26-3.47-.72-4.28-.18,2.12-1.03,4.46-2.2,6.25-.32.49-1.82,1.75-.63,1.78Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M63.48,85.18c-.65-2.75-1.11-5.49-1.29-8.31-.09-1.4.64-6.43-.67-7.17-1.66,1.71-2.19,5.11-2.54,7.36-.58,3.79-.98,7.74-1.74,11.49-.47,2.32-1.84,4.26-2.39,6.53-.21.85-.45,1.95-.67,3.15,2.46-3.33,4.38-11.79,9.86-7.59.29.22.54.47.77.73-.4-2.06-.83-4.11-1.32-6.18Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M79.81,95.51c-1.03-2.61-1.67-5.48-2.77-8.05-.53-1.25-1.12-2.12-1.51-3.46-.38-1.3-.45-2.91-.92-4.14-.68-1.79-1.22-1.49-1.66.26-1.24,4.94.63,10.65.09,15.68-.05.44-.19.89-.35,1.35.89-.76,1.79-1.72,3.05-2.08,1.72-.48,3.04,1.16,4.75,1.75-.26-.41-.49-.84-.68-1.32Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M107.21,53.1c-.65-1.98-1.09-4.31-1.99-6.17-.64-1.33-2.24-3.5-3.52-4.29-1.92-1.19-2.37.28-2.8,2.1-.68,2.87-.46,5.57-.1,8.34.28-1.27,1.07-2.01,3.01-1.49,2.21.6,4.04,2.17,6.08,3.2-.24-.54-.47-1.09-.67-1.69Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M65.88,52.17c-1.77.03-3.32,1.55-5.06,1.64-2.81.15-5.11-.93-7.75-1.17.12,8.15,13.33,6.63,12.81-.47Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M46.99,29.9c1.14-.8-.06-.83-.83-1.57-1.09-1.02-2.84-2.54-2.91-4.1-1.22,1.58.34,8.07,3.75,5.67Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M30.44,75.4c.78-2.31,1.29-4.68,1.62-7.17.55-4.16.79-8.04.93-12.22.07-2.16.58-5.65-.58-7.53-1.88,2.29-3.05,4.83-4.07,7.68-1.05,2.93-2.97,5.35-4.12,8.22.07-.1.15-.21.23-.32,1.56-2.14,3.82-4.46,5.93-.74,1.62,2.85,1.01,7.4.42,10.52-.1.52-.23,1.04-.35,1.56Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M64.51,18.33c-.92,1.31-1.64,2.78-2.53,4.12-.79,1.19-2.62,4.26-4.37,2.48-1.26-1.29-2-3.3-2.83-4.9-.53-1.03-2.27-5.02-3.28-5.12-.36,2.4,1.63,5.76,2.73,7.7.94,1.67,1.61,3.46,2.25,5.26.34.97.68,3.5,1.8,3.85.84.26,2.91-3.78,4.4-6.94.75-1.58,1.35-2.94,1.57-3.43.41-.89,3.62-6.22,2.85-6.59-.54,1.31-1.79,2.39-2.6,3.56Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M18.41,51.49c-.12-3.59.44-8.35-1.34-11.5-3.03,1.24-3.9,8.47-4.9,11.23-1.28,3.51-3.55,6.38-5.58,9.41,3.15-2.53,6.88-5.89,9.8-4.37,2.28,1.18,2.36,4.14,3.06,6.52-.31-3.77-.91-7.56-1.03-11.28Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            fill: "#eae6e3",
            d: "M46.64,91.89c-.66-3.63-.59-7.21-1.03-10.85-.19-1.57-.19-4.94-1.25-6.18-1.61-1.89-2.74.99-3.54,2.56-1.64,3.22-4.06,5.99-6.03,9.03-1.44,2.22-2.45,4.71-3.91,6.92-.42.64-.93,1.22-1.44,1.8.74-.11,1.58-.4,2.54-.9,2.06-1.07,4.03-2.74,6.27-3.38,4.32-1.24,6.27.99,7.84,4.43.49,1.07,1.07,2.14,1.73,3.02-.37-2.19-.8-4.37-1.18-6.45Z"
          }
        )
      ] })
    ] })
  }
), Qr = O.forwardRef(
  ({ children: e, className: o }, r) => {
    const n = L(null), s = L(null), [i, l] = G(20), [a, c] = G(0), [d, u] = G(!1), [h, m] = G(!1), [f, y] = G(!1), [g, x] = G(0), w = O.useId(), k = Q(() => {
      if (!n.current || !s.current) return;
      const { scrollTop: $, scrollHeight: M, clientHeight: F } = n.current, E = s.current.clientHeight, z = Math.max(
        F / M * E,
        40
        // Minimum height
      ), C = $ / (M - F), N = E - z, B = C * N;
      l(z), c(B), x(Math.round(C * 100)), M - $ - F < 10 ? f || y(!0) : f && y(!1);
    }, [f]);
    return A(() => {
      const $ = n.current;
      if ($) {
        $.addEventListener("scroll", k), k();
        const M = new ResizeObserver(k);
        return M.observe($), () => {
          $.removeEventListener("scroll", k), M.disconnect();
        };
      }
    }, [k]), A(() => {
      const $ = (F) => {
        if (!h || !n.current || !s.current) return;
        F.preventDefault();
        const E = s.current.getBoundingClientRect(), z = E.top, C = E.height, N = F.clientY - z - i / 2, B = Math.max(0, Math.min(1, N / (C - i))), _ = n.current.scrollHeight, Z = n.current.clientHeight;
        n.current.scrollTop = B * (_ - Z);
      }, M = () => {
        m(!1), document.body.style.userSelect = "";
      };
      return h && (window.addEventListener("mousemove", $), window.addEventListener("mouseup", M), document.body.style.userSelect = "none"), () => {
        window.removeEventListener("mousemove", $), window.removeEventListener("mouseup", M);
      };
    }, [h, i]), /* @__PURE__ */ p(
      "div",
      {
        ref: r,
        className: b("relative w-full h-full overflow-hidden rounded-lg transition-all duration-300", o),
        style: {
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "var(--ghost-border)",
          backgroundColor: "var(--ghost-bg-secondary)",
          boxShadow: "0 0 20px rgba(var(--ghost-accent-rgb), 0.3), 0 0 40px rgba(var(--ghost-accent-rgb), 0.15)"
        },
        children: [
          /* @__PURE__ */ t("style", { children: Ur }),
          /* @__PURE__ */ t(
            "div",
            {
              ref: n,
              id: w,
              className: "w-full h-full overflow-y-auto hide-native-scrollbar pr-4 relative z-10",
              children: e
            }
          ),
          /* @__PURE__ */ t(
            "div",
            {
              ref: s,
              className: "absolute top-2 bottom-2 right-1 w-3 rounded-full z-50 transition-colors duration-300",
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.1)"
              },
              onMouseEnter: () => u(!0),
              onMouseLeave: () => !h && u(!1),
              children: /* @__PURE__ */ p(
                "div",
                {
                  role: "scrollbar",
                  "aria-controls": w,
                  "aria-valuenow": g,
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  "aria-label": "Scroll position",
                  tabIndex: 0,
                  className: "absolute w-full rounded-full cursor-pointer transition-all duration-200",
                  style: {
                    height: i,
                    top: a,
                    backgroundColor: d || h ? "var(--ghost-accent)" : "rgba(var(--ghost-accent-rgb), 0.5)"
                  },
                  onMouseDown: ($) => {
                    $.stopPropagation(), m(!0);
                  },
                  children: [
                    /* @__PURE__ */ t(D, { children: (d || h) && /* @__PURE__ */ p(
                      v.div,
                      {
                        initial: { opacity: 0, x: 20, scale: 0.5, rotate: 20 },
                        animate: { opacity: 1, x: -60, scale: 1, rotate: -10 },
                        exit: { opacity: 0, x: 10, scale: 0.5, rotate: 0 },
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                        className: "absolute top-1/2 -translate-y-1/2 pointer-events-none",
                        style: {
                          width: Math.max(i * 0.8, 40),
                          height: Math.max(i * 0.8, 40)
                        },
                        children: [
                          /* @__PURE__ */ t(Kr, {}),
                          /* @__PURE__ */ p(
                            v.div,
                            {
                              initial: { opacity: 0, scale: 0 },
                              animate: { opacity: 1, scale: 1 },
                              transition: { delay: 0.2 },
                              className: "absolute -top-8 -left-8 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap",
                              children: [
                                "Boo! Scrolled ya!",
                                /* @__PURE__ */ t("div", { className: "absolute bottom-0 right-2 w-2 h-2 bg-white rotate-45 translate-y-1" })
                              ]
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ t(
                      "div",
                      {
                        className: b(
                          "absolute inset-0 blur-md rounded-full transition-opacity duration-300",
                          d || h ? "opacity-100" : "opacity-0"
                        ),
                        style: {
                          backgroundColor: "var(--ghost-accent)"
                        }
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ t(D, { children: f && /* @__PURE__ */ t(W, { children: /* @__PURE__ */ t(
            v.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "absolute inset-0 bg-black/60 backdrop-blur-[2px] z-40 pointer-events-none flex flex-col items-center justify-end pb-0",
              children: /* @__PURE__ */ p(
                v.div,
                {
                  initial: { y: "100%", scale: 0 },
                  animate: { y: "10%", scale: 1.5 },
                  exit: { y: "100%", scale: 0, opacity: 0 },
                  transition: { type: "spring", stiffness: 200, damping: 15 },
                  className: "relative",
                  style: {
                    width: n.current ? Math.min(n.current.clientWidth * 0.4, 256) : 256,
                    height: n.current ? Math.min(n.current.clientHeight * 0.4, 256) : 256
                  },
                  children: [
                    /* @__PURE__ */ t(Jr, {}),
                    /* @__PURE__ */ t(
                      v.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.3 },
                        className: "absolute left-1/2 -translate-x-1/2 text-white font-black uppercase tracking-widest whitespace-nowrap",
                        style: {
                          top: n.current ? -Math.min(n.current.clientHeight * 0.05, 40) : -40,
                          fontSize: n.current ? Math.min(n.current.clientWidth * 0.04, 24) : 24,
                          filter: "drop-shadow(0 0 10px var(--ghost-accent)) drop-shadow(0 0 20px var(--ghost-accent))"
                        },
                        children: "The End Is Here"
                      }
                    )
                  ]
                }
              )
            }
          ) }) })
        ]
      }
    );
  }
);
Qr.displayName = "SpookyScrollbar";
const en = {
  spectral: {
    glowBg: "bg-purple-500/30",
    textShadow: "0 0 10px rgba(168, 85, 247, 0.8)"
  },
  blood: {
    glowBg: "bg-red-500/30",
    textShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
  }
}, tn = `
/* Hide default cursor everywhere when this component is active */
body.ghost-cursor-active, body.ghost-cursor-active * {
  cursor: none !important;
}

/* Keyframes for the SVG internals (Blinking) */
@keyframes ghost-blink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

.animate-blink {
  animation: ghost-blink 4s infinite;
  transform-origin: center;
}
`, on = ({ className: e }) => /* @__PURE__ */ p(
  "svg",
  {
    viewBox: "0 0 174.57 164.28",
    className: e,
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("style", { children: ".cls-1{fill:#fff;}.cls-2{fill:#2b2b28;}" }) }),
      /* @__PURE__ */ p("g", { id: "Objects", children: [
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
          }
        ),
        /* @__PURE__ */ p("g", { className: "animate-blink", children: [
          /* @__PURE__ */ t(
            "path",
            {
              className: "cls-2",
              d: "M42.43,23.31c-.36,2.1-1.5,3.78-2.53,3.74s-1.59-1.78-1.23-3.88c.36-2.1,1.5-3.78,2.53-3.74,1.04.04,1.59,1.78,1.23,3.88Z"
            }
          ),
          /* @__PURE__ */ t(
            "path",
            {
              className: "cls-2",
              d: "M54.14,22.78c.36,2.1-1.5,4.06-1.14,4.32-0.99,0.25-2.08-1.27-2.44-3.4-0.36-2.13,0.15-4.06,1.14-4.32,0.99-0.25,2.08,1.27,2.44,3.4Z"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-2",
            d: "M55.18,40.26c1.67,5.63-0.17,11.28-4.12,12.63-3.95,1.34-8.5-2.13-10.17-7.76-1.67-5.63,0.17-11.28,4.12-12.63,3.95-1.34,8.5,2.13,10.17,7.76Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M91.39,40.23s20.26,8.26,34.47,3.98,11.53,19.96-12.92,20.27c-24.44,0.31-21.56-24.24-21.56-24.24Z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M31.75,71.66c-5.18-16.45-12.67-23.61-26.6-28.73-13.94-5.11,2.77-22.88,22.5-8.45,19.73,14.44,6.91,46.09,4.11,37.17Z"
          }
        )
      ] })
    ]
  }
), _t = () => {
  const o = X()?.theme ?? "spectral", r = en[o], n = Ce(-100), s = Ce(-100), i = { damping: 25, stiffness: 300, mass: 0.5 }, l = re(n, i), a = re(s, i), [c, d] = G(!1), [u, h] = G(!1), [m, f] = G([]), y = L(0);
  return A(() => {
    document.body.classList.add("ghost-cursor-active");
    const g = (w) => {
      n.set(w.clientX), s.set(w.clientY);
      const k = w.target, $ = k.tagName === "BUTTON" || k.tagName === "A" || k.closest("button") || k.closest("a") || window.getComputedStyle(k).cursor === "pointer";
      d(!!$);
    }, x = (w) => {
      h(!0);
      const k = Math.random() > 0.5 ? "BOO!" : "POOF!", $ = {
        id: y.current++,
        x: w.clientX,
        y: w.clientY,
        text: k
      };
      f((M) => [...M, $]), setTimeout(() => {
        f((M) => M.filter((F) => F.id !== $.id));
      }, 1e3), setTimeout(() => h(!1), 150);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mousedown", x), () => {
      document.body.classList.remove("ghost-cursor-active"), window.removeEventListener("mousemove", g), window.removeEventListener("mousedown", x);
    };
  }, [n, s]), /* @__PURE__ */ p(W, { children: [
    /* @__PURE__ */ t("style", { children: tn }),
    /* @__PURE__ */ t(
      v.div,
      {
        className: "fixed top-0 left-0 pointer-events-none z-[9999]",
        style: {
          x: l,
          y: a,
          translateX: "-20%",
          // Center offset slightly so the "head" is the pointer
          translateY: "-20%"
        },
        children: /* @__PURE__ */ p(
          v.div,
          {
            animate: {
              scale: u ? 0.8 : c ? 1.2 : 1,
              rotate: u ? -15 : c ? 10 : 0
            },
            transition: { type: "spring", stiffness: 400, damping: 20 },
            className: "relative w-12 h-12",
            children: [
              /* @__PURE__ */ t("div", { className: b("absolute inset-0 blur-xl rounded-full scale-150 animate-pulse", r.glowBg) }),
              /* @__PURE__ */ t(on, { className: "w-full h-full drop-shadow-lg" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ t(D, { children: m.map((g) => /* @__PURE__ */ t(
      v.div,
      {
        initial: { opacity: 1, scale: 0.5, y: 0 },
        animate: { opacity: 0, scale: 1.5, y: -40 },
        exit: { opacity: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "fixed pointer-events-none z-[9998] font-black text-lg text-white tracking-widest",
        style: {
          left: g.x,
          top: g.y,
          textShadow: r.textShadow,
          // Random rotation for variety
          rotate: Math.random() * 30 - 15
        },
        children: g.text
      },
      g.id
    )) })
  ] });
};
_t.displayName = "GhostCursor";
const Jn = _t, rn = {
  spectral: {
    defaultColor: "#FF6F00"
    // Orange accent for spectral theme
  },
  blood: {
    defaultColor: "#ef4444"
    // Red accent for blood theme
  }
}, Ht = ({
  color: e,
  particleCount: o = 3
}) => {
  const [r, n] = G([]), i = X()?.theme ?? "spectral", l = rn[i], a = e ?? l.defaultColor;
  return A(() => {
    let c = 0, d = 0;
    const u = (h) => {
      const m = Date.now();
      if (m - d < 50) return;
      d = m;
      const f = [];
      for (let y = 0; y < o; y++)
        f.push({
          x: h.clientX + (Math.random() - 0.5) * 20,
          y: h.clientY + (Math.random() - 0.5) * 20,
          id: c++,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1
        });
      n((y) => [...y, ...f].slice(-30));
    };
    return window.addEventListener("mousemove", u), () => window.removeEventListener("mousemove", u);
  }, [o]), /* @__PURE__ */ t("div", { className: "pointer-events-none fixed inset-0 z-50", children: /* @__PURE__ */ t(D, { children: r.map((c) => /* @__PURE__ */ t(
    v.div,
    {
      className: "absolute rounded-full",
      style: {
        left: c.x,
        top: c.y,
        width: 4 + Math.random() * 4,
        height: 4 + Math.random() * 4,
        backgroundColor: a,
        boxShadow: `0 0 10px ${a}`
      },
      initial: { opacity: 0.8, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0.2,
        x: c.vx * 50,
        y: c.vy * 50
      },
      exit: { opacity: 0 },
      transition: { duration: 1, ease: "easeOut" },
      onAnimationComplete: () => {
        n((d) => d.filter((u) => u.id !== c.id));
      }
    },
    c.id
  )) }) });
};
Ht.displayName = "WispTrail";
const Qn = Ht, nn = {
  spooky: {
    colors: {
      primary: "#22C55E",
      // slime green
      secondary: "#A855F7",
      // spectral purple
      tertiary: "#991B1B"
      // blood red
    },
    glowSize: 300,
    glowOpacity: 0.15,
    distortionIntensity: 0.8
  },
  minimal: {
    colors: {
      primary: "#6366F1",
      secondary: "#8B5CF6",
      tertiary: "#A855F7"
    },
    glowSize: 200,
    glowOpacity: 0.08,
    distortionIntensity: 0.3
  },
  intense: {
    colors: {
      primary: "#EF4444",
      secondary: "#F97316",
      tertiary: "#FBBF24"
    },
    glowSize: 400,
    glowOpacity: 0.25,
    distortionIntensity: 1
  }
}, me = {
  theme: "spooky",
  intensity: 1,
  effects: {
    glow: !0,
    distortion: !0,
    waves: !0,
    attraction: !0,
    particles: !0
  },
  disableOnMobile: !0,
  proximityRadius: 150,
  maxWaves: 5,
  colorTransitionZones: "vertical"
};
function sn(e, o) {
  const r = o.timestamp - e.timestamp;
  if (r === 0)
    return { x: 0, y: 0, magnitude: 0 };
  const n = 16.67, s = (o.x - e.x) / r * n, i = (o.y - e.y) / r * n, l = Math.sqrt(s * s + i * i);
  return { x: s, y: i, magnitude: l };
}
function an({ onStateChange: e, throttleMs: o = 16.67 }) {
  const [r, n] = G({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, magnitude: 0 },
    isMoving: !1,
    isClicking: !1
  }), s = L({
    x: 0,
    y: 0,
    timestamp: Date.now()
  }), i = L(Date.now()), l = L(!1), a = L(e);
  return A(() => {
    a.current = e;
  }, [e]), A(() => {
    a.current(r);
  }, [r]), A(() => {
    const c = (h) => {
      const m = Date.now();
      if (m - i.current < o)
        return;
      const f = {
        x: h.clientX,
        y: h.clientY,
        timestamp: m
      }, y = sn(s.current, f), g = {
        position: { x: f.x, y: f.y },
        velocity: y,
        isMoving: y.magnitude > 0.5,
        // Consider moving if velocity > 0.5 pixels/frame
        isClicking: l.current
      };
      n(g), s.current = f, i.current = m;
    }, d = () => {
      l.current = !0, n((h) => ({ ...h, isClicking: !0 }));
    }, u = () => {
      l.current = !1, n((h) => ({ ...h, isClicking: !1 }));
    };
    return window.addEventListener("mousemove", c), window.addEventListener("mousedown", d), window.addEventListener("mouseup", u), () => {
      window.removeEventListener("mousemove", c), window.removeEventListener("mousedown", d), window.removeEventListener("mouseup", u);
    };
  }, [o]), null;
}
function Wt(e) {
  const o = e || "spooky";
  return typeof o == "string" ? nn[o] : o;
}
function ln(e, o, r = typeof window < "u" ? window.innerHeight : 1e3) {
  const n = Wt(o.theme), s = o.colorTransitionZones || "vertical";
  let i;
  if (s === "vertical")
    i = cn(e.y, r, n);
  else if (s === "horizontal") {
    const l = typeof window < "u" ? window.innerWidth : 1e3;
    i = dn(e.x, l, n);
  } else if (s === "radial") {
    const l = typeof window < "u" ? window.innerWidth : 1e3;
    i = un(e, l, r, n);
  } else
    i = n.colors.primary;
  return {
    ...n,
    colors: {
      ...n.colors,
      primary: i
    }
  };
}
function cn(e, o, r) {
  const n = e / o;
  return n < 0.33 ? r.colors.primary : n < 0.66 ? r.colors.secondary : r.colors.tertiary;
}
function dn(e, o, r) {
  const n = e / o;
  return n < 0.33 ? r.colors.primary : n < 0.66 ? r.colors.secondary : r.colors.tertiary;
}
function un(e, o, r, n) {
  const s = o / 2, i = r / 2, l = Math.sqrt(s * s + i * i), a = e.x - s, c = e.y - i, u = Math.sqrt(a * a + c * c) / l;
  return u < 0.33 ? n.colors.primary : u < 0.66 ? n.colors.secondary : n.colors.tertiary;
}
function Zt() {
  if (typeof CSS > "u" || typeof CSS.supports != "function")
    return !1;
  try {
    return CSS.supports("filter", "blur(10px)");
  } catch {
    return !1;
  }
}
function jt() {
  if (typeof document > "u")
    return !1;
  try {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg"), o = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    return e && o && typeof o.setAttribute == "function";
  } catch {
    return !1;
  }
}
function Yt() {
  if (typeof CSS > "u" || typeof CSS.supports != "function")
    return !1;
  try {
    return CSS.supports("mix-blend-mode", "screen");
  } catch {
    return !1;
  }
}
function pn() {
  return typeof requestAnimationFrame < "u";
}
function hn() {
  if (typeof window > "u")
    return !1;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function mn(e, o, r) {
  return Math.max(o, Math.min(r, e));
}
function Ge(e, o = 1) {
  return e == null ? o : typeof e != "number" || isNaN(e) ? (console.warn("[CursorEffect] Invalid intensity value, using default:", o), o) : mn(e, 0, 1);
}
function ct(e, o = 150) {
  return e == null ? o : typeof e != "number" || isNaN(e) || e < 0 ? (console.warn("[CursorEffect] Invalid proximity radius, using default:", o), o) : e;
}
function Oe(e) {
  return e ? document.body.contains(e) : !1;
}
function fn(e) {
  return e.width > 0 && e.height > 0;
}
function gn(e) {
  if (!e || !Oe(e))
    return new DOMRect(0, 0, 0, 0);
  try {
    return e.getBoundingClientRect();
  } catch (o) {
    return console.warn("[CursorEffect] Error getting element bounds:", o), new DOMRect(0, 0, 0, 0);
  }
}
function bn() {
  const e = Zt(), o = jt(), r = Yt(), n = pn();
  return {
    cssFilters: e,
    svgFilters: o,
    blendModes: r,
    raf: n,
    // Distortion requires either CSS or SVG filters
    canUseDistortion: e || o,
    // Glow requires blend modes for best effect, but can work without
    canUseGlow: !0
    // Always available, just less ethereal without blend modes
  };
}
const Me = 20;
function yn(e, o) {
  const r = o.x - e.x, n = o.y - e.y;
  return Math.sqrt(r * r + n * n);
}
function fe(e) {
  return {
    x: e.left + e.width / 2,
    y: e.top + e.height / 2
  };
}
function xn(e, o, r) {
  const n = gn(e.ref.current);
  if (!fn(n))
    return {
      ...e,
      bounds: n,
      distance: 1 / 0,
      isInProximity: !1,
      isHovered: !1
    };
  const s = fe(n), i = yn(o, s), l = i <= r, a = o.x >= n.left && o.x <= n.right && o.y >= n.top && o.y <= n.bottom;
  return {
    ...e,
    bounds: n,
    distance: i,
    isInProximity: l,
    isHovered: a
  };
}
function vn(e, o, r, n) {
  const s = /* @__PURE__ */ new Map();
  let i;
  if (n && e.size > Me) {
    const l = Math.max(
      r,
      ...Array.from(e.values()).map((a) => a.options.proximityRadius ?? r)
    );
    i = n.getNearbyElements(
      o.x,
      o.y,
      l
    );
  } else
    i = new Set(e.keys());
  return e.forEach((l, a) => {
    if (!l.ref.current) {
      s.set(a, l);
      return;
    }
    if (n && e.size > Me && !i.has(a)) {
      s.set(a, {
        ...l,
        distance: 1 / 0,
        isInProximity: !1,
        isHovered: !1
      });
      return;
    }
    const c = l.options.proximityRadius ?? r, d = xn(
      l,
      o,
      c
    );
    s.set(a, d);
  }), s;
}
function wn(e, o) {
  o.forEach((r, n) => {
    const s = e.get(n);
    s && (!s.isInProximity && r.isInProximity && r.options.onProximityEnter?.(), s.isInProximity && !r.isInProximity && r.options.onProximityExit?.(), !s.isHovered && r.isHovered && r.options.onHover?.());
  });
}
class kn {
  cellSize;
  cells;
  /**
   * Create a new spatial grid
   * @param cellSize Size of each grid cell in pixels (default: 200)
   */
  constructor(o = 200) {
    this.cellSize = o, this.cells = /* @__PURE__ */ new Map();
  }
  /**
   * Get the cell key for a given position
   * @param x X coordinate
   * @param y Y coordinate
   * @returns Cell key as "cellX,cellY"
   */
  getCellKey(o, r) {
    const n = Math.floor(o / this.cellSize), s = Math.floor(r / this.cellSize);
    return `${n},${s}`;
  }
  /**
   * Get all element IDs in cells near the given position
   * @param x X coordinate
   * @param y Y coordinate
   * @param radius Search radius in pixels
   * @returns Set of element IDs in nearby cells
   */
  getNearbyElements(o, r, n) {
    const s = /* @__PURE__ */ new Set(), i = Math.ceil(n / this.cellSize), l = Math.floor(o / this.cellSize), a = Math.floor(r / this.cellSize);
    for (let c = -i; c <= i; c++)
      for (let d = -i; d <= i; d++) {
        const u = l + c, h = a + d, m = `${u},${h}`, f = this.cells.get(m);
        f && f.forEach((y) => s.add(y));
      }
    return s;
  }
  /**
   * Add an element to the grid
   * @param id Element ID
   * @param element Registered element with bounds
   */
  addElement(o, r) {
    const n = fe(r.bounds), s = this.getCellKey(n.x, n.y);
    this.cells.has(s) || this.cells.set(s, /* @__PURE__ */ new Set()), this.cells.get(s).add(o);
  }
  /**
   * Remove an element from the grid
   * @param id Element ID
   * @param element Registered element with bounds (optional, for optimization)
   */
  removeElement(o, r) {
    if (r) {
      const n = fe(r.bounds), s = this.getCellKey(n.x, n.y), i = this.cells.get(s);
      i && (i.delete(o), i.size === 0 && this.cells.delete(s));
    } else
      this.cells.forEach((n, s) => {
        n.delete(o), n.size === 0 && this.cells.delete(s);
      });
  }
  /**
   * Update an element's position in the grid
   * Removes from old cell and adds to new cell if position changed
   * @param id Element ID
   * @param oldElement Previous element state
   * @param newElement New element state
   */
  updateElement(o, r, n) {
    const s = fe(r.bounds), i = fe(n.bounds), l = this.getCellKey(s.x, s.y), a = this.getCellKey(i.x, i.y);
    if (l !== a) {
      const c = this.cells.get(l);
      c && (c.delete(o), c.size === 0 && this.cells.delete(l)), this.cells.has(a) || this.cells.set(a, /* @__PURE__ */ new Set()), this.cells.get(a).add(o);
    }
  }
  /**
   * Clear all elements from the grid
   */
  clear() {
    this.cells.clear();
  }
  /**
   * Get the total number of elements in the grid
   */
  getElementCount() {
    let o = 0;
    return this.cells.forEach((r) => {
      o += r.size;
    }), o;
  }
  /**
   * Rebuild the entire grid from a map of elements
   * @param elements Map of registered elements
   */
  rebuild(o) {
    this.clear(), o.forEach((r, n) => {
      r.bounds.width === 0 || r.bounds.height === 0 || this.addElement(n, r);
    });
  }
}
function Cn(e) {
  const o = Array.from(e.values()).filter((l) => l.isHovered);
  if (o.length === 0)
    return { sizeMultiplier: 1, opacityMultiplier: 1 };
  const r = {
    button: 5,
    draggable: 4,
    link: 3,
    card: 1,
    custom: 2
  }, s = o.reduce((l, a) => {
    const c = a.options.type || "custom", d = l.options.type || "custom", u = r[c] || 0, h = r[d] || 0;
    return u > h ? a : l;
  }).options.type || "custom";
  return {
    button: { sizeMultiplier: 1.3, opacityMultiplier: 1.5 },
    // Intensified for buttons
    draggable: { sizeMultiplier: 1.2, opacityMultiplier: 1.3 },
    // Strong for draggables
    link: { sizeMultiplier: 1.1, opacityMultiplier: 1.2 },
    // Moderate for links
    card: { sizeMultiplier: 0.9, opacityMultiplier: 0.8 },
    // Subtle for cards
    custom: { sizeMultiplier: 1, opacityMultiplier: 1 }
    // Default
  }[s] || { sizeMultiplier: 1, opacityMultiplier: 1 };
}
function Nn({ cursorState: e, config: o }) {
  const { currentTheme: r, position: n, velocity: s, isMoving: i, activeElements: l } = e, { intensity: a } = o, c = ce(() => Yt(), []), { sizeMultiplier: d, opacityMultiplier: u } = Cn(l), h = r.glowSize * a * d, m = r.glowOpacity * a * u * (c ? 1 : 0.5), f = !i, g = Math.sqrt(s.x * s.x + s.y * s.y) > 10, x = g ? 1.2 : 1, w = g ? m * 1.3 : m;
  return /* @__PURE__ */ t(
    v.div,
    {
      className: "cursor-glow",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        width: h,
        height: h,
        borderRadius: "50%",
        backgroundColor: r.colors.primary,
        filter: "blur(60px)",
        // Use blend mode if supported, otherwise fall back to normal
        mixBlendMode: c ? "screen" : "normal",
        pointerEvents: "none",
        willChange: "transform, opacity"
      },
      animate: {
        // Position the glow centered on cursor
        x: n.x - h / 2,
        y: n.y - h / 2,
        // Apply current theme color
        backgroundColor: r.colors.primary,
        // Scale effect: pulse when stationary, trail when high velocity
        scale: f ? [1, 1.1, 1] : g ? x : 1,
        // Normal size when moving normally
        // Opacity effect: pulse when stationary, intensify for trail
        opacity: f ? [m, m * 1.5, m] : g ? w : m
        // Normal opacity
      },
      transition: {
        // Smooth spring physics for position
        x: { type: "spring", damping: 30, stiffness: 200, mass: 0.5 },
        y: { type: "spring", damping: 30, stiffness: 200, mass: 0.5 },
        // Smooth color transitions
        backgroundColor: { duration: 0.8 },
        // Pulsing animation when stationary (infinite loop)
        scale: {
          duration: f ? 2 : 0.3,
          repeat: f ? 1 / 0 : 0,
          ease: "easeInOut"
        },
        opacity: {
          duration: f ? 2 : 0.3,
          repeat: f ? 1 / 0 : 0,
          ease: "easeInOut"
        }
      }
    }
  );
}
function Mn(e, o) {
  const r = e.options.type || "custom", s = {
    button: 1.5,
    // Intensified for buttons
    draggable: 1.3,
    // Strong for draggables
    link: 1.2,
    // Moderate for links
    card: 0.6,
    // Subtle for cards
    custom: 1
    // Default
  }[r] || 1, i = e.options.intensity ?? 1;
  return o * s * i;
}
function Sn({ cursorState: e, config: o }) {
  const { activeElements: r, position: n, currentTheme: s } = e, { intensity: i } = o, l = ce(() => jt(), []), a = ce(() => Zt(), []), c = l || a, [d, u] = G(n);
  A(() => {
    const f = setTimeout(() => {
      u(n);
    }, 50);
    return () => clearTimeout(f);
  }, [n]);
  const h = s.distortionIntensity * i, m = Array.from(r.values()).filter(
    (f) => f.isHovered && f.options.distortion !== !1
  );
  return c ? /* @__PURE__ */ p(W, { children: [
    l && /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", "aria-hidden": "true", children: /* @__PURE__ */ p("defs", { children: [
      /* @__PURE__ */ p("filter", { id: "cursor-distortion", children: [
        /* @__PURE__ */ t(
          "feTurbulence",
          {
            type: "fractalNoise",
            baseFrequency: "0.01",
            numOctaves: "3",
            result: "noise"
          }
        ),
        /* @__PURE__ */ t(
          "feDisplacementMap",
          {
            in: "SourceGraphic",
            in2: "noise",
            scale: "20",
            xChannelSelector: "R",
            yChannelSelector: "G"
          }
        ),
        /* @__PURE__ */ t("feGaussianBlur", { stdDeviation: "2" })
      ] }),
      /* @__PURE__ */ p("filter", { id: "cursor-wave", children: [
        /* @__PURE__ */ t(
          "feTurbulence",
          {
            type: "turbulence",
            baseFrequency: "0.02",
            numOctaves: "2",
            result: "turbulence"
          }
        ),
        /* @__PURE__ */ t(
          "feDisplacementMap",
          {
            in: "SourceGraphic",
            in2: "turbulence",
            scale: "15",
            xChannelSelector: "R",
            yChannelSelector: "G"
          }
        )
      ] }),
      /* @__PURE__ */ p("filter", { id: "cursor-goo", children: [
        /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
        /* @__PURE__ */ t(
          "feColorMatrix",
          {
            in: "blur",
            mode: "matrix",
            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8",
            result: "goo"
          }
        ),
        /* @__PURE__ */ t("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
      ] })
    ] }) }),
    /* @__PURE__ */ t(D, { children: m.map((f) => {
      const y = Mn(
        f,
        h
      ), g = d.x - f.bounds.left, x = d.y - f.bounds.top, w = f.options.type === "card" ? "cursor-wave" : "cursor-distortion", k = l ? `url(#${w})` : a ? "blur(2px)" : "none";
      return /* @__PURE__ */ t(
        v.div,
        {
          className: "distortion-overlay",
          "aria-hidden": "true",
          style: {
            position: "absolute",
            left: f.bounds.left,
            top: f.bounds.top,
            width: f.bounds.width,
            height: f.bounds.height,
            filter: k,
            pointerEvents: "none",
            willChange: "opacity",
            // Add gradient overlay for visual effect
            background: `radial-gradient(circle at ${g}px ${x}px, ${s.colors.primary}20, transparent 60%)`
          },
          initial: { opacity: 0 },
          animate: { opacity: y },
          exit: { opacity: 0 },
          transition: {
            opacity: {
              duration: 0.4,
              // 400ms fade-out (within 300-500ms requirement)
              ease: "easeOut"
            }
          }
        },
        f.id
      );
    }) })
  ] }) : null;
}
function In(e, o) {
  if (!o.bounds || o.bounds.width === 0 || o.bounds.height === 0)
    return !1;
  const r = o.bounds.left + o.bounds.width / 2, n = o.bounds.top + o.bounds.height / 2, s = r - e.origin.x, i = n - e.origin.y, l = Math.sqrt(s * s + i * i), a = Math.sqrt(
    (o.bounds.width / 2) ** 2 + (o.bounds.height / 2) ** 2
  ), c = Math.max(0, l - a), d = l + a;
  return e.radius >= c && e.radius <= d;
}
class En {
  collisions = /* @__PURE__ */ new Map();
  // waveId -> Set of elementIds
  /**
   * Check if a wave has already collided with an element
   */
  hasCollided(o, r) {
    const n = this.collisions.get(o);
    return n ? n.has(r) : !1;
  }
  /**
   * Record a collision between a wave and an element
   */
  recordCollision(o, r) {
    this.collisions.has(o) || this.collisions.set(o, /* @__PURE__ */ new Set()), this.collisions.get(o).add(r);
  }
  /**
   * Remove tracking data for a wave that has been cleaned up
   */
  cleanupWave(o) {
    this.collisions.delete(o);
  }
  /**
   * Clear all collision tracking data
   */
  clear() {
    this.collisions.clear();
  }
}
const Tn = ({ cursorState: e, config: o }) => {
  const [r, n] = G([]), [s, i] = G(/* @__PURE__ */ new Map());
  L(0);
  const l = L(null), a = L(new En());
  return A(() => {
    const c = (d) => {
      const u = {
        id: `wave-${Date.now()}-${Math.random()}`,
        origin: { x: d.clientX, y: d.clientY },
        radius: 0,
        maxRadius: 500,
        opacity: 0.6,
        timestamp: Date.now(),
        color: e.currentTheme.colors.primary
      };
      n((h) => [...h, u].slice(-o.maxWaves));
    };
    return window.addEventListener("click", c), () => window.removeEventListener("click", c);
  }, [e.currentTheme.colors.primary, o.maxWaves]), A(() => {
    const c = () => {
      const d = Date.now();
      n((u) => {
        const h = u.map((f) => {
          const y = f.radius + 5, g = f.opacity * 0.98;
          return {
            ...f,
            radius: y,
            opacity: g
          };
        }).filter((f) => {
          const y = f.radius < f.maxRadius && f.opacity > 0.01;
          return y || a.current.cleanupWave(f.id), y;
        }), m = /* @__PURE__ */ new Map();
        for (const f of h)
          for (const [y, g] of e.activeElements)
            if (In(f, g) && !a.current.hasCollided(f.id, y)) {
              a.current.recordCollision(f.id, y);
              const x = m.get(y), w = f.opacity;
              x ? m.set(y, {
                elementId: y,
                intensity: Math.min(1, x.intensity + w),
                timestamp: d
              }) : m.set(y, {
                elementId: y,
                intensity: w,
                timestamp: d
              });
            }
        return i(m), h;
      }), l.current = requestAnimationFrame(c);
    };
    return l.current = requestAnimationFrame(c), () => {
      l.current !== null && cancelAnimationFrame(l.current);
    };
  }, [e.activeElements]), /* @__PURE__ */ p(W, { children: [
    r.map((c) => /* @__PURE__ */ t(
      "div",
      {
        className: "wave-ring",
        "aria-hidden": "true",
        style: {
          position: "absolute",
          left: c.origin.x - c.radius,
          top: c.origin.y - c.radius,
          width: c.radius * 2,
          height: c.radius * 2,
          borderRadius: "50%",
          border: `2px solid ${c.color}`,
          opacity: c.opacity,
          pointerEvents: "none",
          boxSizing: "border-box"
        }
      },
      c.id
    )),
    Array.from(s.values()).map((c) => {
      const d = e.activeElements.get(c.elementId);
      return !d || !d.bounds ? null : /* @__PURE__ */ t(
        v.div,
        {
          className: "wave-collision-effect",
          "aria-hidden": "true",
          style: {
            position: "absolute",
            left: d.bounds.left,
            top: d.bounds.top,
            width: d.bounds.width,
            height: d.bounds.height,
            pointerEvents: "none",
            borderRadius: "4px",
            border: `2px solid ${e.currentTheme.colors.primary}`,
            boxShadow: `0 0 ${20 * c.intensity}px ${e.currentTheme.colors.primary}`
          },
          initial: {
            opacity: c.intensity * 0.8,
            scale: 0.95
          },
          animate: {
            opacity: 0,
            scale: 1.05
          },
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        },
        `collision-${c.elementId}-${c.timestamp}`
      );
    })
  ] });
};
function $n(e, o, r, n) {
  const s = Math.random() * Math.PI * 2, i = 2 + Math.random() * 3;
  return {
    id: `particle-${Date.now()}-${Math.random()}`,
    x: e,
    y: o,
    vx: Math.cos(s) * i + n.x * 0.1,
    vy: Math.sin(s) * i + n.y * 0.1,
    life: 1,
    maxLife: 0.5 + Math.random() * 0.5,
    // 0.5-1.0 seconds
    size: 2 + Math.random() * 3,
    // 2-5 pixels
    color: r
  };
}
function zn({ cursorState: e, config: o }) {
  const { activeElements: r, position: n, velocity: s, currentTheme: i } = e, [l, a] = G([]), c = L(0), d = L(), h = Array.from(r.values()).filter(
    (m) => m.isHovered && m.options.type === "link"
  ).length > 0;
  return A(() => {
    if (!h) return;
    const m = Date.now();
    if (m - c.current > 50) {
      const y = $n(
        n.x,
        n.y,
        i.colors.primary,
        s
      );
      a((g) => [...g, y]), c.current = m;
    }
  }, [h, n, s, i]), A(() => {
    const m = () => {
      a((f) => f.map((y) => {
        const g = y.x + y.vx, x = y.y + y.vy, w = y.life - 1 / 60 / y.maxLife, k = y.vy + 0.1;
        return {
          ...y,
          x: g,
          y: x,
          vy: k,
          life: w
        };
      }).filter((y) => y.life > 0)), d.current = requestAnimationFrame(m);
    };
    return d.current = requestAnimationFrame(m), () => {
      d.current && cancelAnimationFrame(d.current);
    };
  }, []), A(() => {
    l.length > 100 && a((m) => m.slice(-100));
  }, [l.length]), /* @__PURE__ */ t("div", { className: "particle-system", "aria-hidden": "true", style: { pointerEvents: "none" }, children: /* @__PURE__ */ t(D, { children: l.map((m) => /* @__PURE__ */ t(
    v.div,
    {
      className: "particle",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: m.x,
        top: m.y,
        width: m.size,
        height: m.size,
        borderRadius: "50%",
        backgroundColor: m.color,
        pointerEvents: "none",
        willChange: "opacity"
      },
      initial: { opacity: 1 },
      animate: { opacity: m.life },
      exit: { opacity: 0 },
      transition: { duration: 0.1 }
    },
    m.id
  )) }) });
}
const Rn = 50;
function Gn(e, o, r, n, s = "attract", i = 0.5) {
  if (s === "none" || r > n)
    return { x: 0, y: 0 };
  const l = Math.max(0, Math.min(1, i));
  if (l === 0)
    return { x: 0, y: 0 };
  const a = o.x - e.x, c = o.y - e.y;
  if (r === 0)
    return { x: 0, y: 0 };
  const d = a / r, u = c / r, f = (n - r) / n * l * Rn, y = s === "repel" ? -1 : 1;
  return {
    x: d * f * y,
    y: u * f * y
  };
}
function An(e, o, r) {
  const n = {
    x: e.bounds.left + e.bounds.width / 2,
    y: e.bounds.top + e.bounds.height / 2
  }, s = e.options.proximityRadius ?? r, i = e.options.attraction ?? "none", l = e.options.attractionStrength ?? 0.5;
  return Gn(
    n,
    o,
    e.distance,
    s,
    i,
    l
  );
}
function Bn(e, o, r) {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    if (!s.options.attraction || s.options.attraction === "none") {
      n.set(i, { x: 0, y: 0 });
      return;
    }
    const l = An(
      s,
      o,
      r
    );
    n.set(i, l);
  }), n;
}
function Fn(e) {
  return {
    button: 1.5,
    // Intensified for buttons
    draggable: 1.3,
    // Strong for draggables
    link: 1,
    // Normal for links
    card: 0.7,
    // Subtle for cards
    custom: 1
    // Default
  }[e || "custom"] || 1;
}
function On({ cursorState: e, config: o }) {
  const { activeElements: r, position: n } = e;
  return A(() => o.effects.attraction ? (Bn(
    r,
    n,
    o.proximityRadius
  ).forEach((i, l) => {
    const a = r.get(l);
    if (!a || !a.ref.current)
      return;
    if (!isFinite(i.x) || !isFinite(i.y)) {
      console.warn("[CursorEffect] Invalid displacement values for element:", l);
      return;
    }
    const c = Fn(a.options.type), d = i.x * c, u = i.y * c;
    try {
      a.ref.current.style.transform = `translate(${d}px, ${u}px)`, a.ref.current.style.transition = "transform 0.2s ease-out", a.options.type === "draggable" && a.isInProximity ? a.ref.current.style.cursor = "grab" : a.options.type === "draggable" && a.isHovered ? a.ref.current.style.cursor = "grabbing" : a.options.type === "draggable" && (a.ref.current.style.cursor = "");
    } catch (h) {
      console.warn("[CursorEffect] Error applying transform to element:", l, h);
    }
  }), () => {
    r.forEach((i) => {
      if (i.ref.current)
        try {
          i.ref.current.style.transform = "", i.ref.current.style.transition = "", i.options.type === "draggable" && (i.ref.current.style.cursor = "");
        } catch {
        }
    });
  }) : void 0, [r, n, o.effects.attraction, o.proximityRadius]), typeof document > "u" ? null : to.createPortal(
    /* @__PURE__ */ p(
      "div",
      {
        className: "cursor-effects-layer",
        style: {
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          overflow: "hidden",
          // CSS containment for performance optimization
          contain: "layout style paint"
        },
        "aria-hidden": "true",
        children: [
          o.effects.glow && /* @__PURE__ */ t(Nn, { cursorState: e, config: o }),
          o.effects.distortion && /* @__PURE__ */ t(Sn, { cursorState: e, config: o }),
          o.effects.waves && /* @__PURE__ */ t(Tn, { cursorState: e, config: o }),
          o.effects.particles && /* @__PURE__ */ t(zn, { cursorState: e, config: o })
        ]
      }
    ),
    document.body
  );
}
const Vt = Le(null);
function Ln() {
  const e = Se(Vt);
  if (!e)
    throw new Error("useCursorContext must be used within CursorEffectProvider");
  return e;
}
function Xt() {
  if (typeof window > "u")
    return { hasTouch: !1, hasMouse: !0 };
  const e = "ontouchstart" in window || navigator.maxTouchPoints > 0, o = window.matchMedia("(pointer: fine)").matches;
  return { hasTouch: e, hasMouse: o };
}
function dt(e) {
  const { hasTouch: o, hasMouse: r } = Xt();
  return !(hn() || e.disableOnMobile && o || o && !r);
}
function es({ config: e = {}, children: o }) {
  const r = L(bn()), n = {
    ...me,
    ...e,
    // Validate and clamp intensity to 0-1 range for error handling
    intensity: Ge(e.intensity, me.intensity),
    // Validate proximity radius
    proximityRadius: ct(e.proximityRadius, me.proximityRadius),
    effects: {
      ...me.effects,
      ...e.effects,
      // Disable distortion if browser doesn't support filters
      distortion: (e.effects?.distortion ?? me.effects.distortion) && r.current.canUseDistortion
    }
  }, [s, i] = G(
    () => dt(n)
  ), l = Wt(n.theme), [a, c] = G({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, magnitude: 0 },
    isMoving: !1,
    isClicking: !1,
    currentTheme: l,
    activeElements: /* @__PURE__ */ new Map()
  }), d = L(!1), u = L(new kn()), h = Q((g) => {
    c((x) => {
      const w = ln(
        g.position,
        n
      ), k = vn(
        x.activeElements,
        g.position,
        n.proximityRadius,
        x.activeElements.size > Me ? u.current : void 0
      );
      return wn(x.activeElements, k), {
        ...x,
        position: g.position,
        velocity: g.velocity,
        isMoving: g.isMoving,
        isClicking: g.isClicking,
        currentTheme: w,
        activeElements: k
      };
    });
  }, [n]), m = Q(
    (g, x, w) => {
      if (!x.current) {
        console.warn("[CursorEffect] Attempted to register element with null ref:", g);
        return;
      }
      if (!Oe(x.current)) {
        console.warn("[CursorEffect] Attempted to register detached element:", g);
        return;
      }
      c((k) => {
        const $ = new Map(k.activeElements), M = x.current?.getBoundingClientRect() || new DOMRect(), F = {
          ...w,
          intensity: w.intensity !== void 0 ? Ge(w.intensity, 1) : void 0,
          proximityRadius: w.proximityRadius !== void 0 ? ct(w.proximityRadius, n.proximityRadius) : void 0,
          attractionStrength: w.attractionStrength !== void 0 ? Ge(w.attractionStrength, 0.5) : void 0
        }, E = {
          id: g,
          ref: x,
          options: F,
          bounds: M,
          distance: 1 / 0,
          isInProximity: !1,
          isHovered: !1
        };
        return $.set(g, E), M.width > 0 && M.height > 0 && u.current.addElement(g, E), {
          ...k,
          activeElements: $
        };
      });
    },
    [n.proximityRadius]
  ), f = Q((g) => {
    c((x) => {
      const w = x.activeElements.get(g), k = new Map(x.activeElements);
      return k.delete(g), w && u.current.removeElement(g, w), {
        ...x,
        activeElements: k
      };
    });
  }, []);
  A(() => {
    const g = window.matchMedia("(prefers-reduced-motion: reduce)"), x = (w) => {
      w.matches ? i(!1) : i(dt(n));
    };
    if (g.addEventListener)
      return g.addEventListener("change", x), () => {
        g.removeEventListener("change", x);
      };
    if (g.addListener)
      return g.addListener(x), () => {
        g.removeListener(x);
      };
  }, [n]), A(() => {
    if (!s) return;
    const { hasTouch: g, hasMouse: x } = Xt();
    if (g && x && !d.current) {
      const w = () => {
        d.current = !0, i(!0);
      };
      return window.addEventListener("mousemove", w, { once: !0 }), () => {
        window.removeEventListener("mousemove", w);
      };
    }
  }, [s]), A(() => {
    if (!s || a.activeElements.size <= Me)
      return;
    const g = setInterval(() => {
      u.current.rebuild(a.activeElements);
    }, 1e3);
    return () => {
      clearInterval(g);
    };
  }, [s, a.activeElements]), A(() => {
    if (!s) return;
    const g = setInterval(() => {
      const x = [];
      a.activeElements.forEach((w, k) => {
        (!w.ref.current || !Oe(w.ref.current)) && x.push(k);
      }), x.length > 0 && x.forEach((w) => {
        f(w);
      });
    }, 2e3);
    return () => {
      clearInterval(g);
    };
  }, [s, a.activeElements, f]);
  const y = {
    state: a,
    registerElement: m,
    unregisterElement: f,
    config: n
  };
  return s ? /* @__PURE__ */ p(Vt.Provider, { value: y, children: [
    /* @__PURE__ */ t(an, { onStateChange: h }),
    /* @__PURE__ */ t(On, { cursorState: a, config: n }),
    o
  ] }) : /* @__PURE__ */ t(W, { children: o });
}
function ts(e = {}) {
  const { registerElement: o, unregisterElement: r } = Ln(), n = L(null), s = L(`cursor-element-${Math.random().toString(36).substr(2, 9)}`);
  return A(() => {
    const i = s.current;
    return n.current && o(i, n, e), () => {
      r(i);
    };
  }, [o, r, e]), n;
}
const Dn = {
  blood: {
    name: "Coagulated Blood",
    primary: "#7f1d1d",
    // red-900
    secondary: "#450a0a",
    // red-950
    highlight: "#ffcccc",
    // Pinkish white
    shine: "#cc0000"
    // Deep red shine
  },
  goo: {
    name: "Radioactive Slime",
    primary: "#4d7c0f",
    // lime-700
    secondary: "#365314",
    // lime-950
    highlight: "#ecfccb",
    // lime-100
    shine: "#84cc16"
    // lime-500
  },
  ectoplasm: {
    name: "Spectral Residue",
    primary: "#581c87",
    // purple-900
    secondary: "#3b0764",
    // purple-950
    highlight: "#e9d5ff",
    // purple-200
    shine: "#a855f7"
    // purple-500
  }
}, ut = 65, Pn = ({ config: e, color: o }) => /* @__PURE__ */ t(
  v.div,
  {
    className: "absolute top-0",
    style: {
      width: e.width,
      left: e.left,
      height: "170vh",
      backgroundColor: o,
      transformOrigin: "top",
      borderRadius: e.borderRadius
    },
    initial: { y: "-170vh" },
    animate: { y: "100vh" },
    transition: {
      duration: e.duration,
      ease: [0.45, 0.05, 0.55, 0.95],
      delay: e.delay
    }
  }
), _n = ({
  isNavigating: e,
  variant: o = "blood",
  onComplete: r,
  className: n
}) => {
  const i = `viscous-goo-${ht().replace(/:/g, "")}`, l = Dn[o], a = ce(() => Array.from({ length: ut }).map((c, d) => {
    const u = Math.random() > 0.7, h = u ? 4 + Math.random() * 11 : 0.5 + Math.random() * 2, m = d / ut * 100, f = (Math.random() - 0.5) * (u ? 10 : 18);
    return {
      id: d,
      width: `${h}vw`,
      left: `${Math.max(-15, Math.min(115, m + f))}%`,
      duration: (u ? 2.8 : 2.2) + Math.random() * 1.6,
      delay: Math.random() * 0.4,
      isGlob: u,
      borderRadius: u ? "50%" : "45% 55% 45% 55%"
    };
  }), []);
  return A(() => {
    if (e) {
      document.body.style.overflow = "hidden";
      const c = setTimeout(() => {
        r?.(), document.body.style.overflow = "";
      }, 3800);
      return () => {
        clearTimeout(c), document.body.style.overflow = "";
      };
    }
  }, [e, r]), /* @__PURE__ */ t(D, { children: e && /* @__PURE__ */ p(
    v.div,
    {
      className: b(
        "fixed inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center",
        n
      ),
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: i, colorInterpolationFilters: "sRGB", children: [
          /* @__PURE__ */ t(
            "feTurbulence",
            {
              type: "fractalNoise",
              baseFrequency: "0.01 0.03",
              numOctaves: "3",
              seed: "1",
              result: "noise"
            }
          ),
          /* @__PURE__ */ t(
            "feDisplacementMap",
            {
              in: "SourceGraphic",
              in2: "noise",
              scale: "12",
              xChannelSelector: "R",
              yChannelSelector: "G",
              result: "textured"
            }
          ),
          /* @__PURE__ */ t("feGaussianBlur", { in: "textured", stdDeviation: "12", result: "blur" }),
          /* @__PURE__ */ t(
            "feColorMatrix",
            {
              in: "blur",
              mode: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",
              result: "goo"
            }
          ),
          /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "4", result: "gooBlur" }),
          /* @__PURE__ */ t(
            "feSpecularLighting",
            {
              in: "gooBlur",
              surfaceScale: "8",
              specularConstant: "1.8",
              specularExponent: "16",
              lightingColor: l.highlight,
              result: "specular",
              children: /* @__PURE__ */ t("fePointLight", { x: "-500", y: "-1000", z: "600" })
            }
          ),
          /* @__PURE__ */ t(
            "feSpecularLighting",
            {
              in: "gooBlur",
              surfaceScale: "4",
              specularConstant: "0.8",
              specularExponent: "10",
              lightingColor: l.shine,
              result: "shine",
              children: /* @__PURE__ */ t("fePointLight", { x: "500", y: "1000", z: "400" })
            }
          ),
          /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
          /* @__PURE__ */ t("feComposite", { in: "shine", in2: "goo", operator: "in", result: "shineInGoo" }),
          /* @__PURE__ */ t("feComposite", { in: "specularInGoo", in2: "goo", operator: "over", result: "withHighlight" }),
          /* @__PURE__ */ t("feComposite", { in: "shineInGoo", in2: "withHighlight", operator: "over", result: "final" }),
          /* @__PURE__ */ t("feGaussianBlur", { in: "final", stdDeviation: "0.5" })
        ] }) }) }),
        /* @__PURE__ */ p(
          "div",
          {
            className: "absolute inset-0 w-full h-full",
            style: { filter: `url(#${i})` },
            children: [
              a.map((c) => /* @__PURE__ */ t(Pn, { config: c, color: l.primary }, c.id)),
              /* @__PURE__ */ t(
                v.div,
                {
                  className: "absolute top-0 left-0 right-0 h-[200vh]",
                  style: { backgroundColor: l.primary },
                  initial: { y: "-200%" },
                  animate: { y: "100%" },
                  transition: {
                    duration: 3.5,
                    ease: [0.45, 0.05, 0.55, 0.95],
                    delay: 0.1
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ t(
          v.div,
          {
            className: "absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1 }
          }
        )
      ]
    }
  ) });
}, os = ({
  variant: e = "blood",
  className: o,
  buttonText: r = "Trigger Blood Smear"
}) => {
  const [n, s] = G(!1);
  return /* @__PURE__ */ p(W, { children: [
    /* @__PURE__ */ t(
      _n,
      {
        isNavigating: n,
        variant: e,
        onComplete: () => s(!1)
      }
    ),
    /* @__PURE__ */ t(
      "button",
      {
        onClick: () => {
          n || s(!0);
        },
        disabled: n,
        className: b(
          "px-6 py-3 rounded-lg font-semibold transition-all",
          "bg-red-900 text-white hover:bg-red-800",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          o
        ),
        children: r
      }
    )
  ] });
}, qt = ({
  isActive: e,
  onComplete: o,
  duration: r = 1.2
}) => {
  const n = r * 0.4, s = r * 0.2, i = r * 0.4;
  return /* @__PURE__ */ t(D, { onExitComplete: o, children: e && /* @__PURE__ */ p(
    v.div,
    {
      className: "fixed inset-0 z-50 pointer-events-none overflow-hidden",
      "aria-hidden": "true",
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: i,
        ease: "easeInOut"
      },
      children: [
        Array.from({ length: 8 }).map((l, a) => /* @__PURE__ */ t(
          v.div,
          {
            className: "absolute bottom-0 w-full",
            style: {
              height: "100%",
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
              transformOrigin: "bottom"
            },
            initial: { scaleY: 0, opacity: 0 },
            animate: { scaleY: 1, opacity: 1 },
            transition: {
              duration: n,
              delay: a * 0.05,
              ease: "easeOut"
            }
          },
          a
        )),
        /* @__PURE__ */ t(
          v.div,
          {
            className: "absolute inset-0 bg-black",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: {
              duration: s,
              delay: n,
              ease: "easeInOut"
            }
          }
        )
      ]
    }
  ) });
};
qt.displayName = "ShadowCrawl";
const rs = qt, pt = 40, Hn = ["bg-[#A855F7]"], Wn = ({ index: e, total: o }) => {
  const r = Math.random() > 0.7, s = `${r ? 10 + Math.random() * 15 : 2 + Math.random() * 6}vw`, i = e / o * 100, l = (Math.random() - 0.5) * (r ? 5 : 10), a = `${Math.max(-20, Math.min(120, i + l))}%`, c = Hn[0], d = (r ? 3 : 2) + Math.random() * 1.5, u = Math.random() * 0.5;
  return /* @__PURE__ */ t(
    v.div,
    {
      className: b(
        "absolute top-0 rounded-full opacity-100",
        c
      ),
      style: {
        width: s,
        left: a,
        height: "150vh",
        transformOrigin: "top",
        zIndex: r ? 10 : 20
      },
      initial: { y: "-150vh" },
      animate: { y: "120vh" },
      transition: {
        duration: d,
        ease: r ? [0.45, 0, 0.55, 1] : [0.32, 0, 0.67, 0],
        delay: u
      }
    }
  );
}, Ut = ({ isActive: e, onComplete: o }) => {
  const r = O.useId();
  return A(() => {
    if (e) {
      document.body.style.overflow = "hidden";
      const n = setTimeout(() => {
        o?.(), document.body.style.overflow = "";
      }, 4500);
      return () => clearTimeout(n);
    }
  }, [e, o]), /* @__PURE__ */ t(D, { children: e && /* @__PURE__ */ p(
    v.div,
    {
      className: "fixed inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center",
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
      "data-testid": "spectral-river-overlay",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ p("filter", { id: `spectral-goo-${r}`, colorInterpolationFilters: "sRGB", children: [
          /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
          /* @__PURE__ */ t(
            "feColorMatrix",
            {
              in: "blur",
              mode: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",
              result: "goo"
            }
          ),
          /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "5", result: "gooBlur" }),
          /* @__PURE__ */ t(
            "feSpecularLighting",
            {
              in: "gooBlur",
              surfaceScale: "8",
              specularConstant: "1.2",
              specularExponent: "25",
              lightingColor: "#ffffff",
              result: "specular",
              children: /* @__PURE__ */ t("feDistantLight", { azimuth: "225", elevation: "60" })
            }
          ),
          /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularInGoo" }),
          /* @__PURE__ */ t("feComposite", { in: "specularInGoo", in2: "goo", operator: "over" })
        ] }) }) }),
        /* @__PURE__ */ p(
          "div",
          {
            className: "absolute inset-0 w-full h-full",
            style: { filter: `url(#spectral-goo-${r})` },
            children: [
              Array.from({ length: pt }).map((n, s) => /* @__PURE__ */ t(Wn, { index: s, total: pt }, s)),
              /* @__PURE__ */ t(
                v.div,
                {
                  className: "absolute top-0 left-0 right-0 h-[200vh] bg-[#A855F7]",
                  initial: { y: "-200%" },
                  animate: { y: "100%" },
                  transition: { duration: 3.5, ease: "easeInOut", delay: 0.2 }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ t(
          v.div,
          {
            className: "absolute inset-0 bg-black/20 backdrop-blur-[2px]",
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 0] },
            transition: { duration: 3, times: [0, 0.5, 1] }
          }
        )
      ]
    }
  ) });
};
Ut.displayName = "SpectralRiver";
const ns = Ut;
export {
  Sr as BatIcon,
  os as BloodSmear,
  Nr as CoffinCard,
  es as CursorEffectProvider,
  an as CursorTracker,
  me as DEFAULT_CURSOR_CONFIG,
  Sn as DistortionField,
  On as EffectRenderer,
  Jn as GhostCursor,
  Lr as GhostToastProvider,
  Nn as GlowAura,
  Vo as GooeyButton,
  Jo as GooeyCard,
  xr as GooeyDrawer,
  Zr as GooeyProgressBar,
  Gt as GooeySidebar,
  Br as GooeySidebarDemo,
  Ir as GraveModal,
  ae as HauntedCard,
  zt as HauntedVignette,
  qn as HauntedVignetteDemo,
  kr as MoonlightSwitch,
  nn as PRESET_THEMES,
  zn as ParticleSystem,
  rs as ShadowCrawl,
  q as SkeletonBlock,
  ns as SpectralRiver,
  Pr as SpectralTabs,
  Mr as SpiritInput,
  Fr as SpookyGhostIcon,
  Qr as SpookyScrollbar,
  Kn as SpookySkeleton,
  Ze as SpookyTooltip,
  Uo as ThemeProvider,
  Tn as WaveGenerator,
  Hr as WhisperBox,
  Qn as WispTrail,
  Ln as useCursorContext,
  ts as useCursorEffect,
  Un as useGhostToast,
  Xn as useTheme,
  X as useThemeOptional
};
