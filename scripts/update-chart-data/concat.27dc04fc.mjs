import { a, b as c } from "./alloc.bd7ddb36.mjs";
function u(n, o) {
  o == null && (o = n.reduce((t, f) => t + f.length, 0));
  const r = a(o);
  let e = 0;
  for (const t of n)
    r.set(t, e), e += t.length;
  return c(r);
}
export {
  u as concat
};
