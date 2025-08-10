export const calculateCompatibility = (a, b) => {
  const A = a.redFlags || [];
  const B = b.redFlags || [];
  if (!A.length && !B.length) return 50;
  const shared = A.filter((f) => B.includes(f)).length;
  const total = new Set([...A, ...B]).size || 1;
  // playful: fewer shared red flags => higher "compatible disaster"
  const score = Math.floor(((total - shared) / total) * 100);
  return Math.max(1, Math.min(99, score));
};
