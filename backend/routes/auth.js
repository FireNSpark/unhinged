// ROUTES — filenames & corrected imports/exports (copy these names exactly) // Place these files under: backend/routes/

// 1) backend/routes/auth.js import express from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import User from '../models/User.js'; const router = express.Router(); // ... endpoints here ... export default router;

// 2) backend/routes/profile.js import express from 'express'; import jwt from 'jsonwebtoken'; import User from '../models/User.js'; import upload from '../config/upload.js'; const router = express.Router(); // ... endpoints here ... export default router;

// 3) backend/routes/matches.js import express from 'express'; import jwt from 'jsonwebtoken'; import User from '../models/User.js'; import { calculateCompatibility } from '../utils/compatibility.js'; const router = express.Router(); // ... endpoints here ... export default router;

// 4) backend/routes/confessions.js import express from 'express'; import jwt from 'jsonwebtoken'; import Confession from '../models/Confession.js'; const router = express.Router(); // ... endpoints here ... export default router;

// 5) backend/routes/badges.js import express from 'express'; import jwt from 'jsonwebtoken'; import Badge from '../models/Badge.js'; import User from '../models/User.js'; const router = express.Router(); // ... endpoints here ... export default router;

// 6) backend/routes/messages.js import express from 'express'; import Message from '../models/Message.js'; const router = express.Router(); // ... endpoints here ... export default router;

// === server.js import block (copy/paste) === // Keep routes all lowercase file names exactly like this // (these must match the actual filenames under backend/routes) import authRoutes from './routes/auth.js'; import profileRoutes from './routes/profile.js'; import matchRoutes from './routes/matches.js'; import confessionRoutes from './routes/confessions.js'; import badgeRoutes from './routes/badges.js'; import messageRoutes from './routes/messages.js';

