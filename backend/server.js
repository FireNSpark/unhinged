import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// routes
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import matchesRoutes from './routes/matches.js';
import seedRoutes from './routes/seed.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/matches', matchesRoutes);
app.use('/seed', seedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log('Unhinged up on :' + PORT));

const URI = process.env.MONGO_URI;
mongoose.connect(URI).then(() => console.log('Mongo connected')).catch(e => console.error('Mongo error:', e.message));
