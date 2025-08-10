const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  age:      { type: Number, min: 18 },
  gender:   { type: String, enum: ['male', 'female', 'other'] },
  interests:{ type: [String], default: [] },
  profilePic:{ type: String }
}, { timestamps: true });

export default mongoose.model('User
