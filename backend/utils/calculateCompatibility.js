// backend/utils/calculateCompatibility.js
export default function calculateCompatibility(a, b) {
  const A = Array.isArray(a?.redFlags) ? a.redFlags : [];
  const B = Array.isArray(b?.redFlags) ? b.redFlags : [];
  const total = new Set([...A, ...B]).size || 1;
  const overlap = A.filter(x => B.includes(x)).length;
  let pct = Math.round(((total - overlap) / total) * 100);
  if (pct < 1) pct = 1;
  if (pct > 99) pct = 99;
  return pct;
}
