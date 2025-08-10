// self‑contained placeholder so server boots
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'matches' }));
export default router;
