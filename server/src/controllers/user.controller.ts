import { Response } from 'express';
import { AuthRequest } from '../middlewares/requireAuth';
import { asyncHandler } from '../utils/asyncHandler';
import { UserModel } from '../models/user.model';
import ApiError from '../utils/ApiError';
import { generateJWT } from '../utils/generateJWT';

export const getUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findById(req.userId).select('-password -id -isVerified');
  if (!user) throw new ApiError(404, 'User not found');

  res.status(200).json({
    user,
  });
});

export const switchToSeller = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) throw new ApiError(404, 'User not found');

  // Set role to seller if not already
  if (user.role !== 'seller') {
    user.role = 'seller';
  }

  await user.save();

  const token = generateJWT({
    id: user._id as string,
    role: user.role,
  });

  // since i am updating the userROle but jwt contains prevoius role
  // console.log(user.role)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isVerified: user.isVerified,
      role: user.role,
    },
    token,
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
