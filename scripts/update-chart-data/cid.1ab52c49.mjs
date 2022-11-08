var W = q, k = 128, X = 127, Z = ~X, _ = Math.pow(2, 31);
function q(r, e, t) {
  e = e || [], t = t || 0;
  for (var n = t; r >= _; )
    e[t++] = r & 255 | k, r /= 128;
  for (; r & Z; )
    e[t++] = r & 255 | k, r >>>= 7;
  return e[t] = r | 0, q.bytes = t - n + 1, e;
}
var Y = L, H = 128, j = 127;
function L(r, n) {
  var t = 0, n = n || 0, o = 0, s = n, i, a = r.length;
  do {
    if (s >= a)
      throw L.bytes = 0, new RangeError("Could not decode varint");
    i = r[s++], t += o < 28 ? (i & j) << o : (i & j) * Math.pow(2, o), o += 7;
  } while (i >= H);
  return L.bytes = s - n, t;
}
var ee = Math.pow(2, 7), te = Math.pow(2, 14), re = Math.pow(2, 21), ne = Math.pow(2, 28), oe = Math.pow(2, 35), se = Math.pow(2, 42), ie = Math.pow(2, 49), ce = Math.pow(2, 56), ae = Math.pow(2, 63), de = function(r) {
  return r < ee ? 1 : r < te ? 2 : r < re ? 3 : r < ne ? 4 : r < oe ? 5 : r < se ? 6 : r < ie ? 7 : r < ce ? 8 : r < ae ? 9 : 10;
}, he = {
  encode: W,
  decode: Y,
  encodingLength: de
}, O = he;
const B = (r, e = 0) => [
  O.decode(r, e),
  O.decode.bytes
], $ = (r, e, t = 0) => (O.encode(r, e, t), e), V = (r) => O.encodingLength(r), fe = (r, e) => {
  if (r === e)
    return !0;
  if (r.byteLength !== e.byteLength)
    return !1;
  for (let t = 0; t < r.byteLength; t++)
    if (r[t] !== e[t])
      return !1;
  return !0;
}, T = (r) => {
  if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
    return r;
  if (r instanceof ArrayBuffer)
    return new Uint8Array(r);
  if (ArrayBuffer.isView(r))
    return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
  throw new Error("Unknown type, must be binary type");
}, le = (r, e) => {
  const t = e.byteLength, n = V(r), o = n + V(t), s = new Uint8Array(o + t);
  return $(r, s, 0), $(t, s, n), s.set(e, o), new R(r, t, e, s);
}, pe = (r) => {
  const e = T(r), [t, n] = B(e), [o, s] = B(e.subarray(n)), i = e.subarray(n + s);
  if (i.byteLength !== o)
    throw new Error("Incorrect length");
  return new R(t, o, i, e);
}, ue = (r, e) => r === e ? !0 : r.code === e.code && r.size === e.size && fe(r.bytes, e.bytes);
class R {
  constructor(e, t, n, o) {
    this.code = e, this.size = t, this.digest = n, this.bytes = o;
  }
}
function we(r, e) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), n = 0; n < t.length; n++)
    t[n] = 255;
  for (var o = 0; o < r.length; o++) {
    var s = r.charAt(o), i = s.charCodeAt(0);
    if (t[i] !== 255)
      throw new TypeError(s + " is ambiguous");
    t[i] = o;
  }
  var a = r.length, h = r.charAt(0), S = Math.log(a) / Math.log(256), l = Math.log(256) / Math.log(a);
  function A(c) {
    if (c instanceof Uint8Array || (ArrayBuffer.isView(c) ? c = new Uint8Array(c.buffer, c.byteOffset, c.byteLength) : Array.isArray(c) && (c = Uint8Array.from(c))), !(c instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (c.length === 0)
      return "";
    for (var f = 0, C = 0, u = 0, b = c.length; u !== b && c[u] === 0; )
      u++, f++;
    for (var g = (b - u) * l + 1 >>> 0, p = new Uint8Array(g); u !== b; ) {
      for (var y = c[u], E = 0, w = g - 1; (y !== 0 || E < C) && w !== -1; w--, E++)
        y += 256 * p[w] >>> 0, p[w] = y % a >>> 0, y = y / a >>> 0;
      if (y !== 0)
        throw new Error("Non-zero carry");
      C = E, u++;
    }
    for (var v = g - C; v !== g && p[v] === 0; )
      v++;
    for (var U = h.repeat(f); v < g; ++v)
      U += r.charAt(p[v]);
    return U;
  }
  function D(c) {
    if (typeof c != "string")
      throw new TypeError("Expected String");
    if (c.length === 0)
      return new Uint8Array();
    var f = 0;
    if (c[f] !== " ") {
      for (var C = 0, u = 0; c[f] === h; )
        C++, f++;
      for (var b = (c.length - f) * S + 1 >>> 0, g = new Uint8Array(b); c[f]; ) {
        var p = t[c.charCodeAt(f)];
        if (p === 255)
          return;
        for (var y = 0, E = b - 1; (p !== 0 || y < u) && E !== -1; E--, y++)
          p += a * g[E] >>> 0, g[E] = p % 256 >>> 0, p = p / 256 >>> 0;
        if (p !== 0)
          throw new Error("Non-zero carry");
        u = y, f++;
      }
      if (c[f] !== " ") {
        for (var w = b - u; w !== b && g[w] === 0; )
          w++;
        for (var v = new Uint8Array(C + (b - w)), U = C; w !== b; )
          v[U++] = g[w++];
        return v;
      }
    }
  }
  function K(c) {
    var f = D(c);
    if (f)
      return f;
    throw new Error(`Non-${e} character`);
  }
  return {
    encode: A,
    decodeUnsafe: D,
    decode: K
  };
}
var be = we, ge = be;
class ye {
  constructor(e, t, n) {
    this.name = e, this.prefix = t, this.baseEncode = n;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class ve {
  constructor(e, t, n) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = n;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return J(this, e);
  }
}
class me {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return J(this, e);
  }
  decode(e) {
    const t = e[0], n = this.decoders[t];
    if (n)
      return n.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const J = (r, e) => new me({
  ...r.decoders || { [r.prefix]: r },
  ...e.decoders || { [e.prefix]: e }
});
class Ee {
  constructor(e, t, n, o) {
    this.name = e, this.prefix = t, this.baseEncode = n, this.baseDecode = o, this.encoder = new ye(e, t, n), this.decoder = new ve(e, t, o);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const G = ({ name: r, prefix: e, encode: t, decode: n }) => new Ee(r, e, t, n), Q = ({ prefix: r, name: e, alphabet: t }) => {
  const { encode: n, decode: o } = ge(t, e);
  return G({
    prefix: r,
    name: e,
    encode: n,
    decode: (s) => T(o(s))
  });
}, xe = (r, e, t, n) => {
  const o = {};
  for (let l = 0; l < e.length; ++l)
    o[e[l]] = l;
  let s = r.length;
  for (; r[s - 1] === "="; )
    --s;
  const i = new Uint8Array(s * t / 8 | 0);
  let a = 0, h = 0, S = 0;
  for (let l = 0; l < s; ++l) {
    const A = o[r[l]];
    if (A === void 0)
      throw new SyntaxError(`Non-${n} character`);
    h = h << t | A, a += t, a >= 8 && (a -= 8, i[S++] = 255 & h >> a);
  }
  if (a >= t || 255 & h << 8 - a)
    throw new SyntaxError("Unexpected end of data");
  return i;
}, Ce = (r, e, t) => {
  const n = e[e.length - 1] === "=", o = (1 << t) - 1;
  let s = "", i = 0, a = 0;
  for (let h = 0; h < r.length; ++h)
    for (a = a << 8 | r[h], i += 8; i > t; )
      i -= t, s += e[o & a >> i];
  if (i && (s += e[o & a << t - i]), n)
    for (; s.length * t & 7; )
      s += "=";
  return s;
}, m = ({ name: r, prefix: e, bitsPerChar: t, alphabet: n }) => G({
  prefix: e,
  name: r,
  encode(o) {
    return Ce(o, n, t);
  },
  decode(o) {
    return xe(o, n, t, r);
  }
}), x = Q({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
Q({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const N = m({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
m({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
m({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
m({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
m({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
m({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
m({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
m({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
m({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
class d {
  constructor(e, t, n, o) {
    this.code = t, this.version = e, this.multihash = n, this.bytes = o, this.byteOffset = o.byteOffset, this.byteLength = o.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, {
      byteOffset: M,
      byteLength: M,
      code: I,
      version: I,
      multihash: I,
      bytes: I,
      _baseCache: M,
      asCID: M
    });
  }
  toV0() {
    switch (this.version) {
      case 0:
        return this;
      default: {
        const { code: e, multihash: t } = this;
        if (e !== z)
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        if (t.code !== De)
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        return d.createV0(t);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: e, digest: t } = this.multihash, n = le(e, t);
        return d.createV1(this.code, n);
      }
      case 1:
        return this;
      default:
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
    }
  }
  equals(e) {
    return e && this.code === e.code && this.version === e.version && ue(this.multihash, e.multihash);
  }
  toString(e) {
    const { bytes: t, version: n, _baseCache: o } = this;
    switch (n) {
      case 0:
        return Ae(t, o, e || x.encoder);
      default:
        return ze(t, o, e || N.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(e) {
    return Ie(/^0\.0/, Me), !!(e && (e[P] || e.asCID === e));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(e) {
    if (e instanceof d)
      return e;
    if (e != null && e.asCID === e) {
      const { version: t, code: n, multihash: o, bytes: s } = e;
      return new d(t, n, o, s || F(t, n, o.bytes));
    } else if (e != null && e[P] === !0) {
      const { version: t, multihash: n, code: o } = e, s = pe(n);
      return d.create(t, o, s);
    } else
      return null;
  }
  static create(e, t, n) {
    if (typeof t != "number")
      throw new Error("String codecs are no longer supported");
    switch (e) {
      case 0: {
        if (t !== z)
          throw new Error(`Version 0 CID must use dag-pb (code: ${z}) block encoding`);
        return new d(e, t, n, n.bytes);
      }
      case 1: {
        const o = F(e, t, n.bytes);
        return new d(e, t, n, o);
      }
      default:
        throw new Error("Invalid version");
    }
  }
  static createV0(e) {
    return d.create(0, z, e);
  }
  static createV1(e, t) {
    return d.create(1, e, t);
  }
  static decode(e) {
    const [t, n] = d.decodeFirst(e);
    if (n.length)
      throw new Error("Incorrect length");
    return t;
  }
  static decodeFirst(e) {
    const t = d.inspectBytes(e), n = t.size - t.multihashSize, o = T(e.subarray(n, n + t.multihashSize));
    if (o.byteLength !== t.multihashSize)
      throw new Error("Incorrect length");
    const s = o.subarray(t.multihashSize - t.digestSize), i = new R(t.multihashCode, t.digestSize, s, o);
    return [
      t.version === 0 ? d.createV0(i) : d.createV1(t.codec, i),
      e.subarray(t.size)
    ];
  }
  static inspectBytes(e) {
    let t = 0;
    const n = () => {
      const [A, D] = B(e.subarray(t));
      return t += D, A;
    };
    let o = n(), s = z;
    if (o === 18 ? (o = 0, t = 0) : o === 1 && (s = n()), o !== 0 && o !== 1)
      throw new RangeError(`Invalid CID version ${o}`);
    const i = t, a = n(), h = n(), S = t + h, l = S - i;
    return {
      version: o,
      codec: s,
      multihashCode: a,
      digestSize: h,
      multihashSize: l,
      size: S
    };
  }
  static parse(e, t) {
    const [n, o] = Se(e, t), s = d.decode(o);
    return s._baseCache.set(n, e), s;
  }
}
const Se = (r, e) => {
  switch (r[0]) {
    case "Q": {
      const t = e || x;
      return [
        x.prefix,
        t.decode(`${x.prefix}${r}`)
      ];
    }
    case x.prefix: {
      const t = e || x;
      return [
        x.prefix,
        t.decode(r)
      ];
    }
    case N.prefix: {
      const t = e || N;
      return [
        N.prefix,
        t.decode(r)
      ];
    }
    default: {
      if (e == null)
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      return [
        r[0],
        e.decode(r)
      ];
    }
  }
}, Ae = (r, e, t) => {
  const { prefix: n } = t;
  if (n !== x.prefix)
    throw Error(`Cannot string encode V0 in ${t.name} encoding`);
  const o = e.get(n);
  if (o == null) {
    const s = t.encode(r).slice(1);
    return e.set(n, s), s;
  } else
    return o;
}, ze = (r, e, t) => {
  const { prefix: n } = t, o = e.get(n);
  if (o == null) {
    const s = t.encode(r);
    return e.set(n, s), s;
  } else
    return o;
}, z = 112, De = 18, F = (r, e, t) => {
  const n = V(r), o = n + V(e), s = new Uint8Array(o + t.byteLength);
  return $(r, s, 0), $(e, s, n), s.set(t, o), s;
}, P = Symbol.for("@ipld/js-cid/CID"), I = {
  writable: !1,
  configurable: !1,
  enumerable: !0
}, M = {
  writable: !1,
  enumerable: !1,
  configurable: !1
}, Ue = "0.0.0-dev", Ie = (r, e) => {
  if (r.test(Ue))
    console.warn(e);
  else
    throw new Error(e);
}, Me = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
export {
  d as CID
};
