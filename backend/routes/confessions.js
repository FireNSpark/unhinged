// backend/routes/confessions.js — default export import express from 'express'; import Confession from '../models/Confession.js';

const router = express.Router();

// GET /confessions → list recent confessions router.get('/', async (_req, res) => { try { const list = await Confession.find().sort({ createdAt: -1 }).limit(100); res.json(list); } catch (e) { res.status(500).json({ error: e.message }); } });

// POST /confessions → { userId, text, isAnonymous? } router.post('/', async (req, res) => { try { const { userId, text, isAnonymous } = req.body || {}; if (!userId || !text) return res.status(400).json({ error: 'userId and text are required' }); const c = await Confession.create({ userId, text, isAnonymous: !!isAnonymous }); res.status(201).json(c); } catch (e) { res.status(500).json({ error: e.message }); } });

export default router;

