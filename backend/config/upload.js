// backend/config/upload.js — Multer setup
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadsPath = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsPath),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });
export default upload;
