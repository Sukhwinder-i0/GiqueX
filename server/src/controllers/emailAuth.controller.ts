import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import ApiError from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { generateOtp, verifyOtp } from '../services/otp.service';
import { sendEmail } from '../services/email.service';
import { generateJWT } from '../utils/generateJWT';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name?.trim()) {
    throw new ApiError(400, 'Name is required');
  }

  if (!email?.trim()) {
    throw new ApiError(400, 'Email is required');
  }

  if (!password || password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email');
  }

  const user = await UserModel.create({ name, email, password });

  const otp = generateOtp();

  user.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  };

  await user.save();

  await sendEmail(email, 'Verify your email', `Hello ${name}, your OTP is: ${otp}`);

  res.status(201).json(new ApiResponse(201, null, 'OTP sent to your email'));
});


export const verifyUserOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email?.trim()) {
    throw new ApiError(400, 'Email is required');
  }

  if (!otp?.trim()) {
    throw new ApiError(400, 'OTP is required');
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'No user found with this email');
  }

  const isValid = verifyOtp(user, otp);
  if (!isValid) {
    throw new ApiError(400, 'Invalid or expired OTP');
  }

  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: { isVerified: true },
      $unset: { otp: '' },
    }
  );

  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully'));
});


export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email?.trim()) {
    throw new ApiError(400, 'Email is required');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found with this email');
  }

  if (!user.isVerified) {
    throw new ApiError(403, 'Please verify your email before logging in');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Incorrect password');
  }

  const token = generateJWT({
    //@ts-ignore
    id: user._id.toString(),
    role: user.role,
  });

  if (!token) {
    throw new ApiError(500, 'Token generation failed');
  }

  res.status(200).json(
    new ApiResponse(200, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    }, 'Login successful')
  );
});
