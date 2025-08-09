import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  googleId?: string;
  avatar?: string;
  password?: string;
  isVerified: boolean;
  languages?: Array<{
    name: string;
    level: 'Native/Bilingual' | 'Fluent' | 'Conversational';
  }>;
  reviews?: Array<{
    from: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  role: string,
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },

    googleId: String,
    avatar: String,
    password: String,

    isVerified: { 
      type: Boolean, 
      default: false 
    },
    otp: {
      code: String,
      expiresAt: Date,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      default: 'buyer',
    },
    languages: [
      {
        name: String,
        level: {
          type: String,
          enum: ['Native/Bilingual', 'Fluent', 'Conversational'],
        },
      },
    ],
    reviews: [
      {
        from: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: String,
      }]
    },


  { timestamps: true }
);


//  Pre-save hook to hash password if modified
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as any);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
