// backend/routes/users.js — default export import express from 'express'; const router = express.Router();

// GET /users → sanity endpoint router.get('/', (_req, res) => { res.json({ ok: true, route: 'users' }); });

// (placeholder) GET /users/:id → echo id for now router.get('/:id', (req, res) => { res.json({ ok: true, id: req.params.id }); });

export default router;

