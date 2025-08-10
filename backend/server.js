
// server.js — BUILD v7 (boot-first, no DB crash)
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

// Route imports (plural, lowercase). Each route exports default router.
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import matchRoutes from './routes/matches.js';
import confessionRoutes from './routes/confessions.js';
import badgeRoutes from './routes/badges.js';
import messageRoutes from './routes/messages.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

console.log('UNHINGED SERVER BUILD v7');

// ensure uploads/ exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }));

app.get('/health', (_req, res) => res.json({ ok: true }));

// routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/matches', matchRoutes);
app.use('/confessions', confessionRoutes);
app.use('/badges', badgeRoutes);
app.use('/messages', messageRoutes);

// sockets (lazy import to avoid static resolver issues)
io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => socket.join(roomId));
  socket.on('sendMessage', async ({ roomId, senderId, text }) => {
    if (!roomId || !text) return;
    const { default: Message } = await import('./models/Message.js');
    const msg = new Message({ roomId, senderId, text });
    await msg.save();
    io.to(roomId).emit('message', msg);
  });
});

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// Start server first so /health works even if Mongo is down
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log('UNHINGED UP on :' + PORT);
});

// Connect to Mongo in background (don’t exit on error)
mongoose.connect(URI)
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.error('Mongo connection error:', e.message));


---

backend/routes/auth.js

import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'auth' }));
export default router;

backend/routes/profile.js

import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'profile' }));
export default router;

backend/routes/badges.js

import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'badges' }));
export default router;

backend/routes/confessions.js

import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'confessions' }));
export default router;

backend/routes/messages.js

import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'messages' }));
export default router;

backend/routes/matches.js

// self‑contained placeholder so server boots
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ ok: true, route: 'matches' }));
export default router
