// backend/server.js — FINAL (routes mounted + frontend + mongo)
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

// Serve static frontend
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
app.use('/seed', seedRoutes); // <-- THIS enables POST /seed

// Root -> frontend
app.get('/', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log('Unhinged up on :' + PORT));

// Mongo connect (non-fatal if not set)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo connected'))
    .catch(e => console.error('Mongo error:', e.message));
} else {
  console.warn('MONGO_URI not set — skipping DB connect');
}
