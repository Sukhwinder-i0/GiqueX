import { UserModel } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { generateOtp, verifyOtp } from "./otp.service";
import { sendEmail } from "./email.service";
import { generateJWT } from "../utils/generateJWT";

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await UserModel.findOne({ email })
  if(existingUser) throw new ApiError(401, 'User already exists')
  
  const user = await UserModel.create({
    name,
    email,
    password
  })

  const otp = generateOtp()

  user.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  }

  await user.save();

  await sendEmail(
    email, 
    'Verify your email',
    `Hello ${name}, your OTP is: ${otp}`
  )
};

export const VerifyUserOtpService = async(
  email: string,
  otp: string
) => {
  const user = await UserModel.findOne({ email })
  if(!user) throw new ApiError(404, 'User not found')
  
  const isValid = verifyOtp(user, otp);
  if(!isValid) throw new ApiError(400, "Invalid or expired code");

  user.isVerified = true;
  user.otp = undefined;
  await user.save
    
};

export const loginUserService = async(
  email: string,
  password: string
) => {
  const user = await UserModel.findOne({ email })
  if(!user || !!user.isVerified) throw new ApiError(401, 'Invalid credentials or unverified')

  const isMatch = await user.comparePassword(password);
  if(!isMatch) throw new ApiError(401, 'Invalid password')
  
  const token = generateJWT({ id: user._id as string})

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  }
}