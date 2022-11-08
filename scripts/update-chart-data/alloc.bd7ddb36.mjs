function r(n) {
  return globalThis.Buffer != null ? new Uint8Array(n.buffer, n.byteOffset, n.byteLength) : n;
}
function e(n = 0) {
  return globalThis.Buffer?.allocUnsafe != null ? r(globalThis.Buffer.allocUnsafe(n)) : new Uint8Array(n);
}
export {
  e as a,
  r as b
};
