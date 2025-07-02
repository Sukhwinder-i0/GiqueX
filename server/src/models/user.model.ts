import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  name: string;
  email: string;
  googleId?: string;
  avatar?: string;
  password?: string;
  isVerified: boolean;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    googleId: String,
    avatar: String,
    password: String,
    isVerified: {type: Boolean, default: false} ,
    otp: {
      code: String,
      expiresAt: Date
    }
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = async function (candidatePAssword: string) {
  return await bcrypt.compare(candidatePAssword, this.password)
}

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

