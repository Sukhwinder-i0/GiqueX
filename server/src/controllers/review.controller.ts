import { Response } from "express";
import { AuthRequest } from "../middlewares/requireAuth";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { gigsModel } from "../models/gigs.model";
import ordersModel from "../models/orders.model";
import { reviewModel } from "../models/review.model";

export const writeReview = asyncHandler (async(req: AuthRequest, res: Response) => {

  const { gigId, rating, comment } = req.body;

  console.log(gigId);
  console.log(rating);

  if (!gigId || !rating) throw new ApiError(400, 'gigId and rating are required');

  const gig = await gigsModel.findById(gigId);
  if (!gig) throw new ApiError(404, 'Gig not found');

  const completedOrder = await ordersModel.findOne({
    gig: gigId,
    buyer: req.userId,
    status: 'completed',
  });

  if (!completedOrder) throw new ApiError(403, 'You must complete an order before reviewing');

   const alreadyReviewed = await reviewModel.findOne({
    gig: gigId,
    buyer: req.userId,
  });

  if(alreadyReviewed) throw new ApiError(400, 'you already reviewed this gig')

  const review = await reviewModel.create({
    gig: gigId,
    buyer: req.userId,
    rating,
    comment
  })

   res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: review,
  });
  
})


export const getReviews = asyncHandler( async (req: AuthRequest, res: Response ) => {
  const { gigId } = req.params;

  const reviews = await reviewModel.find({ gig: gigId })
                              .populate('buyer', 'name avatar')
                              .sort({ createdAt: -1 })
                              .lean()

  res.status(200).json({
    success: true,
    message: 'Reviews fetched successfully',
    data: reviews,
  })

})