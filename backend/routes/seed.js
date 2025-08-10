// backend/routes/seed.js — create test users import express from 'express'; import User from '../models/User.js';

const router = express.Router();

// POST /seed → creates two users and returns them router.post('/', async (_req, res) => { try { await User.deleteMany({ email: { $in: ['a@test.com', 'b@test.com'] } }); const a = await User.create({ username: 'alex', email: 'a@test.com', password: 'pass', age: 28, interests: ['music'], gender: 'other' }); const b = await User.create({ username: 'bailey', email: 'b@test.com', password: 'pass', age: 27, interests: ['sports'], gender: 'other' }); res.json({ users: [a, b] }); } catch (e) { res.status(500).json({ error: e.message }); } });

export default router;

