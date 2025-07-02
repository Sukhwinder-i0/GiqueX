import { Request, Response } from 'express';
import {
  loginUserService,
  registerUserService,
  VerifyUserOtpService,
} from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  await registerUserService(name, email, password);
  res.status(201).json(
    new ApiResponse(201, null, 'OTP sent to email')
  );
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await VerifyUserOtpService(email, otp);
  res.status(200).json(
    new ApiResponse(200, null, 'Email verified')
  );
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginUserService(email, password);
  res.status(200).json(
    new ApiResponse(200, { token }, 'Login successful')
  );
});
