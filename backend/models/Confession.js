// models/Confession.js
import mongoose from 'mongoose';

const confessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Confession = mongoose.model('Confession', confessionSchema);

export default Confession;
