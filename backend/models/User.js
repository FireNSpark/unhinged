
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    redFlags: [String],
    greenFlags: [String],
    aboutMe: String,
    photos: [String],
    quizResult: String,
    badges: [String]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
