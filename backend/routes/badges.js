
import express from 'express';
import jwt from 'jsonwebtoken';
import Badge from '../models/Badge.js';
import User from '../models/User.js';

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

// GET /badges
router.get('/', async (_req, res) => {
  const list = await Badge.find();
  res.json(list);
});

// POST /badges/award
router.post('/award', auth, async (req, res) => {
  const { badgeId } = req.body || {};
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.badges = user.badges || [];
  if (!user.badges.includes(badgeId)) user.badges.push(badgeId);
  await user.save();
  res.json(user.badges);
});

export default router;
