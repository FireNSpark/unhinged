// backend/routes/auth.js import express from 'express';

const router = express.Router();

// Example login route router.post('/login', (req, res) => { res.json({ message: 'Login route working' }); });

// Example register route router.post('/register', (req, res) => { res.json({ message: 'Register route working' }); });

export default router;

