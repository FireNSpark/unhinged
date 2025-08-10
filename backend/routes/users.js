import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Users route working' });
});

export default router;
