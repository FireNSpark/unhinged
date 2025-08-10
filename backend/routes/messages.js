// backend/routes/messages.js — default export import express from 'express'; import Message from '../models/Message.js';

const router = express.Router();

// GET /messages/:userA/:userB → convo between two users router.get('/:userA/:userB', async (req, res) => { try { const { userA, userB } = req.params; const msgs = await Message.find({ $or: [ { sender: userA, receiver: userB }, { sender: userB, receiver: userA }, ], }).sort({ createdAt: 1 }); res.json(msgs); } catch (e) { res.status(500).json({ error: e.message }); } });

// POST /messages → send a message { sender, receiver, content } router.post('/', async (req, res) => { try { const { sender, receiver, content } = req.body || {}; if (!sender || !receiver || !content) { return res.status(400).json({ error: 'sender, receiver, content are required' }); } const msg = await Message.create({ sender, receiver, content }); res.status(201).json(msg); } catch (e) { res.status(500).json({ error: e.message }); } });

export default router;

