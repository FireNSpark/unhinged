import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    age: { type: Number, min: 18 },
    bio: { type: String, default: '' },
    redFlags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
