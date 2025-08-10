// backend/routes/users.js — fix: add express import & default export
import express from 'express';
const router = express.Router();

// GET /users
router.get('/', (_req, res) => {
  res.json({ ok: true, route: 'users' });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  res.json({ ok: true, id: req.params.id });
});

export default router;
