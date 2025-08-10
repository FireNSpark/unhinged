// server.js — minimal ESM version (works on Render)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Root + health
app.get('/', (_req, res) => res.json({ message: 'Unhinged backend is running' }));
app.get('/health', (_req, res) => res.json({ ok: true }));

// Simple test route
app.get('/users', (_req, res) => res.json({ message: 'Users route working' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Unhinged minimal server on :' + PORT);
});
