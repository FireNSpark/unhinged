import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// routes
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import matchesRoutes from './routes/matches.js';
import messagesRoutes from './routes/messages.js';
import confessionsRoutes from './routes/confessions.js';
import badgesRoutes from './routes/badges.js';
import profileRoutes from './routes/profile.js';
import seedRoutes from './routes/seed.js';

dotenv.config();
const app = express();

// ensure uploads/ exists & is served
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// health + root
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => res.json({ message: 'Unhinged backend is running' }));

// mount routes
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/matches', matchesRoutes);
app.use('/messages', messagesRoutes);
app.use('/confessions', confessionsRoutes);
app.use('/badges', badgesRoutes);
app.use('/profile', profileRoutes);
app.use('/seed', seedRoutes);

// listen first so health works even if Mongo is down
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log('Unhinged up on :' + PORT));

// connect Mongo (non-fatal if missing)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo connected'))
    .catch(e => console.error('Mongo error:', e.message));
} else {
  console.warn('MONGO_URI not set — skipping DB connect');
}
