import { a as Q } from "./alloc.bd7ddb36.mjs";
function X(e, t) {
  if (e.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), n = 0; n < r.length; n++)
    r[n] = 255;
  for (var o = 0; o < e.length; o++) {
    var s = e.charAt(o), c = s.charCodeAt(0);
    if (r[c] !== 255)
      throw new TypeError(s + " is ambiguous");
    r[c] = o;
  }
  var i = e.length, h = e.charAt(0), M = Math.log(i) / Math.log(256), u = Math.log(256) / Math.log(i);
  function S(a) {
    if (a instanceof Uint8Array || (ArrayBuffer.isView(a) ? a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength) : Array.isArray(a) && (a = Uint8Array.from(a))), !(a instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (a.length === 0)
      return "";
    for (var f = 0, x = 0, l = 0, w = a.length; l !== w && a[l] === 0; )
      l++, f++;
    for (var y = (w - l) * u + 1 >>> 0, b = new Uint8Array(y); l !== w; ) {
      for (var g = a[l], m = 0, p = y - 1; (g !== 0 || m < x) && p !== -1; p--, m++)
        g += 256 * b[p] >>> 0, b[p] = g % i >>> 0, g = g / i >>> 0;
      if (g !== 0)
        throw new Error("Non-zero carry");
      x = m, l++;
    }
    for (var v = y - x; v !== y && b[v] === 0; )
      v++;
    for (var A = h.repeat(f); v < y; ++v)
      A += e.charAt(b[v]);
    return A;
  }
  function T(a) {
    if (typeof a != "string")
      throw new TypeError("Expected String");
    if (a.length === 0)
      return new Uint8Array();
    var f = 0;
    if (a[f] !== " ") {
      for (var x = 0, l = 0; a[f] === h; )
        x++, f++;
      for (var w = (a.length - f) * M + 1 >>> 0, y = new Uint8Array(w); a[f]; ) {
        var b = r[a.charCodeAt(f)];
        if (b === 255)
          return;
        for (var g = 0, m = w - 1; (b !== 0 || g < l) && m !== -1; m--, g++)
          b += i * y[m] >>> 0, y[m] = b % 256 >>> 0, b = b / 256 >>> 0;
        if (b !== 0)
          throw new Error("Non-zero carry");
        l = g, f++;
      }
      if (a[f] !== " ") {
        for (var p = w - l; p !== w && y[p] === 0; )
          p++;
        for (var v = new Uint8Array(x + (w - p)), A = x; p !== w; )
          v[A++] = y[p++];
        return v;
      }
    }
  }
  function I(a) {
    var f = T(a);
    if (f)
      return f;
    throw new Error(`Non-${t} character`);
  }
  return {
    encode: S,
    decodeUnsafe: T,
    decode: I
  };
}
var Z = X, H = Z;
const D = (e) => {
  if (e instanceof Uint8Array && e.constructor.name === "Uint8Array")
    return e;
  if (e instanceof ArrayBuffer)
    return new Uint8Array(e);
  if (ArrayBuffer.isView(e))
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  throw new Error("Unknown type, must be binary type");
}, W = (e) => new TextEncoder().encode(e), Y = (e) => new TextDecoder().decode(e);
class ee {
  constructor(t, r, n) {
    this.name = t, this.prefix = r, this.baseEncode = n;
  }
  encode(t) {
    if (t instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(t)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class te {
  constructor(t, r, n) {
    if (this.name = t, this.prefix = r, r.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = r.codePointAt(0), this.baseDecode = n;
  }
  decode(t) {
    if (typeof t == "string") {
      if (t.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(t)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(t.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(t) {
    return F(this, t);
  }
}
class re {
  constructor(t) {
    this.decoders = t;
  }
  or(t) {
    return F(this, t);
  }
  decode(t) {
    const r = t[0], n = this.decoders[r];
    if (n)
      return n.decode(t);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(t)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const F = (e, t) => new re({
  ...e.decoders || { [e.prefix]: e },
  ...t.decoders || { [t.prefix]: t }
});
class ne {
  constructor(t, r, n, o) {
    this.name = t, this.prefix = r, this.baseEncode = n, this.baseDecode = o, this.encoder = new ee(t, r, n), this.decoder = new te(t, r, o);
  }
  encode(t) {
    return this.encoder.encode(t);
  }
  decode(t) {
    return this.decoder.decode(t);
  }
}
const O = ({ name: e, prefix: t, encode: r, decode: n }) => new ne(e, t, r, n), _ = ({ prefix: e, name: t, alphabet: r }) => {
  const { encode: n, decode: o } = H(r, t);
  return O({
    prefix: e,
    name: t,
    encode: n,
    decode: (s) => D(o(s))
  });
}, oe = (e, t, r, n) => {
  const o = {};
  for (let u = 0; u < t.length; ++u)
    o[t[u]] = u;
  let s = e.length;
  for (; e[s - 1] === "="; )
    --s;
  const c = new Uint8Array(s * r / 8 | 0);
  let i = 0, h = 0, M = 0;
  for (let u = 0; u < s; ++u) {
    const S = o[e[u]];
    if (S === void 0)
      throw new SyntaxError(`Non-${n} character`);
    h = h << r | S, i += r, i >= 8 && (i -= 8, c[M++] = 255 & h >> i);
  }
  if (i >= r || 255 & h << 8 - i)
    throw new SyntaxError("Unexpected end of data");
  return c;
}, ae = (e, t, r) => {
  const n = t[t.length - 1] === "=", o = (1 << r) - 1;
  let s = "", c = 0, i = 0;
  for (let h = 0; h < e.length; ++h)
    for (i = i << 8 | e[h], c += 8; c > r; )
      c -= r, s += t[o & i >> c];
  if (c && (s += t[o & i << r - c]), n)
    for (; s.length * r & 7; )
      s += "=";
  return s;
}, d = ({ name: e, prefix: t, bitsPerChar: r, alphabet: n }) => O({
  prefix: t,
  name: e,
  encode(o) {
    return ae(o, n, r);
  },
  decode(o) {
    return oe(o, n, r, e);
  }
}), se = O({
  prefix: "\0",
  name: "identity",
  encode: (e) => Y(e),
  decode: (e) => W(e)
}), ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: se
}, Symbol.toStringTag, { value: "Module" })), ce = d({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
}), de = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: ce
}, Symbol.toStringTag, { value: "Module" })), fe = d({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
}), be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: fe
}, Symbol.toStringTag, { value: "Module" })), he = _({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
}), le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: he
}, Symbol.toStringTag, { value: "Module" })), pe = d({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
}), ue = d({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
}), we = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: pe,
  base16upper: ue
}, Symbol.toStringTag, { value: "Module" })), ye = d({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
}), ge = d({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
}), ve = d({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
}), me = d({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
}), xe = d({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
}), _e = d({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
}), Se = d({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
}), Ae = d({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
}), Oe = d({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
}), Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: ye,
  base32upper: ge,
  base32pad: ve,
  base32padupper: me,
  base32hex: xe,
  base32hexupper: _e,
  base32hexpad: Se,
  base32hexpadupper: Ae,
  base32z: Oe
}, Symbol.toStringTag, { value: "Module" })), Ue = _({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), Ee = _({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: Ue,
  base36upper: Ee
}, Symbol.toStringTag, { value: "Module" })), Te = _({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), Ce = _({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: Te,
  base58flickr: Ce
}, Symbol.toStringTag, { value: "Module" })), Pe = d({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
}), $e = d({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
}), Ne = d({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
}), Be = d({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
}), De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: Pe,
  base64pad: $e,
  base64url: Ne,
  base64urlpad: Be
}, Symbol.toStringTag, { value: "Module" })), k = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"), Fe = k.reduce((e, t, r) => (e[r] = t, e), []), ke = k.reduce((e, t, r) => (e[t.codePointAt(0)] = r, e), []);
function Re(e) {
  return e.reduce((t, r) => (t += Fe[r], t), "");
}
function Le(e) {
  const t = [];
  for (const r of e) {
    const n = ke[r.codePointAt(0)];
    if (n === void 0)
      throw new Error(`Non-base256emoji character: ${r}`);
    t.push(n);
  }
  return new Uint8Array(t);
}
const Ve = O({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: Re,
  decode: Le
}), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: Ve
}, Symbol.toStringTag, { value: "Module" }));
var qe = R, C = 128, Ke = 127, Ge = ~Ke, Ie = Math.pow(2, 31);
function R(e, t, r) {
  t = t || [], r = r || 0;
  for (var n = r; e >= Ie; )
    t[r++] = e & 255 | C, e /= 128;
  for (; e & Ge; )
    t[r++] = e & 255 | C, e >>>= 7;
  return t[r] = e | 0, R.bytes = r - n + 1, t;
}
var Qe = E, Xe = 128, z = 127;
function E(e, n) {
  var r = 0, n = n || 0, o = 0, s = n, c, i = e.length;
  do {
    if (s >= i)
      throw E.bytes = 0, new RangeError("Could not decode varint");
    c = e[s++], r += o < 28 ? (c & z) << o : (c & z) * Math.pow(2, o), o += 7;
  } while (c >= Xe);
  return E.bytes = s - n, r;
}
var Ze = Math.pow(2, 7), He = Math.pow(2, 14), We = Math.pow(2, 21), Ye = Math.pow(2, 28), et = Math.pow(2, 35), tt = Math.pow(2, 42), rt = Math.pow(2, 49), nt = Math.pow(2, 56), ot = Math.pow(2, 63), at = function(e) {
  return e < Ze ? 1 : e < He ? 2 : e < We ? 3 : e < Ye ? 4 : e < et ? 5 : e < tt ? 6 : e < rt ? 7 : e < nt ? 8 : e < ot ? 9 : 10;
}, st = {
  encode: qe,
  decode: Qe,
  encodingLength: at
}, L = st;
const P = (e, t, r = 0) => (L.encode(e, t, r), t), $ = (e) => L.encodingLength(e), j = (e, t) => {
  const r = t.byteLength, n = $(e), o = n + $(r), s = new Uint8Array(o + r);
  return P(e, s, 0), P(r, s, n), s.set(t, o), new it(e, r, t, s);
};
class it {
  constructor(t, r, n, o) {
    this.code = t, this.size = r, this.digest = n, this.bytes = o;
  }
}
const V = ({ name: e, code: t, encode: r }) => new ct(e, t, r);
class ct {
  constructor(t, r, n) {
    this.name = t, this.code = r, this.encode = n;
  }
  digest(t) {
    if (t instanceof Uint8Array) {
      const r = this.encode(t);
      return r instanceof Uint8Array ? j(this.code, r) : r.then((n) => j(this.code, n));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const J = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t)), dt = V({
  name: "sha2-256",
  code: 18,
  encode: J("SHA-256")
}), ft = V({
  name: "sha2-512",
  code: 19,
  encode: J("SHA-512")
}), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256: dt,
  sha512: ft
}, Symbol.toStringTag, { value: "Module" })), q = 0, ht = "identity", K = D, lt = (e) => j(q, K(e)), pt = { code: q, name: ht, encode: K, digest: lt }, ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: pt
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const N = { ...ie, ...de, ...be, ...le, ...we, ...Me, ...je, ...ze, ...De, ...Je };
({ ...bt, ...ut });
function G(e, t, r, n) {
  return {
    name: e,
    prefix: t,
    encoder: {
      name: e,
      prefix: t,
      encode: r
    },
    decoder: {
      decode: n
    }
  };
}
const B = G("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), U = G("ascii", "a", (e) => {
  let t = "a";
  for (let r = 0; r < e.length; r++)
    t += String.fromCharCode(e[r]);
  return t;
}, (e) => {
  e = e.substring(1);
  const t = Q(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t;
}), wt = {
  utf8: B,
  "utf-8": B,
  hex: N.base16,
  latin1: U,
  ascii: U,
  binary: U,
  ...N
};
function gt(e, t = "utf8") {
  const r = wt[t];
  if (r == null)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("utf8") : r.encoder.encode(e).substring(1);
}
export {
  gt as toString
};
