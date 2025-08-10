// backend/routes/messages.js — ESM default export
import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// POST /messages  -> { senderId, receiverId, content }
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body || {};
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ error: 'senderId, receiverId, content are required' });
    }
    const msg = await Message.create({ senderId, receiverId, content });
    res.status(201).json(msg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /messages/:userA/:userB  -> all messages between two users
router.get('/:userA/:userB', async (req, res) => {
  try {
    const { userA, userB } = req.params;
    const msgs = await Message.find({
      $or: [
        { senderId: userA, receiverId: userB },
        { senderId: userB, receiverId: userA }
      ]
    }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;

