
// backend/routes/profile.js
import express from 'express';
import upload from '../config/upload.js';
import User from '../models/User.js';

const router = express.Router();

// Upload profile picture
router.post('/upload', upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Example: attach file path to user
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profilePic = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Profile picture updated', profilePic: user.profilePic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile info
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
