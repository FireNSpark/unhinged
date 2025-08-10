import express from 'express';
import upload from '../config/upload.js';
import User from '../models/User.js';
const router = express.Router();

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
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const allow = (({ username, age, gender, interests }) => ({ username, age, gender, interests }))(req.body || {});
    const user = await User.findByIdAndUpdate(req.params.id, allow, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

export default router;
