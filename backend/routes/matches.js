// routes/matches.js
import express from 'express';

const router = express.Router();

// Get all matches (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'Get all matches - working' });
});

// Create a new match (placeholder)
router.post('/', (req, res) => {
  res.json({ message: 'New match created' });
});

export default router;
