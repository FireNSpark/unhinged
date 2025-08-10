import express from 'express';
const router = express.Router();

router.post('/login', (_req, res) => res.json({ ok: true, route: 'auth/login' }));
router.post('/register', (_req, res) => res.json({ ok: true, route: 'auth/register' }));

export default router;
