// backend/config/upload.js — handles file uploads with multer

import multer from 'multer'; import path from 'path'; import { fileURLToPath } from 'url'; import fs from 'fs';

const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);

// Ensure uploads folder exists const uploadsDir = path.join(__dirname, '..', 'uploads'); if (!fs.existsSync(uploadsDir)) { fs.mkdirSync(uploadsDir); }

const storage = multer.diskStorage({ destination: function (req, file, cb) { cb(null, uploadsDir); }, filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); } });

const upload = multer({ storage }); export default upload;

