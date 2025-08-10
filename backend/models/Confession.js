import mongoose from 'mongoose';

const ConfessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, trim: true },
  isAnonymous: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Confession', ConfessionSchema);
