import { Response } from "express";
import { AuthRequest } from "../middlewares/requireAuth";
import { asyncHandler } from "../utils/asyncHandler";

export const createOrder = asyncHandler( async(req: AuthRequest, res: Response ) => {
  
})