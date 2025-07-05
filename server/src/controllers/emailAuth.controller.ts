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

  if(!name || !email || !password) throw new ApiError(403, 'all fileds are required')

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) throw new ApiError(401, 'User already exists');

  const user = await UserModel.create({ name, email, password });

  const otp = generateOtp();

  user.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins expiry
  };

  await user.save();

  await sendEmail(
    email,
    'Verify your email',
    `Hello ${name}, your OTP is: ${otp}`
  );

  res.status(201).json(new ApiResponse(201, null, 'OTP sent to email'));
});

export const verifyUserOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if(!otp) throw new ApiError(401,"provide required otp")

  const user = await UserModel.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');

  const isValid = verifyOtp(user, otp);
  if (!isValid) throw new ApiError(400, 'Invalid or expired OTP');

  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: { isVerified: true },
      $unset: { otp: '' },
    }
);


  res.status(200).json(new ApiResponse(200, null, 'Email verified'));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) throw new ApiError(403, 'all fileds are required')

  const user = await UserModel.findOne({ email });
  if (!user) throw new ApiError(401, 'user does not exist with this email');

  // console.log(user.isVerified)
  // console.log(user.otp)
  // console.log(user.password)

  if(!user.isVerified) throw new ApiError(401, 'email is not verified')

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid password');
  }

  const token = generateJWT({ 
    id: user._id as string,
    role: user.role
  });

  if(!token) throw new ApiError(403, 'error while genetrating jwt')

  // localStorage.setItem('token', token)
  
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
