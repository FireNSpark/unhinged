// server.js — Final (case‑sensitive safe, matches capitalized models & lowercase routes)

import express from 'express'; import mongoose from 'mongoose'; import dotenv from 'dotenv'; import cors from 'cors'; import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url'; import { createServer } from 'http'; import { Server } from 'socket.io'; import rateLimit from 'express-rate-limit';

// ROUTES (all files in backend/routes are lowercase) import authRoutes from './routes/auth.js'; import profileRoutes from './routes/profile.js'; import matchRoutes from './routes/matches.js'; import confessionRoutes from './routes/confessions.js'; import badgeRoutes from './routes/badges.js'; import messageRoutes from './routes/messages.js';

// MODELS (capitalized filenames in backend/models) import Message from './models/Message.js'; import Confession from './models/Confession.js'; import Badge from './models/Badge.js'; // (User is imported inside route files where needed)

dotenv.config();

const app = express(); const httpServer = createServer(app); const io = new Server(httpServer, { cors: { origin: '*' } });

// ensure /uploads exists const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename); const uploadsDir = path.join(__dirname, 'uploads'); if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// middleware app.use(cors()); app.use(express.json()); app.use('/uploads', express.static('uploads')); app.use( rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false, }) );

// health app.get('/health', (_req, res) => res.json({ ok: true }));

// routes app.use('/auth', authRoutes); app.use('/profile', profileRoutes); app.use('/matches', matchRoutes); app.use('/confessions', confessionRoutes); app.use('/badges', badgeRoutes); app.use('/messages', messageRoutes);

// sockets io.on('connection', (socket) => { socket.on('joinRoom', (roomId) => socket.join(roomId)); socket.on('sendMessage', async ({ roomId, senderId, text }) => { if (!roomId || !text) return; const msg = new Message({ roomId, senderId, text }); await msg.save(); io.to(roomId).emit('message', msg); }); });

const PORT = process.env.PORT || 5000; const URI = process.env.MONGO_URI; // must include DB name

mongoose .connect(URI) .then(() => { httpServer.listen(PORT, () => { console.log(🚀 Server running on port ${PORT}); }); }) .catch((e) => { console.error('Mongo connection error:', e.message); process.exit(1); });

