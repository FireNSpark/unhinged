// server.js — ultra‑minimal boot so we can rebuild clean import express from 'express'; import cors from 'cors';

const app = express(); app.use(cors()); app.use(express.json());

// Root + health app.get('/', (_req, res) => res.json({ message: 'Unhinged backend is running' })); app.get('/health', (_req, res) => res.json({ ok: true }));

// Inline users route (no separate file needed) app.get('/users', (_req, res) => res.json({ message: 'Users route working' }));

// Start (Render needs 0.0.0.0) const PORT = process.env.PORT || 5000; app.listen(PORT, '0.0.0.0', () => { console.log('Unhinged minimal server on :' + PORT); });

