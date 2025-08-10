
import mongoose from 'mongoose';

const confessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text: { type: String, required: true },
    reactions: {
      fire: { type: Number, default: 0 },
      flag: { type: Number, default: 0 },
      laugh: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Confession', confessionSchema);
