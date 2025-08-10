// backend/routes/matches.js — default export (placeholder)
import express from 'express';
const router = express.Router();

// GET /matches → sanity endpoint
router.get('/', (_req, res) => {
  res.json({ ok: true, route: 'matches' });
});

// (placeholder) POST /matches → echo body
router.post('/', (req, res) => {
  res.json({ ok: true, received: req.body || {} });
});

export default router;
