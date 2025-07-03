import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/requireAuth";
import ApiError from "../utils/ApiError";
import { gigsModel } from "../models/gigs.model";
import { ApiResponse } from "../utils/ApiResponse";

export const createGig = asyncHandler(async(req: AuthRequest, res: Response) => {
  const {title, description, category, tags, price} = req.body;
  
  if(!title || !description || !category || !tags || !price)
    throw new ApiError(400, 'fields are required')

  const mediaUrls = (req.files as Express.Multer.File[]).map(
    (file) => (file as any).path
  );

  const parsedTags =
    typeof tags === 'string'
      ? tags.split(',').map((tag) => tag.trim())
      : [];

      
  const gig = new gigsModel ({
    user: req.userId,
    title,
    description,
    category,
    tags: parsedTags,
    media: mediaUrls,
    price,
  })

  await gig.save();

  res.status(200).json(
      new ApiResponse(200, gig, 'Login successful')
  );
})