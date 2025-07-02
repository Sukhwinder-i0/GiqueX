import { UserDocument } from "../models/user.model";

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const verifyOtp = (user: UserDocument, otp: string) => {
  return (
    user.otp && 
    user.otp.code == otp &&
    new Date() < new Date(user.otp.expiresAt)
  )
}