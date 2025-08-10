
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_, file, cb) => {
    const ok = /jpeg|jpg|png|gif/.test(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error('Only images allowed'), ok);
  }
});

export default upload;
