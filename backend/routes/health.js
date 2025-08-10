// backend/routes/health.js — simple health route import express from 'express'; const router = express.Router();

router.get('/', (_req, res) => { res.json({ ok: true }); });

export default router;

