import { Response } from "express";
import { AuthRequest } from "../middlewares/requireAuth";
import { asyncHandler } from "../utils/asyncHandler";
import { UserModel } from "../models/user.model";
import ApiError from "../utils/ApiError";

export const getUser = asyncHandler(async (req: AuthRequest, res: Response) => {

  const user = await UserModel.findById(req.userId).select('-password -id -isVerified');
  if (!user) throw new ApiError(404, 'User not found');

  res.status(200).json({
    success: true,
    message: 'User profile fetched',
    data: user,
  });
});

export const switchToSeller = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) throw new ApiError(404, 'User not found');

  if (user.role === 'seller') user.role = 'buyer'
  else user.role = 'seller'

    //throw new ApiError(400, 'You are already a seller');

  
  await user.save();

  // console.log(user.role)

  res.status(200).json({
    success: true,
    message: `You have switched to ${user.role} account`,
    data: { role: user.role },
  });
});
