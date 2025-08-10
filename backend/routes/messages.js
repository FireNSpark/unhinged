
import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// GET /messages/:roomId
router.get('/:roomId', async (req, res) => {
  const list = await Message.find({ roomId: req.params.roomId }).sort({ createdAt: 1 });
  res.json(list);
});

export default router;
