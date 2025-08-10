
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import upload from '../config/upload.js';

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET /profile
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

// PUT /profile
router.put('/', auth, async (req, res) => {
  const updates = req.body || {};
  const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
  res.json(user);
});

// POST /profile/upload
router.post('/upload', auth, upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const user = await User.findById(req.userId);
  user.photos = user.photos || [];
  user.photos.push(`/uploads/${req.file.filename}`);
  await user.save();
  res.json({ photos: user.photos });
});

export default router;
