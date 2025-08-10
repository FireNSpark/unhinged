
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { calculateCompatibility } from '../utils/compatibility.js';

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET /matches
router.get('/', auth, async (req, res) => {
  const me = await User.findById(req.userId);
  const others = await User.find({ _id: { $ne: me._id } }).select('-password');
  const scored = others.map((o) => ({ ...o.toObject(), compatibility: calculateCompatibility(me, o) }));
  res.json(scored.sort((a, b) => b.compatibility - a.compatibility));
});

export default router;
