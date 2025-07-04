import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/requireAuth";
import ApiError from "../utils/ApiError";
import { gigsModel } from "../models/gigs.model";
import { ApiResponse } from "../utils/ApiResponse";


export const getGigs = asyncHandler(async(req: AuthRequest, res: Response ) => {
  // console.log(req.userId?.toString())
  const gigs = await gigsModel.find({ user: req.userId })
  // console.log(gigs)
  if(!gigs) throw new ApiError(404, 'no gigs found');
 

  res.status(200).json(
    new ApiResponse(200, gigs, 'gigs get  successfully')
  );
  
})

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

export const updateGig = asyncHandler(async (req: AuthRequest, res: Response) => {
  // console.log('called')
  const gig = await gigsModel.findById(req.params.id);
  if(!gig) throw new ApiError(404, 'no gig found')
  // console.log(gig);

  if(gig.user.toString() !== req.userId?.toString()) throw new ApiError(403, ' you are not authorized to update this gig')
 
  const { title, description, price, category, tags } = req.body

  const updates: Partial<typeof gig> = {}; // for any values

  if (title) gig.title = updates.title 
  if (description) updates.description = description;
  if (price) updates.price = price;
  if (category) updates.category = category
  if (tags) {
    updates.tags = typeof tags === 'string'
      ? tags.split(',').map(tag => tag.trim())
      : [];
  }

  const mediaUrls = (req.files as Express.Multer.File[]).map(
    (file) => (file as any).path
  );
  if (mediaUrls.length > 0) updates.media = mediaUrls;

  Object.assign(gig, updates);
  await gig.save();

  res.status(200).json(
    new ApiResponse(200, gig, 'updated successfully')
  ) 
})

export const deleteGig = asyncHandler(async (req: AuthRequest, res: Response) => {
  const gig = await gigsModel.findById(req.params.id)
  if(gig.user.toString() !== req.userId?.toString()) throw new ApiError(403, ' you are not authorized to update this gig')

  const deleted = await gigsModel.findByIdAndDelete(req.params.id)

  if(!deleted) throw new ApiError(403, 'error while deleting the gig');

  res.status(201).json(
    new ApiResponse(200, 'gig deleted successfully')
  )
})