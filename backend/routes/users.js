import express from 'express';
import User from '../models/User.js';
const router = express.Router();

// GET /users → list users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(200);
    res.json(users);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /users/:id → get one
router.get('/:id', async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select('-password');
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

export default router;
