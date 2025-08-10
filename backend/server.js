// server.js — Cleaned and synced with matches.js
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

// ROUTES
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/matches', matchRoutes);
app.use('/confessions', confessionRoutes);
app.use('/badges', badgeRoutes);
app.use('/messages', messageRoutes);

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => socket.join(roomId));
  socket.on('sendMessage', async ({ roomId, senderId, text }) => {
    if (!roomId || !text) return;
    const msg = new (await import('./models/Message.js')).default({ roomId, senderId, text });
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

// Connect to Mongo in the background (do not crash app on failure)
mongoose.connect(URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((e) => {
    console.error('Mongo connection error:', e.message);
  });

