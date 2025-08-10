import express from 'express';
import User from '../models/User.js';

const router = express.Router();

function compat(a, b) {
  const A = Array.isArray(a.redFlags) ? a.redFlags : [];
  const B = Array.isArray(b.redFlags) ? b.redFlags : [];
  const total = new Set([...A, ...B]).size || 1;
  const overlap = A.filter(x => B.includes(x)).length;
  let pct = Math.round(((total - overlap) / total) * 100);
  if (pct < 1) pct = 1; if (pct > 99) pct = 99; return pct;
}

// GET /matches/:userId
router.get('/:userId', async (req, res) => {
  try {
    const me = await User.findById(req.params.userId).select('-password');
    if (!me) return res.status(404).json({ error: 'User not found' });
    const others = await User.find({ _id: { $ne: me._id } }).select('-password');
    const out = others.map(u => ({ user: u, compatibility: compat(me, u) }))
                      .sort((a, b) => b.compatibility - a.compatibility);
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

export default router;
