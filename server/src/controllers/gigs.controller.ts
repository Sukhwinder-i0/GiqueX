import { Request, Response } from "express";
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

export const getAllGigs = asyncHandler(async(req: Request, res: Response ) => {
  const { category, search, limit = 50, page = 1 } = req.query;
  
  const query: any = {};
  
  if (category) {
    query.category = category;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search as string, 'i')] } }
    ];
  }
  
  const skip = (Number(page) - 1) * Number(limit);
  
  const gigs = await gigsModel.find(query)
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(skip);
    
  const total = await gigsModel.countDocuments(query);

  res.status(200).json(
    new ApiResponse(200, { gigs, total, page: Number(page), limit: Number(limit) }, 'Gigs fetched successfully')
  );
})

export const getGigById = asyncHandler(async(req: Request, res: Response ) => {
  const { id } = req.params;
  
  const gig = await gigsModel.findById(id)
    .populate('user', 'name avatar email');
    
  if (!gig) throw new ApiError(404, 'Gig not found');

  res.status(200).json(
    new ApiResponse(200, gig, 'Gig fetched successfully')
  );
})

export const createGig = asyncHandler(async(req: AuthRequest, res: Response) => {
  const {title, description, category, tags, price} = req.body;
  
  if(!title || !description || !category || !price)
    throw new ApiError(400, 'fields are required')

  const mediaUrls = (req.files as Express.Multer.File[] || []).map(
    (file) => (file as any).path
  );

  // Tags are already parsed by parseFormData middleware
  const parsedTags = Array.isArray(tags) ? tags : [];

      
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

  res.status(201).json(
      new ApiResponse(201, gig, 'Gig created successfully')
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

  if (title) updates.title  = title
  if (description) updates.description = description;
  if (price) updates.price = price;
  if (category) updates.category = category
  if (tags) {
    // Tags are already parsed by parseFormData middleware
    updates.tags = Array.isArray(tags) ? tags : [];
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
  if(gig?.user.toString() !== req.userId?.toString()) throw new ApiError(403, ' you are not authorized to update this gig')

  const deleted = await gigsModel.findByIdAndDelete(req.params.id)

  if(!deleted) throw new ApiError(403, 'error while deleting the gig');

  res.status(201).json(
    new ApiResponse(200, 'gig deleted successfully')
  )
})