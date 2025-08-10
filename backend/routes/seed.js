// routes/seed.js
import express from 'express';
const router = express.Router();

// Example seed route - replace with your actual seed logic
router.get('/', async (req, res) => {
  try {
    // Placeholder for seeding logic
    res.json({ message: 'Seed route working' });
  } catch (error) {
    res.status(500).json({ message: 'Error running seed route', error });
  }
});

export default router;
