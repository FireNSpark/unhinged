// backend/routes/profile.js — upload + profile update
import express from 'express';
import upload from '../config/upload.js';
import User from '../models/User.js';

const router = express.Router();

// POST /profile/upload — form-data: userId, profilePic (file)
router.post('/upload', upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { profilePic: `/uploads/${req.file.filename}` } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Profile picture updated', profilePic: user.profilePic, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /profile/:id — update basic fields
router.put('/:id', async (req, res) => {
  try {
    const allow = (({ username, age, gender, interests, bio }) => ({ username, age, gender, interests, bio }))(req.body || {});
    const user = await User.findByIdAndUpdate(req.params.id, allow, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;


Alright—kept it moving.

I updated the User model in canvas to include profilePic (so uploads actually save).

I added a new backend/routes/profile.js in canvas with:

POST /profile/upload (multer upload → saves profilePic path on the user)

PUT /profile/:id (update basic fields: username, age, gender, interests, bio)


