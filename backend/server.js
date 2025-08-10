import Messages from './models/Message.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { apiLimiter } from './middleware/rateLimit.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import matchRoutes from './routes/matches.js';
import confessionRoutes from './routes/confessions.js';
import badgeRoutes from './routes/badges.js';
import messageRoutes from './routes/messages.js';
import Message from './models/Message.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// ensure uploads dir exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use('/uploads', express.static('uploads'));

// routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/matches', matchRoutes);
app.use('/confessions', confessionRoutes);
app.use('/badges', badgeRoutes);
app.use('/messages', messageRoutes);

// sockets
io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => socket.join(roomId));
  socket.on('sendMessage', async ({ roomId, senderId, text }) => {
    if (!roomId || !text) return;
    const message = new Message({ roomId, senderId, text });
    await message.save();
    io.to(roomId).emit('message', message);
  });
});

// db + start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    httpServer.listen(PORT, () => console.log(`🚀 API on :${PORT}`));
  })
  .catch((e) => {
    console.error('Mongo error:', e.message);
    process.exit(1);
  });
