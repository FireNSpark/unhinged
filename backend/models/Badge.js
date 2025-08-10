// models/Badge.js
import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, // URL or path to badge icon
  createdAt: { type: Date, default: Date.now }
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
