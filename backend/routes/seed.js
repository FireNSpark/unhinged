import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /seed — creates 2 users and returns them
router.post('/', async (_req, res) => {
  try {
    await User.deleteMany({ email: { $in: ['a@test.com', 'b@test.com'] } });
    const a = await User.create({ email: 'a@test.com', password: 'pass', name: 'Alex', age: 28, redFlags: ['smokes'] });
    const b = await User.create({ email: 'b@test.com', password: 'pass', name: 'Bailey', age: 27, redFlags: ['ghosts'] });
    res.json({ users: [a, b] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
