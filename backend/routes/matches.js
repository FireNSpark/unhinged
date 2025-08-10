// routes/matches.js — Uses User + compatibility, no Match model
import express from 'express';
import User from '../models/User.js';
import calculateCompatibility from '../utils/calculateCompatibility.js';

const router = express.Router();

// Get matches for a user
router.get('/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    const otherUsers = await User.find({ _id: { $ne: currentUser._id } });
    const matches = otherUsers.map(user => ({
      user,
      compatibility: calculateCompatibility(currentUser, user)
    }));

    matches.sort((a, b) => b.compatibility - a.compatibility);

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

