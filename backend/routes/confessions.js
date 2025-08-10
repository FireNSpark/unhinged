
import express from 'express';
import jwt from 'jsonwebtoken';
import Confession from '../models/Confession.js';

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

// POST /confessions
router.post('/', auth, async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'Missing text' });
  const c = await new Confession({ userId: req.userId, text }).save();
  res.json(c);
});

// GET /confessions
router.get('/', async (_req, res) => {
  const list = await Confession.find().sort({ createdAt: -1 });
  res.json(list);
});

// POST /confessions/:id/react
router.post('/:id/react', auth, async (req, res) => {
  const { type } = req.body || {};
  const c = await Confession.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  if (c.reactions[type] === undefined) return res.status(400).json({ error: 'Bad reaction' });
  c.reactions[type] += 1;
  await c.save();
  res.json(c);
});

export default router;
