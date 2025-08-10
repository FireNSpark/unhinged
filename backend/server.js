import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import matchesRoutes from './routes/matches.js';
import seedRoutes from './routes/seed.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/matches', matchesRoutes);
app.use('/seed', seedRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Unhinged backend is running' });
});

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.warn('MONGO_URI not set. Skipping MongoDB connection.');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

