
import express from 'express';
import Badge from '../models/Badge.js';

const router = express.Router();

// GET /badges
router.get('/', async (_req, res) => {
  try {
    const list = await Badge.find().sort({ name: 1 });
    res.json(list);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /badges → { name, description, icon }
router.post('/', async (req, res) => {
  try {
    const { name, description, icon } = req.body || {};
    if (!name) return res.status(400).json({ error: 'name is required' });
    const created = await Badge.create({ name, description, icon });
    res.status(201).json(created);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

export default router;
