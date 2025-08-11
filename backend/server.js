// backend/server.js — FINAL: solid Mongo connect + routes mounted + frontend
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// __dirname helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ensure uploads/ exists & serve it
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/uploads', express.static(uploadsPath));

// Serve static frontend from /public
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// ===== ROUTES =====
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import matchesRoutes from './routes/matches.js';
import messagesRoutes from './routes/messages.js';
import confessionsRoutes from './routes/confessions.js';
import badgesRoutes from './routes/badges.js';
import profileRoutes from './routes/profile.js';
import seedRoutes from './routes/seed.js';

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/matches', matchesRoutes);
app.use('/messages', messagesRoutes);
app.use('/confessions', confessionsRoutes);
app.use('/badges', badgesRoutes);
app.use('/profile', profileRoutes);
app.use('/seed', seedRoutes); // enables POST /seed

// Root -> frontend
app.get('/', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')));

// ===== Mongo connect (strict + helpful error) =====
const MONGO_URI = (process.env.MONGO_URI || '').trim();
if (!MONGO_URI) {
  console.error('Mongo error: MONGO_URI is missing. Set it in Render > Environment.');
} else if (!/^mongodb(\+srv)?:\/\//i.test(MONGO_URI)) {
  console.error('Mongo error: Invalid scheme. Expected mongodb:// or mongodb+srv://');
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Mongo connected'))
    .catch((e) => console.error('Mongo connect error:', e.message));
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Unhinged up on :${PORT}`));

// surface unhandled rejections so they show in Render logs
process.on('unhandledRejection', (e) => console.error('unhandledRejection:', e));
process.on('uncaughtException', (e) => console.error('uncaughtException:', e));

