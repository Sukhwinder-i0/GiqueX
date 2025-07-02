import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  googleId: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    googleId: String,
    avatar: String,
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
