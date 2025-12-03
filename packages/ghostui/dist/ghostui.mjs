import { jsxs as h, jsx as t, Fragment as H } from "react/jsx-runtime";
import j, { forwardRef as He, createElement as Oe, useState as R, useId as Ut, isValidElement as gt, cloneElement as Kt, createContext as We, useContext as Ie, useCallback as X, useEffect as A, useRef as F, useLayoutEffect as Jt, useMemo as me, Children as Qt } from "react";
import { motion as v, AnimatePresence as L, useSpring as q, useMotionValue as Me, useMotionTemplate as eo, useTransform as Z } from "framer-motion";
import to, { createPortal as oo } from "react-dom";
function bt(e) {
  var o, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (o = 0; o < s; o++) e[o] && (r = bt(e[o])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Ee() {
  for (var e, o, r = 0, n = "", s = arguments.length; r < s; r++) (e = arguments[r]) && (o = bt(e)) && (n && (n += " "), n += o);
  return n;
}
const ro = (e, o) => {
  const r = new Array(e.length + o.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < o.length; n++)
    r[e.length + n] = o[n];
  return r;
}, no = (e, o) => ({
  classGroupId: e,
  validator: o
}), yt = (e = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: e,
  validators: o,
  classGroupId: r
}), Ne = "-", et = [], so = "arbitrary..", io = (e) => {
  const o = lo(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (a) => {
      if (a.startsWith("[") && a.endsWith("]"))
        return ao(a);
      const l = a.split(Ne), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return xt(l, c, o);
    },
    getConflictingClassGroupIds: (a, l) => {
      if (l) {
        const c = n[a], d = r[a];
        return c ? d ? ro(d, c) : c : d || et;
      }
      return r[a] || et;
    }
  };
}, xt = (e, o, r) => {
  if (e.length - o === 0)
    return r.classGroupId;
  const s = e[o], i = r.nextPart.get(s);
  if (i) {
    const d = xt(e, o + 1, i);
    if (d) return d;
  }
  const a = r.validators;
  if (a === null)
    return;
  const l = o === 0 ? e.join(Ne) : e.slice(o).join(Ne), c = a.length;
  for (let d = 0; d < c; d++) {
    const u = a[d];
    if (u.validator(l))
      return u.classGroupId;
  }
}, ao = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = e.slice(1, -1), r = o.indexOf(":"), n = o.slice(0, r);
  return n ? so + n : void 0;
})(), lo = (e) => {
  const {
    theme: o,
    classGroups: r
  } = e;
  return co(r, o);
}, co = (e, o) => {
  const r = yt();
  for (const n in e) {
    const s = e[n];
    Ze(s, r, n, o);
  }
  return r;
}, Ze = (e, o, r, n) => {
  const s = e.length;
  for (let i = 0; i < s; i++) {
    const a = e[i];
    uo(a, o, r, n);
  }
}, uo = (e, o, r, n) => {
  if (typeof e == "string") {
    po(e, o, r);
    return;
  }
  if (typeof e == "function") {
    mo(e, o, r, n);
    return;
  }
  ho(e, o, r, n);
}, po = (e, o, r) => {
  const n = e === "" ? o : vt(o, e);
  n.classGroupId = r;
}, mo = (e, o, r, n) => {
  if (fo(e)) {
    Ze(e(n), o, r, n);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(no(r, e));
}, ho = (e, o, r, n) => {
  const s = Object.entries(e), i = s.length;
  for (let a = 0; a < i; a++) {
    const [l, c] = s[a];
    Ze(c, vt(o, l), r, n);
  }
}, vt = (e, o) => {
  let r = e;
  const n = o.split(Ne), s = n.length;
  for (let i = 0; i < s; i++) {
    const a = n[i];
    let l = r.nextPart.get(a);
    l || (l = yt(), r.nextPart.set(a, l)), r = l;
  }
  return r;
}, fo = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, go = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  const s = (i, a) => {
    r[i] = a, o++, o > e && (o = 0, n = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let a = r[i];
      if (a !== void 0)
        return a;
      if ((a = n[i]) !== void 0)
        return s(i, a), a;
    },
    set(i, a) {
      i in r ? r[i] = a : s(i, a);
    }
  };
}, Pe = "!", tt = ":", bo = [], ot = (e, o, r, n, s) => ({
  modifiers: e,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: s
}), yo = (e) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = e;
  let n = (s) => {
    const i = [];
    let a = 0, l = 0, c = 0, d;
    const u = s.length;
    for (let m = 0; m < u; m++) {
      const g = s[m];
      if (a === 0 && l === 0) {
        if (g === tt) {
          i.push(s.slice(c, m)), c = m + 1;
          continue;
        }
        if (g === "/") {
          d = m;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? l++ : g === ")" && l--;
    }
    const b = i.length === 0 ? s : s.slice(c);
    let p = b, f = !1;
    b.endsWith(Pe) ? (p = b.slice(0, -1), f = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      b.startsWith(Pe) && (p = b.slice(1), f = !0)
    );
    const y = d && d > c ? d - c : void 0;
    return ot(i, f, p, y);
  };
  if (o) {
    const s = o + tt, i = n;
    n = (a) => a.startsWith(s) ? i(a.slice(s.length)) : ot(bo, !1, a, void 0, !0);
  }
  if (r) {
    const s = n;
    n = (i) => r({
      className: i,
      parseClassName: s
    });
  }
  return n;
}, xo = (e) => {
  const o = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    o.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let s = [];
    for (let i = 0; i < r.length; i++) {
      const a = r[i], l = a[0] === "[", c = o.has(a);
      l || c ? (s.length > 0 && (s.sort(), n.push(...s), s = []), n.push(a)) : s.push(a);
    }
    return s.length > 0 && (s.sort(), n.push(...s)), n;
  };
}, vo = (e) => ({
  cache: go(e.cacheSize),
  parseClassName: yo(e),
  sortModifiers: xo(e),
  ...io(e)
}), wo = /\s+/, ko = (e, o) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: s,
    sortModifiers: i
  } = o, a = [], l = e.trim().split(wo);
  let c = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      isExternal: b,
      modifiers: p,
      hasImportantModifier: f,
      baseClassName: y,
      maybePostfixModifierPosition: m
    } = r(u);
    if (b) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let g = !!m, w = n(g ? y.substring(0, m) : y);
    if (!w) {
      if (!g) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (w = n(y), !w) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      g = !1;
    }
    const x = p.length === 0 ? "" : p.length === 1 ? p[0] : i(p).join(":"), T = f ? x + Pe : x, I = T + w;
    if (a.indexOf(I) > -1)
      continue;
    a.push(I);
    const $ = s(w, g);
    for (let N = 0; N < $.length; ++N) {
      const E = $[N];
      a.push(T + E);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, Co = (...e) => {
  let o = 0, r, n, s = "";
  for (; o < e.length; )
    (r = e[o++]) && (n = wt(r)) && (s && (s += " "), s += n);
  return s;
}, wt = (e) => {
  if (typeof e == "string")
    return e;
  let o, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (o = wt(e[n])) && (r && (r += " "), r += o);
  return r;
}, Mo = (e, ...o) => {
  let r, n, s, i;
  const a = (c) => {
    const d = o.reduce((u, b) => b(u), e());
    return r = vo(d), n = r.cache.get, s = r.cache.set, i = l, l(c);
  }, l = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = ko(c, r);
    return s(c, u), u;
  };
  return i = a, (...c) => i(Co(...c));
}, No = [], O = (e) => {
  const o = (r) => r[e] || No;
  return o.isThemeGetter = !0, o;
}, kt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ct = /^\((?:(\w[\w-]*):)?(.+)\)$/i, So = /^\d+\/\d+$/, Io = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Eo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, zo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, To = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ro = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, se = (e) => So.test(e), G = (e) => !!e && !Number.isNaN(Number(e)), J = (e) => !!e && Number.isInteger(Number(e)), Ae = (e) => e.endsWith("%") && G(e.slice(0, -1)), K = (e) => Io.test(e), Go = () => !0, Ao = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Eo.test(e) && !zo.test(e)
), Mt = () => !1, $o = (e) => To.test(e), Bo = (e) => Ro.test(e), Fo = (e) => !C(e) && !M(e), Lo = (e) => le(e, It, Mt), C = (e) => kt.test(e), ee = (e) => le(e, Et, Ao), $e = (e) => le(e, Ho, G), rt = (e) => le(e, Nt, Mt), Oo = (e) => le(e, St, Bo), ve = (e) => le(e, zt, $o), M = (e) => Ct.test(e), de = (e) => ce(e, Et), Po = (e) => ce(e, Wo), nt = (e) => ce(e, Nt), Do = (e) => ce(e, It), _o = (e) => ce(e, St), we = (e) => ce(e, zt, !0), le = (e, o, r) => {
  const n = kt.exec(e);
  return n ? n[1] ? o(n[1]) : r(n[2]) : !1;
}, ce = (e, o, r = !1) => {
  const n = Ct.exec(e);
  return n ? n[1] ? o(n[1]) : r : !1;
}, Nt = (e) => e === "position" || e === "percentage", St = (e) => e === "image" || e === "url", It = (e) => e === "length" || e === "size" || e === "bg-size", Et = (e) => e === "length", Ho = (e) => e === "number", Wo = (e) => e === "family-name", zt = (e) => e === "shadow", Zo = () => {
  const e = O("color"), o = O("font"), r = O("text"), n = O("font-weight"), s = O("tracking"), i = O("leading"), a = O("breakpoint"), l = O("container"), c = O("spacing"), d = O("radius"), u = O("shadow"), b = O("inset-shadow"), p = O("text-shadow"), f = O("drop-shadow"), y = O("blur"), m = O("perspective"), g = O("aspect"), w = O("ease"), x = O("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], I = () => [
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
  ], $ = () => [...I(), M, C], N = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", "contain", "none"], k = () => [M, C, c], B = () => [se, "full", "auto", ...k()], he = () => [J, "none", "subgrid", M, C], fe = () => ["auto", {
    span: ["full", J, M, C]
  }, J, M, C], re = () => [J, "auto", M, C], Xe = () => ["auto", "min", "max", "fr", M, C], Te = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ne = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], U = () => ["auto", ...k()], Q = () => [se, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], z = () => [e, M, C], qe = () => [...I(), nt, rt, {
    position: [M, C]
  }], Ue = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Ke = () => ["auto", "cover", "contain", Do, Lo, {
    size: [M, C]
  }], Re = () => [Ae, de, ee], D = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    M,
    C
  ], W = () => ["", G, de, ee], ge = () => ["solid", "dashed", "dotted", "double"], Je = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], P = () => [G, Ae, nt, rt], Qe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    y,
    M,
    C
  ], be = () => ["none", G, M, C], ye = () => ["none", G, M, C], Ge = () => [G, M, C], xe = () => [se, "full", ...k()];
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
      font: [Fo],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [K],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [K],
      shadow: [K],
      spacing: ["px", G],
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
        aspect: ["auto", "square", se, C, M, g]
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
        columns: [G, C, M, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": T()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": T()
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
        object: $()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: N()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": N()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": N()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: E()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": E()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": E()
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
        inset: B()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": B()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": B()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: B()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: B()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: B()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: B()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: B()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: B()
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
        z: [J, "auto", M, C]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [se, "full", "auto", l, ...k()]
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
        flex: [G, se, "auto", "initial", "none", C]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", G, M, C]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", G, M, C]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [J, "first", "last", "none", M, C]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": he()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: fe()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": re()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": re()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": he()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: fe()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": re()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": re()
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
        "auto-cols": Xe()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Xe()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: k()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": k()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": k()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Te(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ne(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ne()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Te()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ne(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ne(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Te()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ne(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ne()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: k()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: k()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: k()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: k()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: k()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: k()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: k()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: k()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: k()
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
        "space-x": k()
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
        "space-y": k()
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
        w: [l, "screen", ...Q()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
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
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
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
        text: ["base", r, de, ee]
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
        font: [n, M, $e]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ae, C]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Po, C, o]
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
        tracking: [s, M, C]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [G, "none", M, $e]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...k()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", M, C]
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
        list: ["disc", "decimal", "none", M, C]
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
        placeholder: z()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: z()
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
        decoration: [G, "from-font", "auto", M, ee]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: z()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [G, "auto", M, C]
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
        indent: k()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", M, C]
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
        content: ["none", M, C]
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
        bg: qe()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Ue()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Ke()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, J, M, C],
          radial: ["", M, C],
          conic: [J, M, C]
        }, _o, Oo]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: z()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Re()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Re()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Re()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: z()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: z()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: z()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: D()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": D()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": D()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": D()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": D()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": D()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": D()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": D()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": D()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": D()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": D()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": D()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": D()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": D()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": D()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: W()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": W()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": W()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": W()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": W()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": W()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": W()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": W()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": W()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": W()
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
        "divide-y": W()
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
        border: z()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": z()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": z()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": z()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": z()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": z()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": z()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": z()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": z()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: z()
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
        "outline-offset": [G, M, C]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", G, de, ee]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: z()
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
        shadow: z()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", b, we, ve]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": z()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: W()
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
        ring: z()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [G, ee]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": z()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": W()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": z()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, we, ve]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": z()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [G, M, C]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Je(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Je()
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
        "mask-linear": [G]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": P()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": z()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": z()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": P()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": z()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": z()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": P()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": z()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": z()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": P()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": z()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": z()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": P()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": z()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": z()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": P()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": z()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": z()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": P()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": z()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": z()
      }],
      "mask-image-radial": [{
        "mask-radial": [M, C]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": z()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": z()
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
        "mask-radial-at": I()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [G]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": P()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": z()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": z()
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
        mask: qe()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Ue()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Ke()
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
        mask: ["none", M, C]
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
          M,
          C
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Qe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [G, M, C]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [G, M, C]
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
        "drop-shadow": z()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", G, M, C]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [G, M, C]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", G, M, C]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [G, M, C]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", G, M, C]
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
          M,
          C
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Qe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [G, M, C]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [G, M, C]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", G, M, C]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [G, M, C]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", G, M, C]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [G, M, C]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [G, M, C]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", G, M, C]
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
        "border-spacing": k()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": k()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": k()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", M, C]
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
        duration: [G, "initial", M, C]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, M, C]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [G, M, C]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, M, C]
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
        perspective: [m, M, C]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": $()
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
        skew: Ge()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ge()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ge()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [M, C, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: $()
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
        accent: z()
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
        caret: z()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", M, C]
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
        "scroll-m": k()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
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
        "will-change": ["auto", "scroll", "contents", "transform", M, C]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...z()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [G, de, ee, $e]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...z()]
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
}, ze = /* @__PURE__ */ Mo(Zo);
function Y(...e) {
  return ze(Ee(e));
}
const st = {
  slime: {
    bg: "bg-[#32CD32]",
    glow: "shadow-[0_0_20px_rgba(50,205,50,0.7)]",
    text: "text-lime-950",
    drip: "bg-[#32CD32]"
  },
  blood: {
    bg: "bg-[#DC143C]",
    glow: "shadow-[0_0_20px_rgba(220,20,60,0.7)]",
    text: "text-red-100",
    drip: "bg-[#DC143C]"
  },
  ectoplasm: {
    bg: "bg-[#9400D3]",
    glow: "shadow-[0_0_25px_rgba(148,0,211,0.7)]",
    text: "text-purple-100",
    drip: "bg-[#9400D3]"
  }
}, it = {
  low: { duration: 2.5, displacement: 25 },
  medium: { duration: 1.8, displacement: 40 },
  high: { duration: 1.2, displacement: 55 }
}, jo = j.forwardRef(
  ({
    className: e,
    variant: o = "ectoplasm",
    fluidity: r = "medium",
    children: n,
    disabled: s,
    onClick: i,
    ...a
  }, l) => {
    const d = `goo-filter-${j.useId().replace(/:/g, "")}`, [u, b] = j.useState(!1), [p, f] = j.useState(0), y = st[o] || st.ectoplasm, m = it[r] || it.medium, g = (I) => {
      f(($) => $ + 1), i?.(I);
    }, w = (I) => ({
      initial: { y: 0, scaleY: 1 },
      hover: {
        y: [0, m.displacement * 0.3, 0],
        scaleY: [1, 2, 1],
        // Stretch vertically to connect to leading circle
        transition: {
          duration: m.duration,
          repeat: 1 / 0,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: I
        }
      }
    }), x = (I) => ({
      initial: { y: 0, scale: 1 },
      hover: {
        y: [0, m.displacement, 0],
        scale: [1, 1.2, 1],
        // Grow slightly as it drops
        transition: {
          duration: m.duration,
          repeat: 1 / 0,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: I
        }
      }
    }), T = {
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
    return /* @__PURE__ */ h(
      "div",
      {
        className: "relative inline-block z-10 group",
        onMouseEnter: () => b(!0),
        onMouseLeave: () => b(!1),
        children: [
          /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: d, children: [
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
              className: Y(
                "absolute inset-0 rounded-full pointer-events-none transition-all duration-300",
                y.glow,
                u ? "opacity-100 scale-105" : "opacity-60 scale-100"
              ),
              style: { zIndex: -1 }
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              className: "absolute inset-0",
              style: { filter: `url(#${d})` },
              children: [
                /* @__PURE__ */ t(
                  v.div,
                  {
                    className: Y(
                      "w-full h-full rounded-full",
                      y.bg,
                      s && "opacity-50"
                    ),
                    variants: T,
                    initial: "initial",
                    animate: u && !s ? "hover" : "initial",
                    whileTap: s ? void 0 : "tap"
                  }
                ),
                /* @__PURE__ */ h(
                  v.div,
                  {
                    initial: "initial",
                    animate: u && !s ? "hover" : "initial",
                    className: "absolute inset-0",
                    children: [
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: Y("absolute w-3 h-4 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "25%", bottom: "50%", transformOrigin: "top" },
                          variants: w(0)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: Y("absolute w-5 h-5 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "25%", bottom: "45%", transform: "translateX(-15%)", transformOrigin: "top" },
                          variants: x(0)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: Y("absolute w-4 h-5 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "50%", bottom: "50%", transformOrigin: "top" },
                          variants: w(0.2)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: Y("absolute w-7 h-7 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "50%", bottom: "42%", transform: "translateX(-20%)", transformOrigin: "top" },
                          variants: x(0.2)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: Y("absolute w-3 h-4 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "75%", bottom: "50%", transformOrigin: "top" },
                          variants: w(0.4)
                        }
                      ),
                      /* @__PURE__ */ t(
                        v.div,
                        {
                          className: Y("absolute w-5 h-5 rounded-full motion-reduce:hidden", y.drip),
                          style: { left: "75%", bottom: "45%", transform: "translateX(-15%)", transformOrigin: "top" },
                          variants: x(0.4)
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ t(L, { children: p > 0 && /* @__PURE__ */ t(
                  v.div,
                  {
                    className: Y("absolute inset-0 rounded-full", y.bg),
                    initial: { scale: 0.8, opacity: 1 },
                    animate: { scale: 1.8, opacity: 0 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.6, ease: "easeOut" }
                  },
                  p
                ) })
              ]
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              ref: l,
              onClick: g,
              className: Y(
                "relative block w-full h-full px-8 py-3 rounded-full font-bold text-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500",
                y.text,
                s && "cursor-not-allowed",
                e
              ),
              disabled: s,
              ...a,
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
jo.displayName = "GooeyButton";
function S(...e) {
  return ze(Ee(e));
}
const Yo = ({
  children: e,
  className: o,
  gooColor: r = "bg-[#5b21b6]"
}) => {
  const n = [
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
  return /* @__PURE__ */ h("div", { className: "relative inline-block min-w-[320px] min-h-[200px]", children: [
    /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: "card-goo", children: [
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
    /* @__PURE__ */ h(
      "div",
      {
        className: "absolute inset-0",
        style: { filter: "url(#card-goo)" },
        children: [
          /* @__PURE__ */ t("div", { className: S("absolute inset-0 rounded-3xl", r) }),
          n.map((i, a) => /* @__PURE__ */ t(
            v.div,
            {
              className: S(
                "absolute rounded-full motion-reduce:hidden",
                i.width,
                i.position,
                r
              ),
              style: {
                top: i.top,
                transformOrigin: "top"
              },
              animate: {
                height: i.heights
              },
              transition: {
                duration: i.duration,
                repeat: 1 / 0,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i.delay
              }
            },
            `drip-${a}`
          )),
          s.map((i, a) => /* @__PURE__ */ t(
            "div",
            {
              className: S(
                "absolute rounded-full",
                i.width,
                i.height,
                i.position,
                i.bottom,
                r
              )
            },
            `pool-${a}`
          ))
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: S("relative z-20 p-6", o), children: e }),
    /* @__PURE__ */ t("div", { className: "absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-30" }),
    /* @__PURE__ */ t("div", { className: "absolute inset-0 rounded-3xl border-2 border-black/5 pointer-events-none z-30" })
  ] });
};
Yo.displayName = "GooeyCard";
const Vo = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xo = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, n) => n ? n.toUpperCase() : r.toLowerCase()
), at = (e) => {
  const o = Xo(e);
  return o.charAt(0).toUpperCase() + o.slice(1);
}, Tt = (...e) => e.filter((o, r, n) => !!o && o.trim() !== "" && n.indexOf(o) === r).join(" ").trim(), qo = (e) => {
  for (const o in e)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
};
var Uo = {
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
const Ko = He(
  ({
    color: e = "currentColor",
    size: o = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: s = "",
    children: i,
    iconNode: a,
    ...l
  }, c) => Oe(
    "svg",
    {
      ref: c,
      ...Uo,
      width: o,
      height: o,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(o) : r,
      className: Tt("lucide", s),
      ...!i && !qo(l) && { "aria-hidden": "true" },
      ...l
    },
    [
      ...a.map(([d, u]) => Oe(d, u)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
const te = (e, o) => {
  const r = He(
    ({ className: n, ...s }, i) => Oe(Ko, {
      ref: i,
      iconNode: o,
      className: Tt(
        `lucide-${Vo(at(e))}`,
        `lucide-${e}`,
        n
      ),
      ...s
    })
  );
  return r.displayName = at(e), r;
};
const Jo = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], Qo = te("flame", Jo);
const er = [
  ["path", { d: "M9 10h.01", key: "qbtxuw" }],
  ["path", { d: "M15 10h.01", key: "1qmjsl" }],
  [
    "path",
    {
      d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
      key: "uwwb07"
    }
  ]
], je = te("ghost", er);
const tr = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], or = te("moon", tr);
const rr = [
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
], nr = te("skull", rr);
const sr = [
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
], ir = te("sparkles", sr);
const ar = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], lr = te("sun", ar);
const cr = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Rt = te("x", cr), Gt = ({
  content: e,
  children: o,
  position: r = "top",
  className: n
}) => {
  const [s, i] = R(!1), a = Ut(), l = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, c = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-ghost-purple border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-ghost-purple border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-ghost-purple border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-ghost-purple border-t-transparent border-b-transparent border-l-transparent"
  }, d = gt(o) ? Kt(o, {
    "aria-describedby": s ? a : void 0,
    onFocus: (u) => {
      i(!0);
      const b = o.props.onFocus;
      b && b(u);
    },
    onBlur: (u) => {
      i(!1);
      const b = o.props.onBlur;
      b && b(u);
    }
  }) : o;
  return /* @__PURE__ */ h(
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      children: [
        d,
        /* @__PURE__ */ t(L, { children: s && /* @__PURE__ */ h(
          v.div,
          {
            id: a,
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
            className: S(
              "absolute z-50 px-3 py-2 text-sm text-ghost-white bg-ghost-dark border border-ghost-purple/40 rounded-md shadow-lg whitespace-nowrap",
              l[r],
              n
            ),
            role: "tooltip",
            children: [
              /* @__PURE__ */ t("div", { className: "relative z-10", children: e }),
              /* @__PURE__ */ t(
                "div",
                {
                  className: S(
                    "absolute w-0 h-0 border-[6px]",
                    c[r]
                  )
                }
              ),
              /* @__PURE__ */ t("div", { className: "absolute inset-0 bg-ghost-purple/10 rounded-md blur-sm -z-10" })
            ]
          }
        ) })
      ]
    }
  );
}, Ye = We(void 0), dr = {
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
function ur(e) {
  if (typeof window > "u") return null;
  const o = localStorage.getItem(e);
  return o === "spectral" || o === "blood" ? o : null;
}
function Be(e) {
  if (typeof document > "u") return;
  const o = document.documentElement;
  o.setAttribute("data-theme", e);
  const r = dr[e];
  Object.entries(r).forEach(([n, s]) => {
    o.style.setProperty(n, s);
  });
}
function pr({
  children: e,
  defaultTheme: o = "spectral",
  storageKey: r = "ghostui-theme"
}) {
  const [n, s] = R(o), [i, a] = R(!1), l = X((u) => {
    s(u), typeof window < "u" && localStorage.setItem(r, u), Be(u);
  }, [r]), c = X(() => {
    l(n === "spectral" ? "blood" : "spectral");
  }, [n, l]);
  A(() => {
    const b = ur(r) ?? o;
    s(b), Be(b), a(!0);
  }, [r, o]), A(() => {
    i && Be(n);
  }, [n, i]), A(() => {
    const u = (b) => {
      b.key === r && (b.newValue === "spectral" || b.newValue === "blood") && s(b.newValue);
    };
    return window.addEventListener("storage", u), () => window.removeEventListener("storage", u);
  }, [r]);
  const d = { theme: n, setTheme: l, toggleTheme: c };
  return /* @__PURE__ */ t(Ye.Provider, { value: d, children: e });
}
function Tn() {
  const e = Ie(Ye);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
function oe() {
  return Ie(Ye);
}
pr.displayName = "ThemeProvider";
function mr({
  checked: e,
  onChange: o,
  disabled: r = !1,
  className: n,
  variant: s = "spectral-blood",
  tooltip: i,
  tooltipPosition: a,
  tooltipClassName: l
}) {
  const c = oe(), d = e !== void 0, u = d ? e : c?.theme === "spectral", b = (x) => {
    d && o ? o(x) : c && c.setTheme(x ? "spectral" : "blood");
  }, p = s === "spectral-blood" ? /* @__PURE__ */ h(
    v.button,
    {
      type: "button",
      role: "switch",
      "aria-checked": u,
      disabled: r,
      onClick: () => !r && b(!u),
      className: S(
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
        /* @__PURE__ */ h(
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
            className: S(
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
                children: /* @__PURE__ */ h("svg", { viewBox: "0 0 100 100", className: "w-full h-full opacity-30 absolute inset-0 pointer-events-none", children: [
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
      icon: or,
      iconColor: "text-slate-800",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.6)]"
    },
    off: {
      bg: "bg-sky-300",
      border: "border-yellow-400",
      thumb: "bg-yellow-100",
      icon: lr,
      iconColor: "text-orange-500",
      glow: "shadow-[0_0_20px_rgba(250,204,21,0.6)]"
    }
  }, y = u ? f.on : f.off, m = y.icon, g = /* @__PURE__ */ h(
    v.button,
    {
      type: "button",
      role: "switch",
      "aria-checked": u,
      disabled: r,
      onClick: () => !r && b(!u),
      className: S(
        "relative w-20 h-10 rounded-full cursor-pointer p-1 transition-colors duration-500 border-2",
        y.bg,
        y.border,
        r && "opacity-50 cursor-not-allowed grayscale",
        n
      ),
      whileTap: { scale: 0.95 },
      children: [
        /* @__PURE__ */ t("div", { className: "absolute inset-0 overflow-hidden rounded-full pointer-events-none", children: u && /* @__PURE__ */ h(H, { children: [
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
            className: S(
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
            children: /* @__PURE__ */ t(L, { mode: "wait", children: /* @__PURE__ */ t(
              v.div,
              {
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                exit: { scale: 0, rotate: 180 },
                transition: { duration: 0.2 },
                children: /* @__PURE__ */ t(m, { size: 14, className: y.iconColor })
              },
              u ? "on" : "off"
            ) })
          }
        )
      ]
    }
  ), w = s === "spectral-blood" ? p : g;
  return i ? /* @__PURE__ */ t(
    Gt,
    {
      content: i,
      position: a,
      className: l,
      children: w
    }
  ) : w;
}
mr.displayName = "MoonlightSwitch";
const lt = "polygon(15% 0%, 85% 0%, 100% 10%, 90% 100%, 10% 100%, 0% 10%)", hr = {
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
function fr({
  className: e,
  children: o,
  title: r,
  index: n = 0,
  animated: s = !0,
  intensity: i = "medium",
  showGlow: a = !0
}) {
  const c = oe()?.theme ?? "spectral", d = hr[c];
  return /* @__PURE__ */ h(
    v.div,
    {
      initial: s ? { opacity: 0, y: 50 } : void 0,
      whileInView: s ? { opacity: 1, y: 0 } : void 0,
      viewport: { once: !0 },
      transition: { delay: n * 0.1, duration: 0.5 },
      className: S("relative group", e),
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: S(
              "relative z-10 bg-[#0a0a0a] border border-white/5 p-8 pt-10 pb-12 text-center transition-all duration-500 group-hover:-translate-y-2",
              d.borderHover
            ),
            style: {
              clipPath: lt,
              boxShadow: "none"
            },
            children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: S(
                    "absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    d.gradientOverlay
                  )
                }
              ),
              r && /* @__PURE__ */ t("h3", { className: S(
                "font-creep text-3xl text-gray-200 mb-4 tracking-wider transition-colors duration-300",
                d.titleHover
              ), children: r }),
              /* @__PURE__ */ t("div", { className: "text-gray-500 text-sm leading-relaxed relative z-20 font-mono group-hover:text-gray-300 transition-colors duration-300", children: o })
            ]
          }
        ),
        a && /* @__PURE__ */ t(
          "div",
          {
            className: S(
              "absolute inset-0 blur-2xl -z-10 translate-y-4 opacity-0 group-hover:opacity-40 transition-opacity duration-700",
              d.glowBg
            ),
            style: { clipPath: lt }
          }
        )
      ]
    }
  );
}
fr.displayName = "CoffinCard";
const gr = j.forwardRef(
  ({ className: e, label: o, error: r, ghostIcon: n, id: s, ...i }, a) => {
    const [l, c] = R(!1), d = s || j.useId();
    return /* @__PURE__ */ h("div", { className: S("relative w-full max-w-md", r ? "mb-10" : "mb-6"), children: [
      o && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: d,
          className: S(
            "block mb-1.5 text-sm font-medium tracking-wide transition-colors duration-500",
            r ? "text-red-500" : l ? "text-[var(--ghost-accent)]" : "text-gray-400"
          ),
          children: o
        }
      ),
      /* @__PURE__ */ h(
        v.div,
        {
          className: "relative flex items-center",
          animate: r ? { x: [-5, 5, -5, 5, 0] } : { x: 0 },
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
          children: [
            n && /* @__PURE__ */ t(
              "div",
              {
                className: S(
                  "absolute left-0 flex items-center justify-center w-8 h-full transition-all duration-500",
                  r ? "text-red-500" : l ? "text-[var(--ghost-accent)]" : "text-gray-600"
                ),
                style: l && !r ? {
                  filter: "drop-shadow(0 0 8px var(--ghost-accent))"
                } : void 0,
                children: /* @__PURE__ */ t(je, { size: 18 })
              }
            ),
            /* @__PURE__ */ t(
              "input",
              {
                ref: a,
                id: d,
                className: S(
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
                className: S(
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
                  scaleX: l || r ? 1 : 0,
                  opacity: l || r ? 1 : 0
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
                  opacity: l && !r ? 0.8 : 0,
                  y: l ? -15 : 10,
                  scaleY: l ? 2 : 0
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
                  opacity: l && !r ? 0.6 : 0,
                  scale: l ? 1.2 : 0.5
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
      /* @__PURE__ */ t(L, { children: r && /* @__PURE__ */ h(
        v.p,
        {
          initial: { opacity: 0, y: -3 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -3 },
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          className: S(
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
gr.displayName = "SpiritInput";
const Ve = ({ className: e }) => /* @__PURE__ */ t(
  "svg",
  {
    viewBox: "0 0 512 512",
    fill: "currentColor",
    className: e,
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ t("path", { d: "M372.084,106.642c9.277,64.285-67.483,102.934-76.724,103.858c-15.122,1.498-2.291-20.244,0.566-43.667c2.857-23.414-22.813,21.742-39.922,21.742c-17.108,0-42.778-45.156-39.93-21.742c2.858,23.423,15.688,45.165,0.566,43.667c-9.242-0.923-86.001-39.573-76.724-103.858C79.202,131.363-9.325,265.891,0.797,276.762c10.122,10.889,57.334-15.827,88.527,53.424c28.293-26.785,62.865-20.845,80.104,40.558c56.507-40.035,74.747,16.62,86.576,34.616c11.821-17.996,30.061-74.65,86.568-34.616c17.238-61.402,51.812-67.343,80.112-40.558c31.194-69.251,78.406-42.535,88.519-53.424C521.324,265.891,432.797,131.363,372.084,106.642z" })
  }
);
Ve.displayName = "BatIcon";
const At = () => /* @__PURE__ */ t(
  v.div,
  {
    className: "fixed inset-0 flex items-center justify-center pointer-events-none",
    style: { zIndex: 9999 },
    initial: { opacity: 0, scale: 0.2, y: 300 },
    animate: { opacity: 1, scale: 5, y: 0 },
    exit: { opacity: 0, scale: 8, y: -200 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    },
    children: /* @__PURE__ */ t(
      "div",
      {
        style: {
          filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) blur(0.5px)"
        },
        children: /* @__PURE__ */ t(Ve, { className: "w-24 h-24 text-ghost-dark" })
      }
    )
  }
);
At.displayName = "JumpscareBat";
const $t = ({
  id: e,
  size: o,
  homeX: r,
  homeY: n,
  opacity: s,
  blur: i,
  isHovered: a,
  mousePos: l,
  windowSize: c
}) => {
  const d = q(0, { stiffness: 60, damping: 15, mass: 1 }), u = q(0, { stiffness: 60, damping: 15, mass: 1 }), b = q(0, { stiffness: 60, damping: 15, mass: 1 });
  A(() => {
    const f = r / 100 * c.width, y = n / 100 * c.height, m = l.x - f, g = l.y - y, w = Math.sqrt(m * m + g * g), x = 300, T = 150;
    if (a && w < x) {
      const I = (x - w) / x, $ = Math.atan2(g, m), N = -Math.cos($) * I * T, E = -Math.sin($) * I * T, k = (m > 0 ? 1 : -1) * I * 45;
      d.set(N), u.set(E), b.set(k);
    } else
      d.set(0), u.set(0), b.set(0);
  }, [l, a, r, n, c, d, u, b]);
  const p = 0.1 + e % 5 * 0.02;
  return /* @__PURE__ */ t(
    v.div,
    {
      className: "absolute pointer-events-none",
      style: {
        left: `${r}%`,
        top: `${n}%`,
        x: d,
        y: u,
        rotate: b,
        width: o,
        height: o,
        opacity: s,
        filter: i,
        zIndex: a ? 100 : 0
      },
      children: /* @__PURE__ */ t(
        "div",
        {
          style: {
            animation: `flap ${p}s ease-in-out infinite alternate`,
            color: "currentColor"
          },
          children: /* @__PURE__ */ t(Ve, { className: "w-full h-full" })
        }
      )
    }
  );
};
$t.displayName = "AnimatedBat";
const Rn = ({
  isOpen: e,
  onClose: o,
  title: r,
  children: n,
  className: s
}) => {
  const [i, a] = R(!1);
  return A(() => (a(!0), () => a(!1)), []), A(() => {
    const l = (c) => {
      c.key === "Escape" && o();
    };
    return e && document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, o]), i ? oo(
    /* @__PURE__ */ t(L, { children: e && /* @__PURE__ */ h("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
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
      /* @__PURE__ */ h(
        v.div,
        {
          initial: { opacity: 0, y: 100, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 100, scale: 0.95 },
          transition: { type: "spring", damping: 20, stiffness: 300 },
          className: S(
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
            /* @__PURE__ */ h(
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
                  /* @__PURE__ */ h(
                    "button",
                    {
                      onClick: o,
                      className: "grave-modal-close rounded-full p-2 transition-all duration-200 focus:outline-none",
                      "aria-label": "Close modal",
                      children: [
                        /* @__PURE__ */ t(Rt, { className: "h-5 w-5" }),
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
}, Bt = () => /* @__PURE__ */ t(
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
), br = ({ className: e }) => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 101.11 162.77",
    className: S(e, "ghost-animate-float"),
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
), yr = ({ className: e }) => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 130.89 156.25",
    className: S(e, "ghost-animate-float"),
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#fff",
          d: "M130.89,156.25s-34.1-35.33-28.1-80.81c4.93-37.37-3.44-84.83-50.17-72.04C24.87,11,13.93,51.73,26.38,88.15c11.67,34.13,44.31,65.84,104.51,68.1Z"
        }
      ),
      /* @__PURE__ */ h("g", { className: "ghost-animate-wiggle origin-center", children: [
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
), xr = ({ className: e }) => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 105.71 147.07",
    className: S(e, "ghost-animate-float"),
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
), ct = [br, yr, xr], ie = ({
  children: e,
  className: o,
  peekDelay: r = 250,
  ghostEnabled: n = !0,
  ghostSize: s = 112,
  showBoo: i = !0,
  contentClassName: a
}) => {
  const [l, c] = R(null), d = F(null), u = X(() => {
    n && (d.current && clearTimeout(d.current), d.current = setTimeout(() => {
      const g = ct[Math.floor(Math.random() * ct.length)], w = ["top", "left", "right"], x = w[Math.floor(Math.random() * w.length)];
      c({ id: Date.now(), Component: g, edge: x });
    }, r));
  }, [n, r]), b = X(() => {
    d.current && clearTimeout(d.current), c(null);
  }, []);
  A(() => () => {
    d.current && clearTimeout(d.current);
  }, []);
  const p = {
    hidden: (g) => ({
      y: g === "top" ? "20%" : 0,
      x: g === "left" ? "20%" : g === "right" ? "-20%" : 0,
      opacity: 0,
      rotate: g === "left" ? -15 : g === "right" ? 15 : 0,
      scale: 0.8
    }),
    visible: (g) => ({
      y: g === "top" ? "-55%" : 0,
      x: g === "left" ? "-55%" : g === "right" ? "55%" : 0,
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
  }, y = (g) => {
    switch (g) {
      case "top":
        return "top-0";
      case "left":
        return "left-0";
      case "right":
        return "right-0";
    }
  }, m = (g) => {
    switch (g) {
      case "top":
        return "-top-24";
      case "left":
        return "-left-20 top-0";
      case "right":
        return "-right-20 top-0";
    }
  };
  return /* @__PURE__ */ h(
    "div",
    {
      className: S("relative group", o),
      onMouseEnter: u,
      onMouseLeave: b,
      children: [
        /* @__PURE__ */ t(Bt, {}),
        /* @__PURE__ */ t("div", { className: S("relative z-20", a), children: e }),
        /* @__PURE__ */ t("div", { className: "absolute inset-0 z-10 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ t(L, { children: l && /* @__PURE__ */ h(H, { children: [
          /* @__PURE__ */ t(
            v.div,
            {
              custom: l.edge,
              variants: p,
              initial: "hidden",
              animate: "visible",
              exit: "exit",
              className: S(
                "absolute mix-blend-screen",
                y(l.edge)
              ),
              style: { width: s, height: s },
              children: /* @__PURE__ */ t(l.Component, { className: "w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] opacity-90" })
            },
            `ghost-${l.id}`
          ),
          i && /* @__PURE__ */ t(
            v.div,
            {
              variants: f,
              initial: "hidden",
              animate: "visible",
              exit: "exit",
              className: S(
                "absolute z-50 font-black italic text-4xl text-white tracking-widest pointer-events-none",
                m(l.edge)
              ),
              style: {
                textShadow: "3px 3px 0 #000",
                WebkitTextStroke: "1px #A855F7",
                filter: "drop-shadow(0 0 10px #A855F7)"
              },
              children: "BOO!"
            },
            `boo-${l.id}`
          )
        ] }) }) })
      ]
    }
  );
}, vr = ({
  radius: e = 350,
  darkness: o = 0.9,
  blur: r = 2,
  enabled: n = !0,
  springDamping: s = 25,
  springStiffness: i = 150,
  className: a
}) => {
  const l = Me(0), c = Me(0), [d, u] = R(!1), b = { damping: s, stiffness: i }, p = q(l, b), f = q(c, b);
  A(() => {
    u(!0), n && typeof window < "u" && (l.set(window.innerWidth / 2), c.set(window.innerHeight / 2));
  }, [n, l, c]), A(() => {
    if (!n || !d) return;
    const m = (g) => {
      l.set(g.clientX), c.set(g.clientY);
    };
    return window.addEventListener("mousemove", m), () => window.removeEventListener("mousemove", m);
  }, [n, d, l, c]);
  const y = eo`radial-gradient(circle ${e}px at ${p}px ${f}px, transparent 10%, black 100%)`;
  return n ? /* @__PURE__ */ t(
    v.div,
    {
      className: S(
        "fixed inset-0 z-50 pointer-events-none",
        a
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
}, Gn = ({
  initialFlashlightOn: e = !0,
  showToggle: o = !0,
  className: r
}) => {
  const [n, s] = R(e);
  return /* @__PURE__ */ h(
    "div",
    {
      className: S(
        "min-h-screen bg-[#050505] text-gray-200 font-sans p-8 md:p-20 relative overflow-hidden",
        r
      ),
      children: [
        /* @__PURE__ */ t(Bt, {}),
        o && /* @__PURE__ */ t("div", { className: "fixed top-8 right-8 z-[60]", children: /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s(!n),
            className: "px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20",
            children: n ? "Disable Flashlight" : "Enable Flashlight"
          }
        ) }),
        n && /* @__PURE__ */ t(vr, {}),
        /* @__PURE__ */ h("div", { className: "max-w-5xl mx-auto space-y-16 pt-20", children: [
          /* @__PURE__ */ h("div", { className: "text-center space-y-4", children: [
            /* @__PURE__ */ t("h1", { className: "text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 tracking-tighter", children: "THE DARK ROOM" }),
            /* @__PURE__ */ h("p", { className: "text-gray-500 max-w-xl mx-auto", children: [
              "Move your cursor to explore. ",
              /* @__PURE__ */ t("br", {}),
              /* @__PURE__ */ t("span", { className: "text-purple-400", children: "Wait for the spirits..." })
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8", children: [
            /* @__PURE__ */ t(ie, { children: /* @__PURE__ */ h("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "The Attic" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "Dust motes dance in the sliver of moonlight. Something scuttles in the corner." })
            ] }) }),
            /* @__PURE__ */ t(ie, { children: /* @__PURE__ */ h("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Cellar Door" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "Locked from the inside. Scratch marks mar the heavy oak surface." })
            ] }) }),
            /* @__PURE__ */ t(ie, { children: /* @__PURE__ */ h("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Dusty Mirror" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "Your reflection seems to lag just a second behind your movements." })
            ] }) }),
            /* @__PURE__ */ t(ie, { children: /* @__PURE__ */ h("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Ancient Grimoire" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "The pages turn by themselves when the wind isn't blowing." })
            ] }) }),
            /* @__PURE__ */ t(ie, { children: /* @__PURE__ */ h("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
              /* @__PURE__ */ t("h3", { className: "text-xl font-bold text-gray-100 mb-2", children: "Music Box" }),
              /* @__PURE__ */ t("p", { className: "text-gray-400 text-sm", children: "It plays a lullaby you haven't heard since... since then." })
            ] }) }),
            /* @__PURE__ */ t(ie, { children: /* @__PURE__ */ h("div", { className: "bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300", children: [
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
};
function _(...e) {
  return ze(Ee(e));
}
const De = 48, wr = 4, ae = De + wr, Ft = {
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
}, kr = ({ theme: e }) => {
  const o = Ft[e];
  return /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: `sidebar-goo-3d-${e}`, colorInterpolationFilters: "sRGB", children: [
    /* @__PURE__ */ t("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
    /* @__PURE__ */ t("feColorMatrix", { in: "blur", mode: "matrix", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12", result: "goo" }),
    /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "3", result: "smoothGoo" }),
    /* @__PURE__ */ t("feSpecularLighting", { in: "smoothGoo", surfaceScale: "6", specularConstant: "1.4", specularExponent: "25", lightingColor: o.specularColor, result: "specular", children: /* @__PURE__ */ t("fePointLight", { x: "-100", y: "-200", z: "350" }) }),
    /* @__PURE__ */ t("feComposite", { in: "specular", in2: "goo", operator: "in", result: "specularClean" }),
    /* @__PURE__ */ t("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop", result: "solidGoo" }),
    /* @__PURE__ */ t("feComposite", { in: "specularClean", in2: "solidGoo", operator: "over" })
  ] }) }) });
}, Cr = ({
  activeIndex: e,
  previousIndex: o,
  isAnimating: r,
  colors: n
}) => {
  const s = e * ae, i = e > o ? 1 : -1, a = Math.abs(e - o), l = { stiffness: 300, damping: 30, mass: 0.8 }, c = { stiffness: 120, damping: 25, mass: 2.5 }, d = q(s, l), u = q(s, c);
  A(() => {
    d.set(s), u.set(s);
  }, [s, d, u]);
  const b = Z([d, u], ([N, E]) => Math.min(N, E)), p = Z([d, u], ([N, E]) => {
    const k = Math.abs(N - E);
    return Math.max(De, k + De);
  }), f = Z([d, u], ([N, E]) => {
    const k = Math.abs(N - E), B = Math.min(k / ae, 1);
    return E < N ? `${Math.max(4, 16 - B * 12)}px` : "16px";
  }), y = Z([d, u], ([N, E]) => {
    const k = Math.abs(N - E), B = Math.min(k / ae, 1);
    return E > N ? `${Math.max(4, 16 - B * 12)}px` : "16px";
  }), m = Z([d, u], ([N, E]) => {
    const k = Math.abs(N - E), B = Math.min(k / ae, 1);
    return E < N ? `${100 - B * 40}%` : "100%";
  }), g = Z([d, u], ([N, E]) => {
    const k = Math.abs(N - E), B = Math.min(k / ae, 1);
    return E > N ? `${100 - B * 40}%` : "100%";
  }), w = Z(
    [f, y],
    ([N, E]) => `${N} ${N} ${E} ${E}`
  ), x = Z(
    [m, g],
    ([N, E]) => {
      const k = (100 - parseFloat(N)) / 2, B = (100 - parseFloat(E)) / 2;
      return `polygon(${k}% 0%, ${100 - k}% 0%, ${100 - B}% 100%, ${B}% 100%)`;
    }
  ), T = q(s, { stiffness: 80, damping: 20, mass: 3.5 });
  A(() => {
    T.set(s);
  }, [s, T]);
  const I = Z([d, T], ([N, E]) => {
    const k = Math.abs(N - E);
    return 0.3 + Math.min(k / (ae * 2), 1) * 0.7;
  }), $ = Z([d, T], ([N, E]) => {
    const k = Math.abs(N - E);
    return Math.min(k / 20, 0.8);
  });
  return /* @__PURE__ */ h(H, { children: [
    /* @__PURE__ */ t(
      v.div,
      {
        className: _("absolute left-0 w-full", n.blobBg),
        style: {
          y: b,
          height: p,
          borderRadius: w,
          clipPath: x
        }
      }
    ),
    /* @__PURE__ */ t(
      v.div,
      {
        className: _("absolute left-1/4 w-1/2 h-8 rounded-full", n.blobBg),
        style: {
          y: T,
          scale: I,
          opacity: $
        }
      }
    ),
    /* @__PURE__ */ t(
      v.div,
      {
        className: _("absolute left-1/3 w-1/3 h-6 rounded-full", n.blobBg),
        style: {
          y: Z(T, (N) => N + (i > 0 ? -20 : 20)),
          scale: Z(I, (N) => N * 0.6),
          opacity: Z($, (N) => a > 2 ? N * 0.8 : 0)
        }
      }
    )
  ] });
}, Lt = j.forwardRef(
  ({ menuItems: e, activeId: o, onActiveChange: r, className: n }, s) => {
    const a = oe()?.theme ?? "spectral", l = Ft[a], [c, d] = R(
      e[0]?.id || ""
    ), [u, b] = R(null), [p, f] = R(0), [y, m] = R(!1), g = F(), w = o ?? c, x = e.findIndex((I) => I.id === w);
    A(() => (x !== p && (m(!0), g.current && clearTimeout(g.current), g.current = setTimeout(() => {
      f(x), m(!1);
    }, 600)), () => {
      g.current && clearTimeout(g.current);
    }), [x, p]);
    const T = (I, $) => {
      f(x), d(I), r?.(I);
    };
    return /* @__PURE__ */ h(
      "div",
      {
        ref: s,
        className: _(
          "relative w-72 h-[650px] bg-gradient-to-b overflow-hidden rounded-2xl shadow-2xl border",
          l.bgGradient,
          l.border,
          n
        ),
        children: [
          /* @__PURE__ */ t(kr, { theme: a }),
          /* @__PURE__ */ h("nav", { className: "relative flex flex-col gap-1 p-6 pt-8", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: "absolute left-6 top-8 right-6 bottom-6 pointer-events-none",
                style: { filter: `url(#sidebar-goo-3d-${a})` },
                children: /* @__PURE__ */ t(
                  Cr,
                  {
                    activeIndex: x >= 0 ? x : 0,
                    previousIndex: p,
                    isAnimating: y,
                    colors: l
                  }
                )
              }
            ),
            e.map((I, $) => {
              const N = w === I.id, E = u === I.id;
              return /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => T(I.id),
                  onMouseEnter: () => b(I.id),
                  onMouseLeave: () => b(null),
                  className: _(
                    "relative w-full h-12 flex items-center gap-4 px-4 text-sm transition-all duration-300 rounded-lg outline-none group z-10",
                    N ? `${l.activeText} font-medium` : `${l.inactiveText} hover:${l.hoverText} font-normal`
                  ),
                  children: [
                    I.icon && /* @__PURE__ */ t(
                      v.div,
                      {
                        animate: N ? { scale: 1.1, x: 4 } : E ? { x: 2 } : { x: 0, scale: 1 },
                        className: _(
                          "relative z-20 transition-colors",
                          N ? `${l.activeText} drop-shadow-md` : `group-hover:${l.hoverText}`
                        ),
                        children: I.icon
                      }
                    ),
                    /* @__PURE__ */ t("span", { className: "relative z-20 tracking-wide", children: I.label }),
                    E && !N && /* @__PURE__ */ t(
                      v.div,
                      {
                        initial: { opacity: 0, x: -5 },
                        animate: { opacity: 1, x: 0 },
                        className: _("absolute right-4 w-1.5 h-1.5 rounded-full", l.hoverDot)
                      }
                    )
                  ]
                },
                I.id
              );
            })
          ] })
        ]
      }
    );
  }
);
Lt.displayName = "GooeySidebar";
const Mr = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "messages", label: "Messages" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" }
], dt = {
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
}, Nr = ({
  initialActiveId: e = "home",
  className: o
}) => {
  const [r, n] = R(e), i = oe()?.theme ?? "spectral", a = dt[r] || dt.home, l = i === "blood" ? {
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
  return /* @__PURE__ */ h("div", { className: _("flex gap-6 w-full min-h-[700px]", o), children: [
    /* @__PURE__ */ t(
      Lt,
      {
        menuItems: Mr,
        activeId: r,
        onActiveChange: n
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: _(
          "flex-1 rounded-2xl p-8 border transition-colors duration-300",
          l.bg,
          l.border
        ),
        children: /* @__PURE__ */ h(
          v.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "h-full flex flex-col",
            children: [
              /* @__PURE__ */ t("h2", { className: _("text-3xl font-bold mb-4", l.title), children: a.title }),
              /* @__PURE__ */ t("p", { className: _("text-lg leading-relaxed", l.description), children: a.description }),
              /* @__PURE__ */ t("div", { className: "mt-8 flex-1 flex items-center justify-center", children: /* @__PURE__ */ h(
                "div",
                {
                  className: _(
                    "text-center p-8 rounded-xl border border-dashed",
                    l.border
                  ),
                  children: [
                    /* @__PURE__ */ h("p", { className: _("text-sm", l.accent), children: [
                      "Active Section: ",
                      /* @__PURE__ */ t("span", { className: "font-mono font-bold", children: r })
                    ] }),
                    /* @__PURE__ */ h("p", { className: _("text-xs mt-2", l.description), children: [
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
Nr.displayName = "GooeySidebarDemo";
function ke(...e) {
  return ze(Ee(e));
}
const Sr = ({ className: e }) => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 174.57 164.28",
    className: e,
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("style", { children: ".cls-1{fill:#fff;}.cls-2{fill:#2b2b28;}" }) }),
      /* @__PURE__ */ h("g", { id: "Objects", children: [
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
          }
        ),
        /* @__PURE__ */ h("g", { className: "animate-[blink_4s_infinite]", children: [
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
), Ot = We(null), Pt = He(({ toast: e, removeToast: o }, r) => {
  const n = e.side === "right";
  return /* @__PURE__ */ h(
    v.div,
    {
      ref: r,
      layout: !0,
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
      className: ke(
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
            className: ke(
              "relative z-20 w-24 h-24 filter drop-shadow-2xl",
              n ? "-mr-6" : "-ml-6 scale-x-[-1]"
            ),
            children: /* @__PURE__ */ t(Sr, { className: "w-full h-full" })
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            className: ke(
              "relative z-10 p-4 rounded-xl border backdrop-blur-md shadow-2xl max-w-xs",
              e.type === "curse" ? "bg-[#2a0a0a]/95 border-red-900/50 text-red-100" : "bg-[#0f0a1f]/95 border-purple-900/50 text-purple-100",
              n ? "mr-4 rounded-tr-none" : "ml-4 rounded-tl-none"
            ),
            children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: ke(
                    "absolute top-6 w-3 h-3 rotate-45 border-l border-t",
                    e.type === "curse" ? "bg-[#2a0a0a] border-red-900/50" : "bg-[#0f0a1f] border-purple-900/50",
                    n ? "-right-1.5 border-r border-t-0 border-l-0" : "-left-1.5"
                  )
                }
              ),
              /* @__PURE__ */ h("div", { className: "flex justify-between items-start gap-3", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-medium leading-relaxed drop-shadow-md", children: e.message }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => o(e.id),
                    className: "opacity-40 hover:opacity-100 transition-opacity",
                    children: /* @__PURE__ */ t(Rt, { size: 14 })
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
Pt.displayName = "GhostToastItem";
const Ir = ({
  toasts: e,
  removeToast: o
}) => /* @__PURE__ */ h("div", { className: "fixed inset-y-0 left-0 right-0 pointer-events-none flex flex-col justify-end p-6 z-[9999] overflow-hidden", children: [
  /* @__PURE__ */ t("style", { children: `
        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
      ` }),
  /* @__PURE__ */ t(L, { mode: "popLayout", children: e.map((r) => /* @__PURE__ */ t(
    Pt,
    {
      toast: r,
      removeToast: o
    },
    r.id
  )) })
] }), An = ({
  children: e
}) => {
  const [o, r] = R([]), n = (i, a = "info") => {
    const l = Math.random().toString(36).substr(2, 9), c = Math.random() > 0.5 ? "right" : "left", d = 0.85 + Math.random() * 0.25, u = (Math.random() - 0.5) * 30, b = Math.random() * 60;
    r((p) => [
      ...p,
      { id: l, message: i, type: a, side: c, scale: d, rotation: u, offsetX: b }
    ]), setTimeout(() => s(l), 5e3);
  }, s = (i) => {
    r((a) => a.filter((l) => l.id !== i));
  };
  return /* @__PURE__ */ h(Ot.Provider, { value: { addToast: n }, children: [
    e,
    /* @__PURE__ */ t(Ir, { toasts: o, removeToast: s })
  ] });
}, $n = () => {
  const e = Ie(Ot);
  if (!e)
    throw new Error("useGhostToast must be used within a GhostToastProvider");
  return e;
}, Er = {
  spectral: {
    accent: "rgb(168, 85, 247)",
    // ghost-purple
    accentRgb: "168, 85, 247",
    glow: "rgba(168, 85, 247, 0.4)",
    glowStrong: "rgba(168, 85, 247, 0.6)",
    border: "rgba(168, 85, 247, 0.3)",
    bg: "rgba(168, 85, 247, 0.1)",
    bgHover: "rgba(168, 85, 247, 0.15)"
  },
  blood: {
    accent: "rgb(239, 68, 68)",
    // blood-red
    accentRgb: "239, 68, 68",
    glow: "rgba(239, 68, 68, 0.4)",
    glowStrong: "rgba(239, 68, 68, 0.6)",
    border: "rgba(239, 68, 68, 0.3)",
    bg: "rgba(239, 68, 68, 0.1)",
    bgHover: "rgba(239, 68, 68, 0.15)"
  }
}, Bn = ({
  tabs: e,
  defaultTab: o,
  onTabChange: r,
  className: n,
  variant: s
}) => {
  const [i, a] = R(o || e[0]?.id), [l, c] = R(null), [d, u] = R(null), b = F(/* @__PURE__ */ new Map()), p = F(null), f = oe(), y = s ?? f?.theme ?? "spectral", m = Er[y], g = (x) => {
    x !== i && (c(i), a(x), r?.(x));
  };
  Jt(() => {
    const x = b.current.get(i), T = p.current;
    if (x && T) {
      const I = T.getBoundingClientRect(), $ = x.getBoundingClientRect();
      u({
        left: $.left - I.left,
        width: $.width
      });
    }
  }, [i, e]);
  const w = (() => {
    if (!l) return 0;
    const x = e.findIndex((I) => I.id === l);
    return e.findIndex((I) => I.id === i) > x ? 1 : -1;
  })();
  return /* @__PURE__ */ h("div", { className: S("w-full", n), children: [
    /* @__PURE__ */ h(
      "div",
      {
        ref: p,
        className: "relative",
        style: {
          borderBottom: `1px solid ${m.border}`
        },
        children: [
          /* @__PURE__ */ h("div", { className: "flex gap-1 relative", role: "tablist", children: [
            d && /* @__PURE__ */ t(
              v.div,
              {
                className: "absolute top-0 bottom-0 rounded-t-lg -z-10",
                style: {
                  background: `linear-gradient(180deg, ${m.bg} 0%, transparent 100%)`,
                  borderTop: `2px solid ${m.accent}`,
                  borderLeft: `1px solid ${m.border}`,
                  borderRight: `1px solid ${m.border}`
                },
                animate: {
                  left: d.left,
                  width: d.width
                },
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8
                }
              }
            ),
            e.map((x) => {
              const T = x.id === i, I = /* @__PURE__ */ h(
                "button",
                {
                  ref: ($) => {
                    $ && b.current.set(x.id, $);
                  },
                  onClick: () => g(x.id),
                  className: S(
                    "relative px-5 py-3.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 rounded-t-lg",
                    T ? "text-ghost-white" : "text-ghost-white/50 hover:text-ghost-white/80"
                  ),
                  style: {
                    ...T && {
                      textShadow: `0 0 20px ${m.glow}`
                    }
                  },
                  role: "tab",
                  "aria-selected": T,
                  "aria-controls": `panel-${x.id}`,
                  id: `tab-${x.id}`,
                  children: [
                    /* @__PURE__ */ h("div", { className: "flex items-center gap-2.5 relative z-10", children: [
                      x.icon && /* @__PURE__ */ t(
                        v.span,
                        {
                          animate: {
                            scale: T ? 1.1 : 1,
                            color: T ? m.accent : void 0
                          },
                          transition: { duration: 0.2 },
                          children: x.icon
                        }
                      ),
                      /* @__PURE__ */ t("span", { children: x.label })
                    ] }),
                    T && /* @__PURE__ */ t(
                      v.div,
                      {
                        className: "absolute inset-0 rounded-t-lg -z-10 pointer-events-none",
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        style: {
                          background: `radial-gradient(ellipse at center bottom, ${m.glow} 0%, transparent 70%)`,
                          filter: "blur(8px)"
                        }
                      }
                    )
                  ]
                },
                x.id
              );
              return x.tooltip ? /* @__PURE__ */ t(
                Gt,
                {
                  content: x.tooltip,
                  position: x.tooltipPosition,
                  className: x.tooltipClassName,
                  children: I
                },
                x.id
              ) : I;
            })
          ] }),
          d && /* @__PURE__ */ t(
            v.div,
            {
              className: "absolute bottom-0 h-0.5",
              style: {
                background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)`,
                boxShadow: `0 0 10px ${m.glow}, 0 0 20px ${m.glow}`
              },
              animate: {
                left: d.left,
                width: d.width
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
    /* @__PURE__ */ t("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ t(L, { mode: "popLayout", initial: !1, children: e.map((x) => x.id === i ? /* @__PURE__ */ t(
      v.div,
      {
        role: "tabpanel",
        id: `panel-${x.id}`,
        "aria-labelledby": `tab-${x.id}`,
        initial: {
          opacity: 0,
          x: w * 30,
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
          x: w * -30,
          scale: 0.98,
          filter: "blur(4px)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        },
        transition: {
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.25 },
          filter: { duration: 0.3 }
        },
        className: "pt-6",
        children: x.content
      },
      x.id
    ) : null) }) })
  ] });
}, ut = [
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
], zr = j.forwardRef(
  ({ className: e, label: o = "Invoke the Spirits", value: r, defaultValue: n, onChange: s, onFocus: i, onBlur: a, ...l }, c) => {
    const [d, u] = R(n || ""), [b, p] = R(!1), [f, y] = R(0), m = F(Date.now()), g = r !== void 0, w = g ? r : d, x = Math.min(f / 100, 0.8), T = 20 + f / 2;
    A(() => {
      const E = setInterval(() => {
        y((k) => Math.max(0, k - 5));
      }, 100);
      return () => clearInterval(E);
    }, []);
    const I = (E) => {
      g || u(E.target.value), y((k) => Math.min(100, k + 15)), m.current = Date.now(), s?.(E);
    }, $ = (E) => {
      p(!0), i?.(E);
    }, N = (E) => {
      p(!1), a?.(E);
    };
    return /* @__PURE__ */ h("div", { className: "relative w-full max-w-xl", children: [
      /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0 pointer-events-none", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: "ectoplasm-distortion", children: [
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
            scale: T
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute -inset-1 bg-purple-900/30 rounded transition-opacity duration-300 pointer-events-none",
          style: {
            filter: "url(#ectoplasm-distortion)",
            opacity: b ? 0.6 + x / 2 : 0
          }
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute inset-0 bg-purple-500/10 blur-xl rounded pointer-events-none transition-opacity duration-100",
          style: {
            opacity: x
          }
        }
      ),
      /* @__PURE__ */ t(L, { children: f > 10 && /* @__PURE__ */ t(H, { children: Array.from({ length: 6 }).map((E, k) => {
        const B = ut[Math.floor(Math.random() * ut.length)], he = 10 + Math.random() * 80, fe = 10 + Math.random() * 80, re = Math.random() * 360;
        return /* @__PURE__ */ t(
          v.div,
          {
            className: "absolute text-4xl text-purple-300/20 font-rune pointer-events-none",
            style: {
              left: `${he}%`,
              top: `${fe}%`,
              transform: `rotate(${re}deg)`
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
            children: B
          },
          `rune-${k}`
        );
      }) }) }),
      /* @__PURE__ */ t(
        "label",
        {
          className: S(
            "absolute left-4 top-4 font-rune uppercase tracking-widest transition-all duration-300 pointer-events-none z-10",
            b || w ? "text-[10px] -translate-y-7 text-purple-400" : "text-xs text-purple-200/50"
          ),
          children: o
        }
      ),
      /* @__PURE__ */ t(
        "textarea",
        {
          ref: c,
          className: S(
            "w-full min-h-[160px] resize-y relative z-10",
            "bg-[#0a0510]/80 backdrop-blur-sm",
            "border border-purple-500/20",
            "text-purple-100 text-lg leading-relaxed font-serif",
            "px-4 pt-8 pb-4",
            "outline-none",
            "placeholder:text-purple-900/50",
            "selection:bg-purple-500/30 selection:text-white",
            "ghost-text",
            b && "border-purple-500/50",
            e
          ),
          style: b ? {
            boxShadow: `0 0 ${20 + f}px rgba(168, 85, 247, ${0.1 + f / 500})`
          } : void 0,
          ...g ? { value: r } : { defaultValue: n },
          onChange: I,
          onFocus: $,
          onBlur: N,
          ...l
        }
      ),
      /* @__PURE__ */ t("div", { className: "absolute top-0 left-0 w-1 h-1 border-t border-l border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ t("div", { className: "absolute top-0 right-0 w-1 h-1 border-t border-r border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ t("div", { className: "absolute bottom-0 left-0 w-1 h-1 border-b border-l border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ t("div", { className: "absolute bottom-0 right-0 w-1 h-1 border-b border-r border-purple-500/40 pointer-events-none z-20" }),
      /* @__PURE__ */ t("div", { className: "absolute bottom-4 right-4 z-20 transition-colors duration-500", children: f > 50 ? /* @__PURE__ */ t(ir, { className: S("w-5 h-5 text-purple-400 animate-spin") }) : /* @__PURE__ */ t(je, { className: S(
        "w-5 h-5 transition-colors duration-500",
        b ? "text-purple-700" : "text-purple-900/40"
      ) }) }),
      /* @__PURE__ */ t("style", { children: `
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
zr.displayName = "WhisperBox";
const Tr = {
  blood: {
    container: "bg-red-950/30 border-red-900/50",
    fill: "bg-[#8a1c1c]",
    glow: "shadow-[0_0_15px_rgba(220,38,38,0.4)]",
    filterId: "goo-3d-blood",
    dripColor: "bg-[#8a1c1c]",
    icon: /* @__PURE__ */ t(nr, { size: 16, className: "text-red-400" })
  },
  candle: {
    container: "bg-orange-950/30 border-orange-900/30",
    fill: "bg-[#ffedd5]",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.4)]",
    filterId: "goo-3d-candle",
    dripColor: "bg-[#ffedd5]",
    icon: /* @__PURE__ */ t(Qo, { size: 16, className: "text-orange-400" })
  },
  soul: {
    container: "bg-indigo-950/40 border-indigo-500/30",
    fill: "bg-indigo-600",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.6)]",
    filterId: "none",
    dripColor: "bg-transparent",
    icon: /* @__PURE__ */ t(je, { size: 16, className: "text-indigo-300" })
  }
}, Dt = j.memo(({ filterId: e }) => /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", "aria-hidden": "true", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: e, colorInterpolationFilters: "sRGB", children: [
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
Dt.displayName = "GooFilter";
const _t = j.memo(({ dripColor: e }) => /* @__PURE__ */ h(H, { children: [
  /* @__PURE__ */ t(
    v.div,
    {
      className: S("absolute right-0 top-full w-4 h-4 -mt-2 rounded-full", e),
      animate: { height: [10, 25, 10] },
      transition: { duration: 2, repeat: 1 / 0, ease: "easeInOut" }
    }
  ),
  /* @__PURE__ */ t(
    v.div,
    {
      className: S("absolute right-4 top-full w-3 h-3 -mt-2 rounded-full", e),
      animate: { height: [8, 20, 8] },
      transition: { duration: 3, repeat: 1 / 0, ease: "easeInOut", delay: 1 }
    }
  )
] }));
_t.displayName = "Drips";
const Ht = j.memo(() => /* @__PURE__ */ h(H, { children: [
  /* @__PURE__ */ h("div", { className: "absolute inset-0 overflow-hidden rounded-full", children: [
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
Ht.displayName = "SoulEffects";
const Rr = ({
  value: e,
  variant: o = "blood",
  className: r
}) => {
  const n = Math.min(100, Math.max(0, e)), s = n === 100, i = Tr[o], a = o !== "soul", l = me(
    () => a ? { filter: `url(#${i.filterId})` } : void 0,
    [a, i.filterId]
  ), c = me(
    () => ({ type: "spring", stiffness: 50, damping: 15 }),
    []
  );
  return /* @__PURE__ */ h("div", { className: S("w-full max-w-md", r), children: [
    /* @__PURE__ */ h("div", { className: "flex justify-between items-center mb-2 px-1", children: [
      /* @__PURE__ */ h("div", { className: "flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-gray-500", children: [
        i.icon,
        /* @__PURE__ */ h("span", { children: [
          o,
          " Gauge"
        ] })
      ] }),
      /* @__PURE__ */ h("span", { className: "font-mono text-xs text-gray-400", children: [
        Math.round(n),
        "%"
      ] })
    ] }),
    a && /* @__PURE__ */ t(Dt, { filterId: i.filterId }),
    /* @__PURE__ */ h("div", { className: "relative h-6 w-full", children: [
      /* @__PURE__ */ t("div", { className: S("absolute inset-0 rounded-full border", i.container) }),
      /* @__PURE__ */ t("div", { className: "absolute inset-0 w-full h-full overflow-visible", style: l, children: /* @__PURE__ */ h(
        v.div,
        {
          className: S("h-full rounded-full relative", i.fill),
          initial: !1,
          animate: { width: `${n}%` },
          transition: c,
          children: [
            o === "soul" && n > 0 && /* @__PURE__ */ t(Ht, {}),
            a && n > 0 && /* @__PURE__ */ t(_t, { dripColor: i.dripColor })
          ]
        }
      ) }),
      /* @__PURE__ */ t(L, { children: s && /* @__PURE__ */ t(
        v.div,
        {
          initial: { opacity: 0, scale: 1 },
          animate: { opacity: [0, 1, 0], scale: 1.2 },
          exit: { opacity: 0 },
          transition: { duration: 1, repeat: 1 / 0 },
          className: S(
            "absolute inset-0 rounded-full border-2 border-white/50 pointer-events-none",
            i.glow
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ t("style", { children: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      ` })
  ] });
};
Rr.displayName = "GooeyProgressBar";
const Wt = {
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
let Gr = 0;
const Ar = () => `spooky-skeleton-${++Gr}`;
function Fe(e) {
  const { className: o = "", style: r } = e.props, n = String(o);
  let s = "w-full";
  const i = n.match(/w-(\[[\d\w%]+\]|\d+\/\d+|full|auto|screen|min|max|fit|\d+)/);
  i ? s = `w-${i[1]}` : r?.width && (s = `w-[${r.width}]`);
  let a = "h-4";
  const l = n.match(/h-(\[[\d\w%]+\]|\d+\/\d+|full|auto|screen|min|max|fit|\d+)/);
  l ? a = `h-${l[1]}` : r?.height && (a = `h-[${r.height}]`);
  let c = "rounded-md";
  return n.includes("rounded-full") || e.type === "img" && n.includes("avatar") ? c = "rounded-full" : n.includes("rounded-lg") ? c = "rounded-lg" : n.includes("rounded-xl") ? c = "rounded-xl" : n.includes("rounded-2xl") ? c = "rounded-2xl" : n.includes("rounded-none") && (c = "rounded-none"), { width: s, height: a, rounded: c };
}
function $r(e) {
  const o = ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label", "a"];
  return typeof e.type == "string" && o.includes(e.type);
}
function Br(e) {
  const { className: o = "" } = e.props, r = String(o);
  return e.type === "img" || r.includes("avatar") || r.includes("rounded-full") || r.includes("w-") && r.includes("h-") && /w-\d+/.test(r) && /h-\d+/.test(r);
}
function Fr(e) {
  const o = ["div", "section", "article", "main", "aside", "header", "footer", "nav"];
  return typeof e.type == "string" && o.includes(e.type);
}
function Ce(e, o, r, n = 0) {
  if (!e) return null;
  if (Array.isArray(e))
    return e.map((s, i) => Ce(s, o, r, n));
  if (typeof e == "string" || typeof e == "number") {
    const s = String(e).trim();
    if (!s) return null;
    const i = Math.min(s.length * 8, 200);
    return /* @__PURE__ */ t(
      V,
      {
        variant: o,
        theme: r,
        className: `h-4 w-[${i}px] inline-block`
      }
    );
  }
  if (gt(e)) {
    const s = e, { className: i = "", children: a, style: l } = s.props, c = String(i);
    if (c.includes("hidden") || c.includes("sr-only"))
      return null;
    if (Br(s)) {
      const u = Fe(s);
      return /* @__PURE__ */ t(
        V,
        {
          variant: o,
          theme: r,
          className: S(u.width, u.height, u.rounded, "flex-shrink-0")
        }
      );
    }
    if ($r(s)) {
      const u = Fe(s), b = ["w-full", "w-11/12", "w-5/6", "w-4/5", "w-3/4"], p = u.width === "w-full" ? b[Math.floor(Math.random() * b.length)] : u.width;
      return /* @__PURE__ */ t(
        V,
        {
          variant: o,
          theme: r,
          className: S(p, u.height || "h-4", u.rounded)
        }
      );
    }
    if (Fr(s)) {
      const u = Qt.map(
        a,
        (p) => Ce(p, o, r, n + 1)
      ), b = c.split(" ").filter(
        (p) => p.startsWith("flex") || p.startsWith("grid") || p.startsWith("gap") || p.startsWith("space-") || p.startsWith("p-") || p.startsWith("px-") || p.startsWith("py-") || p.startsWith("m-") || p.startsWith("mx-") || p.startsWith("my-") || p.startsWith("w-") || p.startsWith("h-") || p.startsWith("max-") || p.startsWith("min-") || p.startsWith("rounded") || p.startsWith("items-") || p.startsWith("justify-") || p.startsWith("self-") || p.startsWith("col-") || p.startsWith("row-")
      ).join(" ");
      return /* @__PURE__ */ t("div", { className: b, children: u });
    }
    if (a)
      return Ce(a, o, r, n + 1);
    const d = Fe(s);
    return /* @__PURE__ */ t(
      V,
      {
        variant: o,
        theme: r,
        className: S(d.width, d.height, d.rounded)
      }
    );
  }
  return null;
}
const V = ({ variant: e, className: o, theme: r }) => {
  const n = oe(), s = r ?? n?.theme ?? "spectral", i = Wt[s];
  return /* @__PURE__ */ t(
    "div",
    {
      className: S("relative overflow-hidden rounded-md", (() => {
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
}, Fn = ({ variant: e, children: o, className: r }) => {
  const s = oe()?.theme ?? "spectral", i = Wt[s], a = j.useMemo(() => Ar(), []), l = o ? Ce(o, e, s) : (
    // Default fallback layout when no children provided
    /* @__PURE__ */ h(H, { children: [
      /* @__PURE__ */ h("div", { className: "flex items-start gap-4 mb-4", children: [
        /* @__PURE__ */ t(V, { variant: e, theme: s, className: "w-12 h-12 rounded-full flex-shrink-0" }),
        /* @__PURE__ */ h("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ t(V, { variant: e, theme: s, className: "h-4 w-3/4" }),
          /* @__PURE__ */ t(V, { variant: e, theme: s, className: "h-3 w-1/2" })
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t(V, { variant: e, theme: s, className: "h-3 w-full" }),
        /* @__PURE__ */ t(V, { variant: e, theme: s, className: "h-3 w-5/6" }),
        /* @__PURE__ */ t(V, { variant: e, theme: s, className: "h-3 w-4/5" })
      ] })
    ] })
  );
  return /* @__PURE__ */ h(H, { children: [
    /* @__PURE__ */ t("style", { children: `
        .${a} .skeleton-sweep {
          background: linear-gradient(90deg, ${i.secondary} 0%, ${i.primary} 25%, ${i.accent} 50%, ${i.primary} 75%, ${i.secondary} 100%);
          background-size: 200% 100%;
          animation: skeleton-sweep-anim 3s linear infinite;
        }

        @keyframes skeleton-sweep-anim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .${a} .skeleton-scan {
          position: relative;
        }

        .${a} .skeleton-scan::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: ${i.glow};
          box-shadow: 0 0 10px ${i.glow}, 0 0 20px ${i.glow};
          opacity: 0.6;
          animation: skeleton-scan-anim 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 10;
        }

        @keyframes skeleton-scan-anim {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .${a} .skeleton-flicker {
          animation: skeleton-flicker-anim 3s steps(10, start) infinite;
        }

        @keyframes skeleton-flicker-anim {
          0%, 100% { opacity: 0.3; }
          5% { opacity: 0.8; }
          10% { opacity: 0.3; }
          15% { opacity: 0.3; }
          20% { opacity: 0.7; }
          40% { opacity: 0.3; }
          80% { opacity: 0.5; }
        }

        .${a} .skeleton-fog-overlay {
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          filter: blur(20px);
          animation: skeleton-fog-anim 6s ease-in-out infinite alternate;
        }

        @keyframes skeleton-fog-anim {
          0% { transform: translateX(-10%); opacity: 0.2; }
          50% { transform: translateX(10%); opacity: 0.5; }
          100% { transform: translateX(-10%); opacity: 0.2; }
        }

        @media (prefers-reduced-motion: reduce) {
          .${a} .skeleton-sweep,
          .${a} .skeleton-flicker,
          .${a} .skeleton-fog-overlay,
          .${a} .skeleton-scan::after {
            animation: none;
          }
        }
      ` }),
    /* @__PURE__ */ t(
      "div",
      {
        className: S(
          a,
          "relative p-6 rounded-2xl border shadow-lg",
          r
        ),
        style: {
          backgroundColor: i.bg,
          borderColor: i.border
        },
        role: "status",
        "aria-label": "Loading content",
        children: l
      }
    )
  ] });
}, Lr = `
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
`, Or = ({ className: e }) => /* @__PURE__ */ t(
  "svg",
  {
    viewBox: "0 0 174.57 164.28",
    className: S("w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]", e),
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("g", { style: { animation: "ghost-float 3s ease-in-out infinite" }, children: [
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
), Pr = ({ className: e }) => /* @__PURE__ */ t(
  "svg",
  {
    viewBox: "0 0 116.24 100.37",
    className: S("w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]", e),
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("g", { children: [
      /* @__PURE__ */ t(
        "path",
        {
          fill: "#f9f8f7",
          d: "M70.58,2.81c-11.62-6.35-23.33-1.1-32.03,7.42-1.62,1.58-3.63,3.01-5.76,3.82-6.14,2.33-12.92,2.27-19.28,3.81-7.11,1.73-7.83,5.94-7.98,12.28-.19,8.37-2.03,17.7-4.3,25.74-.86,3.03-3.2,9.49,2.28,6.87,3.45-1.65,8.91-8.56,12.86-6.5,3.29,1.71,2.01,7.09,4.59,9.14,1.74,1.38,2.29.3,3.47-1.32,1.56-2.14,3.82-4.46,5.93-.74,1.62,2.85,1.01,7.4.42,10.52-1.03,5.44-3.8,10.7-4.53,16.18-.64,4.79,1.51,6.43,5.73,4.24,2.06-1.07,4.03-2.74,6.27-3.38,4.32-1.24,6.27.99,7.84,4.43,1.68,3.7,4.5,7.46,7.97,3.07,2.53-3.2,4.41-12.03,9.98-7.76,2.17,1.66,2.36,4.64,4.3,6.38,3.47,3.11,4.44-1.11,7.4-1.94,2.36-.66,3.98,2.69,6.88,1.82,3.76-1.12,4.01-4.44,3-7.64-.87-2.78-2.12-5.37-3.13-8.08-1.5-4.04-4.41-17.51,2.01-18.75,4.81-.93,6.43,7.02,12.19,3.72,3.27-1.87,2.64-4.52,2.36-7.57-.29-3.2-1.48-8.14,2.76-6.99,3.15.85,5.51,3.68,8.8,4.13,4.54.61,5.64-3.41,5.63-7.16-.02-9.46-.99-22.74-10.74-27.4-2.95-1.41-6.34-1.81-9.57-2.31-.61-.1-1.22-.19-1.82-.31-1.97-.37-3.83-.95-5.58-1.91-2.83-1.56-5.35-4.75-7.85-6.88-3.13-2.67-6.49-4.97-10.1-6.94Z"
        }
      ),
      /* @__PURE__ */ h("g", { children: [
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
      /* @__PURE__ */ h("g", { children: [
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
), Ln = ({ children: e, className: o }) => {
  const r = F(null), n = F(null), [s, i] = R(20), [a, l] = R(0), [c, d] = R(!1), [u, b] = R(!1), [p, f] = R(!1), y = X(() => {
    if (!r.current || !n.current) return;
    const { scrollTop: m, scrollHeight: g, clientHeight: w } = r.current, x = n.current.clientHeight, T = Math.max(
      w / g * x,
      40
      // Minimum height
    ), I = m / (g - w), $ = x - T, N = I * $;
    i(T), l(N), g - m - w < 10 ? p || f(!0) : p && f(!1);
  }, [p]);
  return A(() => {
    const m = r.current;
    if (m) {
      m.addEventListener("scroll", y), y();
      const g = new ResizeObserver(y);
      return g.observe(m), () => {
        m.removeEventListener("scroll", y), g.disconnect();
      };
    }
  }, [y]), A(() => {
    const m = (w) => {
      if (!u || !r.current || !n.current) return;
      w.preventDefault();
      const x = n.current.getBoundingClientRect(), T = x.top, I = x.height, $ = w.clientY - T - s / 2, N = Math.max(0, Math.min(1, $ / (I - s))), E = r.current.scrollHeight, k = r.current.clientHeight;
      r.current.scrollTop = N * (E - k);
    }, g = () => {
      b(!1), document.body.style.userSelect = "";
    };
    return u && (window.addEventListener("mousemove", m), window.addEventListener("mouseup", g), document.body.style.userSelect = "none"), () => {
      window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", g);
    };
  }, [u, s]), /* @__PURE__ */ h(
    "div",
    {
      className: S("relative w-full h-full overflow-hidden rounded-lg transition-all duration-300", o),
      style: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "var(--ghost-border)",
        backgroundColor: "var(--ghost-bg-secondary)",
        boxShadow: "0 0 20px rgba(var(--ghost-accent-rgb), 0.3), 0 0 40px rgba(var(--ghost-accent-rgb), 0.15)"
      },
      children: [
        /* @__PURE__ */ t("style", { children: Lr }),
        /* @__PURE__ */ t(
          "div",
          {
            ref: r,
            className: "w-full h-full overflow-y-auto hide-native-scrollbar pr-4 relative z-10",
            children: e
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            ref: n,
            className: "absolute top-2 bottom-2 right-1 w-3 rounded-full z-50 transition-colors duration-300",
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(255, 255, 255, 0.1)"
            },
            onMouseEnter: () => d(!0),
            onMouseLeave: () => !u && d(!1),
            children: /* @__PURE__ */ h(
              "div",
              {
                className: "absolute w-full rounded-full cursor-pointer transition-all duration-200",
                style: {
                  height: s,
                  top: a,
                  backgroundColor: c || u ? "var(--ghost-accent)" : "rgba(var(--ghost-accent-rgb), 0.5)"
                },
                onMouseDown: (m) => {
                  m.stopPropagation(), b(!0);
                },
                children: [
                  /* @__PURE__ */ t(L, { children: (c || u) && /* @__PURE__ */ h(
                    v.div,
                    {
                      initial: { opacity: 0, x: 20, scale: 0.5, rotate: 20 },
                      animate: { opacity: 1, x: -60, scale: 1, rotate: -10 },
                      exit: { opacity: 0, x: 10, scale: 0.5, rotate: 0 },
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                      className: "absolute top-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none",
                      children: [
                        /* @__PURE__ */ t(Or, {}),
                        /* @__PURE__ */ h(
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
                      className: S(
                        "absolute inset-0 blur-md rounded-full transition-opacity duration-300",
                        c || u ? "opacity-100" : "opacity-0"
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
        /* @__PURE__ */ t(L, { children: p && /* @__PURE__ */ t(H, { children: /* @__PURE__ */ t(
          v.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 bg-black/60 backdrop-blur-[2px] z-40 pointer-events-none flex flex-col items-center justify-end pb-0",
            children: /* @__PURE__ */ h(
              v.div,
              {
                initial: { y: "100%", scale: 0 },
                animate: { y: "10%", scale: 1.5 },
                exit: { y: "100%", scale: 0, opacity: 0 },
                transition: { type: "spring", stiffness: 200, damping: 15 },
                className: "w-64 h-64 relative",
                children: [
                  /* @__PURE__ */ t(Pr, {}),
                  /* @__PURE__ */ t(
                    v.div,
                    {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.3 },
                      className: "absolute -top-10 left-1/2 -translate-x-1/2 text-white font-black text-2xl uppercase tracking-widest",
                      style: {
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
}, Dr = `
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
`, _r = ({ className: e }) => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 174.57 164.28",
    className: e,
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("style", { children: ".cls-1{fill:#fff;}.cls-2{fill:#2b2b28;}" }) }),
      /* @__PURE__ */ h("g", { id: "Objects", children: [
        /* @__PURE__ */ t(
          "path",
          {
            className: "cls-1",
            d: "M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
          }
        ),
        /* @__PURE__ */ h("g", { className: "animate-blink", children: [
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
), On = () => {
  const e = Me(-100), o = Me(-100), r = { damping: 25, stiffness: 300, mass: 0.5 }, n = q(e, r), s = q(o, r), [i, a] = R(!1), [l, c] = R(!1), [d, u] = R([]), b = F(0);
  return A(() => {
    document.body.classList.add("ghost-cursor-active");
    const p = (y) => {
      e.set(y.clientX), o.set(y.clientY);
      const m = y.target, g = m.tagName === "BUTTON" || m.tagName === "A" || m.closest("button") || m.closest("a") || window.getComputedStyle(m).cursor === "pointer";
      a(!!g);
    }, f = (y) => {
      c(!0);
      const m = Math.random() > 0.5 ? "BOO!" : "POOF!", g = {
        id: b.current++,
        x: y.clientX,
        y: y.clientY,
        text: m
      };
      u((w) => [...w, g]), setTimeout(() => {
        u((w) => w.filter((x) => x.id !== g.id));
      }, 1e3), setTimeout(() => c(!1), 150);
    };
    return window.addEventListener("mousemove", p), window.addEventListener("mousedown", f), () => {
      document.body.classList.remove("ghost-cursor-active"), window.removeEventListener("mousemove", p), window.removeEventListener("mousedown", f);
    };
  }, [e, o]), /* @__PURE__ */ h(H, { children: [
    /* @__PURE__ */ t("style", { children: Dr }),
    /* @__PURE__ */ t(
      v.div,
      {
        className: "fixed top-0 left-0 pointer-events-none z-[9999]",
        style: {
          x: n,
          y: s,
          translateX: "-20%",
          // Center offset slightly so the "head" is the pointer
          translateY: "-20%"
        },
        children: /* @__PURE__ */ h(
          v.div,
          {
            animate: {
              scale: l ? 0.8 : i ? 1.2 : 1,
              rotate: l ? -15 : i ? 10 : 0
            },
            transition: { type: "spring", stiffness: 400, damping: 20 },
            className: "relative w-12 h-12",
            children: [
              /* @__PURE__ */ t("div", { className: "absolute inset-0 bg-purple-500/30 blur-xl rounded-full scale-150 animate-pulse" }),
              /* @__PURE__ */ t(_r, { className: "w-full h-full drop-shadow-lg" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ t(L, { children: d.map((p) => /* @__PURE__ */ t(
      v.div,
      {
        initial: { opacity: 1, scale: 0.5, y: 0 },
        animate: { opacity: 0, scale: 1.5, y: -40 },
        exit: { opacity: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "fixed pointer-events-none z-[9998] font-black text-lg text-white tracking-widest",
        style: {
          left: p.x,
          top: p.y,
          textShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
          // Random rotation for variety
          rotate: Math.random() * 30 - 15
        },
        children: p.text
      },
      p.id
    )) })
  ] });
}, Pn = ({
  color: e = "#90FFB5",
  particleCount: o = 3
}) => {
  const [r, n] = R([]);
  return A(() => {
    let s = 0, i = 0;
    const a = (l) => {
      const c = Date.now();
      if (c - i < 50) return;
      i = c;
      const d = [];
      for (let u = 0; u < o; u++)
        d.push({
          x: l.clientX + (Math.random() - 0.5) * 20,
          y: l.clientY + (Math.random() - 0.5) * 20,
          id: s++,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1
        });
      n((u) => [...u, ...d].slice(-30));
    };
    return window.addEventListener("mousemove", a), () => window.removeEventListener("mousemove", a);
  }, [o]), /* @__PURE__ */ t("div", { className: "pointer-events-none fixed inset-0 z-50", children: /* @__PURE__ */ t(L, { children: r.map((s) => /* @__PURE__ */ t(
    v.div,
    {
      className: "absolute rounded-full",
      style: {
        left: s.x,
        top: s.y,
        width: 4 + Math.random() * 4,
        height: 4 + Math.random() * 4,
        backgroundColor: e,
        boxShadow: `0 0 10px ${e}`
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
        n((i) => i.filter((a) => a.id !== s.id));
      }
    },
    s.id
  )) }) });
}, Hr = {
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
}, ue = {
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
function Wr(e, o) {
  const r = o.timestamp - e.timestamp;
  if (r === 0)
    return { x: 0, y: 0, magnitude: 0 };
  const n = 16.67, s = (o.x - e.x) / r * n, i = (o.y - e.y) / r * n, a = Math.sqrt(s * s + i * i);
  return { x: s, y: i, magnitude: a };
}
function Zr({ onStateChange: e, throttleMs: o = 16.67 }) {
  const [r, n] = R({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, magnitude: 0 },
    isMoving: !1,
    isClicking: !1
  }), s = F({
    x: 0,
    y: 0,
    timestamp: Date.now()
  }), i = F(Date.now()), a = F(!1), l = F(e);
  return A(() => {
    l.current = e;
  }, [e]), A(() => {
    l.current(r);
  }, [r]), A(() => {
    const c = (b) => {
      const p = Date.now();
      if (p - i.current < o)
        return;
      const f = {
        x: b.clientX,
        y: b.clientY,
        timestamp: p
      }, y = Wr(s.current, f), m = {
        position: { x: f.x, y: f.y },
        velocity: y,
        isMoving: y.magnitude > 0.5,
        // Consider moving if velocity > 0.5 pixels/frame
        isClicking: a.current
      };
      n(m), s.current = f, i.current = p;
    }, d = () => {
      a.current = !0, n((b) => ({ ...b, isClicking: !0 }));
    }, u = () => {
      a.current = !1, n((b) => ({ ...b, isClicking: !1 }));
    };
    return window.addEventListener("mousemove", c), window.addEventListener("mousedown", d), window.addEventListener("mouseup", u), () => {
      window.removeEventListener("mousemove", c), window.removeEventListener("mousedown", d), window.removeEventListener("mouseup", u);
    };
  }, [o]), null;
}
function Zt(e) {
  const o = e || "spooky";
  return typeof o == "string" ? Hr[o] : o;
}
function jr(e, o, r = typeof window < "u" ? window.innerHeight : 1e3) {
  const n = Zt(o.theme), s = o.colorTransitionZones || "vertical";
  let i;
  if (s === "vertical")
    i = Yr(e.y, r, n);
  else if (s === "horizontal") {
    const a = typeof window < "u" ? window.innerWidth : 1e3;
    i = Vr(e.x, a, n);
  } else if (s === "radial") {
    const a = typeof window < "u" ? window.innerWidth : 1e3;
    i = Xr(e, a, r, n);
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
function Yr(e, o, r) {
  const n = e / o;
  return n < 0.33 ? r.colors.primary : n < 0.66 ? r.colors.secondary : r.colors.tertiary;
}
function Vr(e, o, r) {
  const n = e / o;
  return n < 0.33 ? r.colors.primary : n < 0.66 ? r.colors.secondary : r.colors.tertiary;
}
function Xr(e, o, r, n) {
  const s = o / 2, i = r / 2, a = Math.sqrt(s * s + i * i), l = e.x - s, c = e.y - i, u = Math.sqrt(l * l + c * c) / a;
  return u < 0.33 ? n.colors.primary : u < 0.66 ? n.colors.secondary : n.colors.tertiary;
}
function jt() {
  if (typeof CSS > "u" || typeof CSS.supports != "function")
    return !1;
  try {
    return CSS.supports("filter", "blur(10px)");
  } catch {
    return !1;
  }
}
function Yt() {
  if (typeof document > "u")
    return !1;
  try {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg"), o = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    return e && o && typeof o.setAttribute == "function";
  } catch {
    return !1;
  }
}
function Vt() {
  if (typeof CSS > "u" || typeof CSS.supports != "function")
    return !1;
  try {
    return CSS.supports("mix-blend-mode", "screen");
  } catch {
    return !1;
  }
}
function qr() {
  return typeof requestAnimationFrame < "u";
}
function Ur() {
  if (typeof window > "u")
    return !1;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function Kr(e, o, r) {
  return Math.max(o, Math.min(r, e));
}
function Le(e, o = 1) {
  return e == null ? o : typeof e != "number" || isNaN(e) ? (console.warn("[CursorEffect] Invalid intensity value, using default:", o), o) : Kr(e, 0, 1);
}
function pt(e, o = 150) {
  return e == null ? o : typeof e != "number" || isNaN(e) || e < 0 ? (console.warn("[CursorEffect] Invalid proximity radius, using default:", o), o) : e;
}
function _e(e) {
  return e ? document.body.contains(e) : !1;
}
function Jr(e) {
  return e.width > 0 && e.height > 0;
}
function Qr(e) {
  if (!e || !_e(e))
    return new DOMRect(0, 0, 0, 0);
  try {
    return e.getBoundingClientRect();
  } catch (o) {
    return console.warn("[CursorEffect] Error getting element bounds:", o), new DOMRect(0, 0, 0, 0);
  }
}
function en() {
  const e = jt(), o = Yt(), r = Vt(), n = qr();
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
const Se = 20;
function tn(e, o) {
  const r = o.x - e.x, n = o.y - e.y;
  return Math.sqrt(r * r + n * n);
}
function pe(e) {
  return {
    x: e.left + e.width / 2,
    y: e.top + e.height / 2
  };
}
function on(e, o, r) {
  const n = Qr(e.ref.current);
  if (!Jr(n))
    return {
      ...e,
      bounds: n,
      distance: 1 / 0,
      isInProximity: !1,
      isHovered: !1
    };
  const s = pe(n), i = tn(o, s), a = i <= r, l = o.x >= n.left && o.x <= n.right && o.y >= n.top && o.y <= n.bottom;
  return {
    ...e,
    bounds: n,
    distance: i,
    isInProximity: a,
    isHovered: l
  };
}
function rn(e, o, r, n) {
  const s = /* @__PURE__ */ new Map();
  let i;
  if (n && e.size > Se) {
    const a = Math.max(
      r,
      ...Array.from(e.values()).map((l) => l.options.proximityRadius ?? r)
    );
    i = n.getNearbyElements(
      o.x,
      o.y,
      a
    );
  } else
    i = new Set(e.keys());
  return e.forEach((a, l) => {
    if (!a.ref.current) {
      s.set(l, a);
      return;
    }
    if (n && e.size > Se && !i.has(l)) {
      s.set(l, {
        ...a,
        distance: 1 / 0,
        isInProximity: !1,
        isHovered: !1
      });
      return;
    }
    const c = a.options.proximityRadius ?? r, d = on(
      a,
      o,
      c
    );
    s.set(l, d);
  }), s;
}
function nn(e, o) {
  o.forEach((r, n) => {
    const s = e.get(n);
    s && (!s.isInProximity && r.isInProximity && r.options.onProximityEnter?.(), s.isInProximity && !r.isInProximity && r.options.onProximityExit?.(), !s.isHovered && r.isHovered && r.options.onHover?.());
  });
}
class sn {
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
    const s = /* @__PURE__ */ new Set(), i = Math.ceil(n / this.cellSize), a = Math.floor(o / this.cellSize), l = Math.floor(r / this.cellSize);
    for (let c = -i; c <= i; c++)
      for (let d = -i; d <= i; d++) {
        const u = a + c, b = l + d, p = `${u},${b}`, f = this.cells.get(p);
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
    const n = pe(r.bounds), s = this.getCellKey(n.x, n.y);
    this.cells.has(s) || this.cells.set(s, /* @__PURE__ */ new Set()), this.cells.get(s).add(o);
  }
  /**
   * Remove an element from the grid
   * @param id Element ID
   * @param element Registered element with bounds (optional, for optimization)
   */
  removeElement(o, r) {
    if (r) {
      const n = pe(r.bounds), s = this.getCellKey(n.x, n.y), i = this.cells.get(s);
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
    const s = pe(r.bounds), i = pe(n.bounds), a = this.getCellKey(s.x, s.y), l = this.getCellKey(i.x, i.y);
    if (a !== l) {
      const c = this.cells.get(a);
      c && (c.delete(o), c.size === 0 && this.cells.delete(a)), this.cells.has(l) || this.cells.set(l, /* @__PURE__ */ new Set()), this.cells.get(l).add(o);
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
function an(e) {
  const o = Array.from(e.values()).filter((a) => a.isHovered);
  if (o.length === 0)
    return { sizeMultiplier: 1, opacityMultiplier: 1 };
  const r = {
    button: 5,
    draggable: 4,
    link: 3,
    card: 1,
    custom: 2
  }, s = o.reduce((a, l) => {
    const c = l.options.type || "custom", d = a.options.type || "custom", u = r[c] || 0, b = r[d] || 0;
    return u > b ? l : a;
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
function ln({ cursorState: e, config: o }) {
  const { currentTheme: r, position: n, velocity: s, isMoving: i, activeElements: a } = e, { intensity: l } = o, c = me(() => Vt(), []), { sizeMultiplier: d, opacityMultiplier: u } = an(a), b = r.glowSize * l * d, p = r.glowOpacity * l * u * (c ? 1 : 0.5), f = !i, m = Math.sqrt(s.x * s.x + s.y * s.y) > 10, g = m ? 1.2 : 1, w = m ? p * 1.3 : p;
  return /* @__PURE__ */ t(
    v.div,
    {
      className: "cursor-glow",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        width: b,
        height: b,
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
        x: n.x - b / 2,
        y: n.y - b / 2,
        // Apply current theme color
        backgroundColor: r.colors.primary,
        // Scale effect: pulse when stationary, trail when high velocity
        scale: f ? [1, 1.1, 1] : m ? g : 1,
        // Normal size when moving normally
        // Opacity effect: pulse when stationary, intensify for trail
        opacity: f ? [p, p * 1.5, p] : m ? w : p
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
function cn(e, o) {
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
function dn({ cursorState: e, config: o }) {
  const { activeElements: r, position: n, currentTheme: s } = e, { intensity: i } = o, a = me(() => Yt(), []), l = me(() => jt(), []), c = a || l, [d, u] = R(n);
  A(() => {
    const f = setTimeout(() => {
      u(n);
    }, 50);
    return () => clearTimeout(f);
  }, [n]);
  const b = s.distortionIntensity * i, p = Array.from(r.values()).filter(
    (f) => f.isHovered && f.options.distortion !== !1
  );
  return c ? /* @__PURE__ */ h(H, { children: [
    a && /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", "aria-hidden": "true", children: /* @__PURE__ */ h("defs", { children: [
      /* @__PURE__ */ h("filter", { id: "cursor-distortion", children: [
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
      /* @__PURE__ */ h("filter", { id: "cursor-wave", children: [
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
      /* @__PURE__ */ h("filter", { id: "cursor-goo", children: [
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
    /* @__PURE__ */ t(L, { children: p.map((f) => {
      const y = cn(
        f,
        b
      ), m = d.x - f.bounds.left, g = d.y - f.bounds.top, w = f.options.type === "card" ? "cursor-wave" : "cursor-distortion", x = a ? `url(#${w})` : l ? "blur(2px)" : "none";
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
            filter: x,
            pointerEvents: "none",
            willChange: "opacity",
            // Add gradient overlay for visual effect
            background: `radial-gradient(circle at ${m}px ${g}px, ${s.colors.primary}20, transparent 60%)`
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
function un(e, o) {
  if (!o.bounds || o.bounds.width === 0 || o.bounds.height === 0)
    return !1;
  const r = o.bounds.left + o.bounds.width / 2, n = o.bounds.top + o.bounds.height / 2, s = r - e.origin.x, i = n - e.origin.y, a = Math.sqrt(s * s + i * i), l = Math.sqrt(
    (o.bounds.width / 2) ** 2 + (o.bounds.height / 2) ** 2
  ), c = Math.max(0, a - l), d = a + l;
  return e.radius >= c && e.radius <= d;
}
class pn {
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
const mn = ({ cursorState: e, config: o }) => {
  const [r, n] = R([]), [s, i] = R(/* @__PURE__ */ new Map());
  F(0);
  const a = F(null), l = F(new pn());
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
      n((b) => [...b, u].slice(-o.maxWaves));
    };
    return window.addEventListener("click", c), () => window.removeEventListener("click", c);
  }, [e.currentTheme.colors.primary, o.maxWaves]), A(() => {
    const c = () => {
      const d = Date.now();
      n((u) => {
        const b = u.map((f) => {
          const y = f.radius + 5, m = f.opacity * 0.98;
          return {
            ...f,
            radius: y,
            opacity: m
          };
        }).filter((f) => {
          const y = f.radius < f.maxRadius && f.opacity > 0.01;
          return y || l.current.cleanupWave(f.id), y;
        }), p = /* @__PURE__ */ new Map();
        for (const f of b)
          for (const [y, m] of e.activeElements)
            if (un(f, m) && !l.current.hasCollided(f.id, y)) {
              l.current.recordCollision(f.id, y);
              const g = p.get(y), w = f.opacity;
              g ? p.set(y, {
                elementId: y,
                intensity: Math.min(1, g.intensity + w),
                timestamp: d
              }) : p.set(y, {
                elementId: y,
                intensity: w,
                timestamp: d
              });
            }
        return i(p), b;
      }), a.current = requestAnimationFrame(c);
    };
    return a.current = requestAnimationFrame(c), () => {
      a.current !== null && cancelAnimationFrame(a.current);
    };
  }, [e.activeElements]), /* @__PURE__ */ h(H, { children: [
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
function hn(e, o, r, n) {
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
function fn({ cursorState: e, config: o }) {
  const { activeElements: r, position: n, velocity: s, currentTheme: i } = e, [a, l] = R([]), c = F(0), d = F(), b = Array.from(r.values()).filter(
    (p) => p.isHovered && p.options.type === "link"
  ).length > 0;
  return A(() => {
    if (!b) return;
    const p = Date.now();
    if (p - c.current > 50) {
      const y = hn(
        n.x,
        n.y,
        i.colors.primary,
        s
      );
      l((m) => [...m, y]), c.current = p;
    }
  }, [b, n, s, i]), A(() => {
    const p = () => {
      l((f) => f.map((y) => {
        const m = y.x + y.vx, g = y.y + y.vy, w = y.life - 1 / 60 / y.maxLife, x = y.vy + 0.1;
        return {
          ...y,
          x: m,
          y: g,
          vy: x,
          life: w
        };
      }).filter((y) => y.life > 0)), d.current = requestAnimationFrame(p);
    };
    return d.current = requestAnimationFrame(p), () => {
      d.current && cancelAnimationFrame(d.current);
    };
  }, []), A(() => {
    a.length > 100 && l((p) => p.slice(-100));
  }, [a.length]), /* @__PURE__ */ t("div", { className: "particle-system", "aria-hidden": "true", style: { pointerEvents: "none" }, children: /* @__PURE__ */ t(L, { children: a.map((p) => /* @__PURE__ */ t(
    v.div,
    {
      className: "particle",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: p.x,
        top: p.y,
        width: p.size,
        height: p.size,
        borderRadius: "50%",
        backgroundColor: p.color,
        pointerEvents: "none",
        willChange: "opacity"
      },
      initial: { opacity: 1 },
      animate: { opacity: p.life },
      exit: { opacity: 0 },
      transition: { duration: 0.1 }
    },
    p.id
  )) }) });
}
const gn = 50;
function bn(e, o, r, n, s = "attract", i = 0.5) {
  if (s === "none" || r > n)
    return { x: 0, y: 0 };
  const a = Math.max(0, Math.min(1, i));
  if (a === 0)
    return { x: 0, y: 0 };
  const l = o.x - e.x, c = o.y - e.y;
  if (r === 0)
    return { x: 0, y: 0 };
  const d = l / r, u = c / r, f = (n - r) / n * a * gn, y = s === "repel" ? -1 : 1;
  return {
    x: d * f * y,
    y: u * f * y
  };
}
function yn(e, o, r) {
  const n = {
    x: e.bounds.left + e.bounds.width / 2,
    y: e.bounds.top + e.bounds.height / 2
  }, s = e.options.proximityRadius ?? r, i = e.options.attraction ?? "none", a = e.options.attractionStrength ?? 0.5;
  return bn(
    n,
    o,
    e.distance,
    s,
    i,
    a
  );
}
function xn(e, o, r) {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    if (!s.options.attraction || s.options.attraction === "none") {
      n.set(i, { x: 0, y: 0 });
      return;
    }
    const a = yn(
      s,
      o,
      r
    );
    n.set(i, a);
  }), n;
}
function vn(e) {
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
function wn({ cursorState: e, config: o }) {
  const { activeElements: r, position: n } = e;
  return A(() => o.effects.attraction ? (xn(
    r,
    n,
    o.proximityRadius
  ).forEach((i, a) => {
    const l = r.get(a);
    if (!l || !l.ref.current)
      return;
    if (!isFinite(i.x) || !isFinite(i.y)) {
      console.warn("[CursorEffect] Invalid displacement values for element:", a);
      return;
    }
    const c = vn(l.options.type), d = i.x * c, u = i.y * c;
    try {
      l.ref.current.style.transform = `translate(${d}px, ${u}px)`, l.ref.current.style.transition = "transform 0.2s ease-out", l.options.type === "draggable" && l.isInProximity ? l.ref.current.style.cursor = "grab" : l.options.type === "draggable" && l.isHovered ? l.ref.current.style.cursor = "grabbing" : l.options.type === "draggable" && (l.ref.current.style.cursor = "");
    } catch (b) {
      console.warn("[CursorEffect] Error applying transform to element:", a, b);
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
    /* @__PURE__ */ h(
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
          o.effects.glow && /* @__PURE__ */ t(ln, { cursorState: e, config: o }),
          o.effects.distortion && /* @__PURE__ */ t(dn, { cursorState: e, config: o }),
          o.effects.waves && /* @__PURE__ */ t(mn, { cursorState: e, config: o }),
          o.effects.particles && /* @__PURE__ */ t(fn, { cursorState: e, config: o })
        ]
      }
    ),
    document.body
  );
}
const Xt = We(null);
function kn() {
  const e = Ie(Xt);
  if (!e)
    throw new Error("useCursorContext must be used within CursorEffectProvider");
  return e;
}
function qt() {
  if (typeof window > "u")
    return { hasTouch: !1, hasMouse: !0 };
  const e = "ontouchstart" in window || navigator.maxTouchPoints > 0, o = window.matchMedia("(pointer: fine)").matches;
  return { hasTouch: e, hasMouse: o };
}
function mt(e) {
  const { hasTouch: o, hasMouse: r } = qt();
  return !(Ur() || e.disableOnMobile && o || o && !r);
}
function Dn({ config: e = {}, children: o }) {
  const r = F(en()), n = {
    ...ue,
    ...e,
    // Validate and clamp intensity to 0-1 range for error handling
    intensity: Le(e.intensity, ue.intensity),
    // Validate proximity radius
    proximityRadius: pt(e.proximityRadius, ue.proximityRadius),
    effects: {
      ...ue.effects,
      ...e.effects,
      // Disable distortion if browser doesn't support filters
      distortion: (e.effects?.distortion ?? ue.effects.distortion) && r.current.canUseDistortion
    }
  }, [s, i] = R(
    () => mt(n)
  ), a = Zt(n.theme), [l, c] = R({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, magnitude: 0 },
    isMoving: !1,
    isClicking: !1,
    currentTheme: a,
    activeElements: /* @__PURE__ */ new Map()
  }), d = F(!1), u = F(new sn()), b = X((m) => {
    c((g) => {
      const w = jr(
        m.position,
        n
      ), x = rn(
        g.activeElements,
        m.position,
        n.proximityRadius,
        g.activeElements.size > Se ? u.current : void 0
      );
      return nn(g.activeElements, x), {
        ...g,
        position: m.position,
        velocity: m.velocity,
        isMoving: m.isMoving,
        isClicking: m.isClicking,
        currentTheme: w,
        activeElements: x
      };
    });
  }, [n]), p = X(
    (m, g, w) => {
      if (!g.current) {
        console.warn("[CursorEffect] Attempted to register element with null ref:", m);
        return;
      }
      if (!_e(g.current)) {
        console.warn("[CursorEffect] Attempted to register detached element:", m);
        return;
      }
      c((x) => {
        const T = new Map(x.activeElements), I = g.current?.getBoundingClientRect() || new DOMRect(), $ = {
          ...w,
          intensity: w.intensity !== void 0 ? Le(w.intensity, 1) : void 0,
          proximityRadius: w.proximityRadius !== void 0 ? pt(w.proximityRadius, n.proximityRadius) : void 0,
          attractionStrength: w.attractionStrength !== void 0 ? Le(w.attractionStrength, 0.5) : void 0
        }, N = {
          id: m,
          ref: g,
          options: $,
          bounds: I,
          distance: 1 / 0,
          isInProximity: !1,
          isHovered: !1
        };
        return T.set(m, N), I.width > 0 && I.height > 0 && u.current.addElement(m, N), {
          ...x,
          activeElements: T
        };
      });
    },
    [n.proximityRadius]
  ), f = X((m) => {
    c((g) => {
      const w = g.activeElements.get(m), x = new Map(g.activeElements);
      return x.delete(m), w && u.current.removeElement(m, w), {
        ...g,
        activeElements: x
      };
    });
  }, []);
  A(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)"), g = (w) => {
      w.matches ? i(!1) : i(mt(n));
    };
    if (m.addEventListener)
      return m.addEventListener("change", g), () => {
        m.removeEventListener("change", g);
      };
    if (m.addListener)
      return m.addListener(g), () => {
        m.removeListener(g);
      };
  }, [n]), A(() => {
    if (!s) return;
    const { hasTouch: m, hasMouse: g } = qt();
    if (m && g && !d.current) {
      const w = () => {
        d.current = !0, i(!0);
      };
      return window.addEventListener("mousemove", w, { once: !0 }), () => {
        window.removeEventListener("mousemove", w);
      };
    }
  }, [s]), A(() => {
    if (!s || l.activeElements.size <= Se)
      return;
    const m = setInterval(() => {
      u.current.rebuild(l.activeElements);
    }, 1e3);
    return () => {
      clearInterval(m);
    };
  }, [s, l.activeElements]), A(() => {
    if (!s) return;
    const m = setInterval(() => {
      const g = [];
      l.activeElements.forEach((w, x) => {
        (!w.ref.current || !_e(w.ref.current)) && g.push(x);
      }), g.length > 0 && g.forEach((w) => {
        f(w);
      });
    }, 2e3);
    return () => {
      clearInterval(m);
    };
  }, [s, l.activeElements, f]);
  const y = {
    state: l,
    registerElement: p,
    unregisterElement: f,
    config: n
  };
  return s ? /* @__PURE__ */ h(Xt.Provider, { value: y, children: [
    /* @__PURE__ */ t(Zr, { onStateChange: b }),
    /* @__PURE__ */ t(wn, { cursorState: l, config: n }),
    o
  ] }) : /* @__PURE__ */ t(H, { children: o });
}
function _n(e = {}) {
  const { registerElement: o, unregisterElement: r } = kn(), n = F(null), s = F(`cursor-element-${Math.random().toString(36).substr(2, 9)}`);
  return A(() => {
    const i = s.current;
    return n.current && o(i, n, e), () => {
      r(i);
    };
  }, [o, r, e]), n;
}
const ht = 65, Cn = ({ index: e, total: o }) => {
  const r = Math.random() > 0.7, s = `${r ? 4 + Math.random() * 11 : 0.5 + Math.random() * 2}vw`, i = e / o * 100, a = (Math.random() - 0.5) * (r ? 10 : 18), l = `${Math.max(-15, Math.min(115, i + a))}%`, c = (r ? 2.8 : 2.2) + Math.random() * 1.6, d = Math.random() * 1;
  return /* @__PURE__ */ t(
    v.div,
    {
      className: "absolute top-0",
      style: {
        width: s,
        left: l,
        height: "170vh",
        backgroundColor: "#8B0000",
        transformOrigin: "top",
        opacity: 0.88,
        borderRadius: r ? "50%" : "45% 55% 45% 55%"
      },
      initial: { y: "-170vh" },
      animate: { y: "110vh" },
      transition: {
        duration: c,
        ease: [0.45, 0.05, 0.55, 0.95],
        // Smoother, more organic easing
        delay: d
      }
    }
  );
}, Hn = ({
  isNavigating: e,
  onComplete: o,
  className: r
}) => (A(() => {
  if (e) {
    document.body.style.overflow = "hidden";
    const n = setTimeout(() => {
      o?.(), document.body.style.overflow = "";
    }, 3500);
    return () => clearTimeout(n);
  }
}, [e, o]), /* @__PURE__ */ t(L, { children: e && /* @__PURE__ */ h(
  v.div,
  {
    className: S(
      "fixed inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center",
      r
    ),
    initial: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
    "data-testid": "blood-smear-overlay",
    children: [
      /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: "blood-goo", colorInterpolationFilters: "sRGB", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
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
            scale: "8",
            xChannelSelector: "R",
            yChannelSelector: "G",
            result: "organic"
          }
        ),
        /* @__PURE__ */ t("feGaussianBlur", { in: "organic", stdDeviation: "22", result: "blur" }),
        /* @__PURE__ */ t(
          "feColorMatrix",
          {
            in: "blur",
            mode: "matrix",
            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9",
            result: "goo"
          }
        ),
        /* @__PURE__ */ t("feGaussianBlur", { in: "goo", stdDeviation: "3", result: "smoothGoo" }),
        /* @__PURE__ */ t("feGaussianBlur", { in: "smoothGoo", stdDeviation: "1", result: "ultraSmooth" }),
        /* @__PURE__ */ t(
          "feColorMatrix",
          {
            in: "ultraSmooth",
            type: "matrix",
            values: `0.85 0 0 0 0\r
                          0 0.08 0 0 0\r
                          0 0 0.08 0 0\r
                          0 0 0 1 0`,
            result: "bloodColor"
          }
        ),
        /* @__PURE__ */ t("feGaussianBlur", { in: "bloodColor", stdDeviation: "4", result: "highlightBlur" }),
        /* @__PURE__ */ t(
          "feSpecularLighting",
          {
            in: "highlightBlur",
            surfaceScale: "6",
            specularConstant: "1.0",
            specularExponent: "20",
            lightingColor: "#ffffff",
            result: "whiteHighlight",
            children: /* @__PURE__ */ t("fePointLight", { x: "200", y: "80", z: "250" })
          }
        ),
        /* @__PURE__ */ t("feComposite", { in: "whiteHighlight", in2: "bloodColor", operator: "in", result: "highlightInBlood" }),
        /* @__PURE__ */ t(
          "feComposite",
          {
            in: "bloodColor",
            in2: "highlightInBlood",
            operator: "arithmetic",
            k1: "0",
            k2: "1",
            k3: "0.3",
            k4: "0",
            result: "withHighlight"
          }
        ),
        /* @__PURE__ */ t(
          "feSpecularLighting",
          {
            in: "highlightBlur",
            surfaceScale: "3",
            specularConstant: "0.5",
            specularExponent: "12",
            lightingColor: "#cc0000",
            result: "redShine",
            children: /* @__PURE__ */ t("fePointLight", { x: "100", y: "150", z: "180" })
          }
        ),
        /* @__PURE__ */ t("feComposite", { in: "redShine", in2: "withHighlight", operator: "in", result: "shineInBlood" }),
        /* @__PURE__ */ t(
          "feComposite",
          {
            in: "withHighlight",
            in2: "shineInBlood",
            operator: "arithmetic",
            k1: "0",
            k2: "1",
            k3: "0.12",
            k4: "0",
            result: "final"
          }
        ),
        /* @__PURE__ */ t("feGaussianBlur", { in: "final", stdDeviation: "0.5", result: "finalSmooth" })
      ] }) }) }),
      /* @__PURE__ */ h(
        "div",
        {
          className: "absolute inset-0 w-full h-full",
          style: { filter: "url(#blood-goo)" },
          children: [
            Array.from({ length: ht }).map((n, s) => /* @__PURE__ */ t(Cn, { index: s, total: ht }, s)),
            /* @__PURE__ */ t(
              v.div,
              {
                className: "absolute top-0 left-0 right-0 h-[200vh]",
                style: {
                  backgroundColor: "#8B0000"
                },
                initial: { y: "-200%" },
                animate: { y: "100%" },
                transition: {
                  duration: 3.4,
                  ease: [0.45, 0.05, 0.55, 0.95],
                  // Matching smooth easing
                  delay: 0.25
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(
        v.div,
        {
          className: "absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/8",
          initial: { opacity: 0 },
          animate: { opacity: [0, 0.4, 0] },
          transition: { duration: 3, times: [0, 0.5, 1] }
        }
      )
    ]
  }
) })), Wn = ({
  isActive: e,
  onComplete: o,
  duration: r = 1.2
}) => /* @__PURE__ */ t(L, { onExitComplete: o, children: e && /* @__PURE__ */ h(v.div, { className: "fixed inset-0 z-50 pointer-events-none overflow-hidden", children: [
  Array.from({ length: 8 }).map((n, s) => /* @__PURE__ */ t(
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
      exit: { scaleY: 0, opacity: 0 },
      transition: {
        duration: r * 0.6,
        delay: s * 0.1,
        ease: "easeOut"
      }
    },
    s
  )),
  /* @__PURE__ */ t(
    v.div,
    {
      className: "absolute inset-0 bg-black",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: r * 0.4, delay: r * 0.6 }
    }
  )
] }) }), Zn = ({
  className: e,
  onComplete: o
}) => {
  const [r, n] = R(!1), [s, i] = R(!1), [a, l] = R({ x: 0, y: 0 }), [c, d] = R({
    width: typeof window < "u" ? window.innerWidth : 1920,
    height: typeof window < "u" ? window.innerHeight : 1080
  }), u = [
    { id: 0, size: 150, x: 10, y: 20, op: 0.8 },
    { id: 1, size: 200, x: 25, y: 60, op: 0.9 },
    { id: 2, size: 120, x: 40, y: 15, op: 0.7 },
    { id: 3, size: 180, x: 55, y: 70, op: 0.85 },
    { id: 4, size: 250, x: 70, y: 30, op: 1 },
    { id: 5, size: 140, x: 15, y: 80, op: 0.75 },
    { id: 6, size: 220, x: 85, y: 50, op: 0.95 },
    { id: 7, size: 160, x: 45, y: 85, op: 0.8 },
    { id: 8, size: 190, x: 90, y: 15, op: 0.9 },
    { id: 9, size: 130, x: 60, y: 45, op: 0.6 }
  ];
  A(() => {
    if (!s) return;
    const f = (y) => {
      l({ x: y.clientX, y: y.clientY });
    };
    return window.addEventListener("mousemove", f), () => {
      window.removeEventListener("mousemove", f);
    };
  }, [s]), A(() => {
    if (!s) return;
    const f = () => {
      d({ width: window.innerWidth, height: window.innerHeight });
    };
    return window.addEventListener("resize", f), () => {
      window.removeEventListener("resize", f);
    };
  }, [s]), A(() => {
    if (s) {
      n(!0);
      const f = setTimeout(() => {
        n(!1);
      }, 1500);
      return () => {
        clearTimeout(f);
      };
    }
  }, [s]);
  const b = X(() => {
    i(!0);
  }, []), p = X(() => {
    i(!1), o?.();
  }, [o]);
  return /* @__PURE__ */ h(H, { children: [
    /* @__PURE__ */ t("style", { dangerouslySetInnerHTML: {
      __html: `
          @keyframes flap {
            0% { transform: scaleY(1) scaleX(1); }
            100% { transform: scaleY(0.4) scaleX(0.8); }
          }
        `
    } }),
    /* @__PURE__ */ t(
      "div",
      {
        className: e,
        onMouseEnter: b,
        onMouseLeave: p,
        children: /* @__PURE__ */ t(L, { children: s && /* @__PURE__ */ h(
          v.div,
          {
            className: "fixed inset-0 pointer-events-none",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.3 },
            children: [
              /* @__PURE__ */ t(
                v.div,
                {
                  className: "fixed inset-0 bg-red-950/30 backdrop-blur-[2px] pointer-events-none",
                  style: { zIndex: 9990 },
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.3 }
                }
              ),
              r && /* @__PURE__ */ t(At, {}),
              u.map((f) => /* @__PURE__ */ t(
                $t,
                {
                  id: f.id,
                  size: f.size,
                  homeX: f.x,
                  homeY: f.y,
                  opacity: f.op,
                  isHovered: s,
                  mousePos: a,
                  windowSize: c
                },
                f.id
              ))
            ]
          }
        ) })
      }
    )
  ] });
}, ft = 40, Mn = ["bg-[#A855F7]"], Nn = ({ index: e, total: o }) => {
  const r = Math.random() > 0.7, s = `${r ? 10 + Math.random() * 15 : 2 + Math.random() * 6}vw`, i = e / o * 100, a = (Math.random() - 0.5) * (r ? 5 : 10), l = `${Math.max(-20, Math.min(120, i + a))}%`, c = Mn[0], d = (r ? 3 : 2) + Math.random() * 1.5, u = Math.random() * 0.5;
  return /* @__PURE__ */ t(
    v.div,
    {
      className: S(
        "absolute top-0 rounded-full opacity-100",
        c
      ),
      style: {
        width: s,
        left: l,
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
}, jn = ({ isActive: e, onComplete: o }) => (A(() => {
  if (e) {
    document.body.style.overflow = "hidden";
    const r = setTimeout(() => {
      o?.(), document.body.style.overflow = "";
    }, 4500);
    return () => clearTimeout(r);
  }
}, [e, o]), /* @__PURE__ */ t(L, { children: e && /* @__PURE__ */ h(
  v.div,
  {
    className: "fixed inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center",
    initial: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
    "data-testid": "spectral-river-overlay",
    children: [
      /* @__PURE__ */ t("svg", { className: "absolute w-0 h-0", children: /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ h("filter", { id: "spectral-goo", colorInterpolationFilters: "sRGB", children: [
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
      /* @__PURE__ */ h(
        "div",
        {
          className: "absolute inset-0 w-full h-full",
          style: { filter: "url(#spectral-goo)" },
          children: [
            Array.from({ length: ft }).map((r, n) => /* @__PURE__ */ t(Nn, { index: n, total: ft }, n)),
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
) }));
export {
  $t as AnimatedBat,
  Zn as BatBurst,
  Ve as BatIcon,
  Hn as BloodSmear,
  fr as CoffinCard,
  Dn as CursorEffectProvider,
  Zr as CursorTracker,
  ue as DEFAULT_CURSOR_CONFIG,
  dn as DistortionField,
  wn as EffectRenderer,
  On as GhostCursor,
  An as GhostToastProvider,
  ln as GlowAura,
  jo as GooeyButton,
  Yo as GooeyCard,
  Rr as GooeyProgressBar,
  Lt as GooeySidebar,
  Nr as GooeySidebarDemo,
  Rn as GraveModal,
  ie as HauntedCard,
  vr as HauntedVignette,
  Gn as HauntedVignetteDemo,
  At as JumpscareBat,
  mr as MoonlightSwitch,
  Hr as PRESET_THEMES,
  fn as ParticleSystem,
  Wn as ShadowCrawl,
  V as SkeletonBlock,
  jn as SpectralRiver,
  Bn as SpectralTabs,
  gr as SpiritInput,
  Sr as SpookyGhostIcon,
  Ln as SpookyScrollbar,
  Fn as SpookySkeleton,
  Gt as SpookyTooltip,
  pr as ThemeProvider,
  mn as WaveGenerator,
  zr as WhisperBox,
  Pn as WispTrail,
  kn as useCursorContext,
  _n as useCursorEffect,
  $n as useGhostToast,
  Tn as useTheme,
  oe as useThemeOptional
};
