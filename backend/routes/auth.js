
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'users' }));
router.get('/:id', (req, res) => res.json({ ok: true, id: req.params.id }));

export default router;
