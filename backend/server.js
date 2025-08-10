// server.js — boot, /health, Mongo, users + auth + matches + seed
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import matchesRoutes from './routes/matches.js';
import seedRoutes from './routes/seed.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Root + health
app.get('/', (_req, res) => res.json({ message: 'Unhinged backend is running' }));
app.get('/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/matches', matchesRoutes);
app.use('/seed', seedRoutes);

// Listen first so /health works even if Mongo is down
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log('Unhinged up on :' + PORT));

// Mongo connect in background
const URI = process.env.MONGO_URI;
if (URI) {
  mongoose.connect(URI)
    .then(() => console.log('Mongo connected'))
    .catch(e => console.error('Mongo error:', e.message));
} else {
  console.warn('MONGO_URI not set');
}
