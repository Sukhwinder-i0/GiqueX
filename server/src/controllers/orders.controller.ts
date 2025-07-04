import { Response } from "express";
import { AuthRequest } from "../middlewares/requireAuth";
import { asyncHandler } from "../utils/asyncHandler";
import ordersModel from "../models/orders.model";
import ApiError from "../utils/ApiError";
import { gigsModel } from "../models/gigs.model";


export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { gigId } = req.body;
  if (!gigId) throw new ApiError(400, 'gigId is required');

  const gig = await gigsModel.findById(gigId);
  if (!gig) throw new ApiError(404, 'Gig not found');

  if (gig.user.toString() === req.userId)
    throw new ApiError(400, 'You cannot order your own gig');

  const order = await ordersModel.create({
    gig: gig._id,
    buyer: req.userId,
    seller: gig.user,
    price: gig.price,
  });

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});


export const getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  const orders = await ordersModel.find({
    $or: [{ buyer: userId }, { seller: userId }],
  })
    .populate('gig', 'title price')
    .populate('buyer', 'name email')
    .populate('seller', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});


export const getOrderById = asyncHandler(async (req: AuthRequest, res: Response) => {

  const order = await ordersModel.findById(req.params.id)
    .populate('gig', 'title price')
    .populate('buyer', 'name email')
    .populate('seller', 'name email');

  if (!order) throw new ApiError(404, 'Order not found');

  if (
    order.buyer.toString() !== req.userId &&
    order.seller.toString() !== req.userId
  ) {
    throw new ApiError(403, 'Unauthorized to view this order');
  }

  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});


export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;

  if (!['in-progress', 'completed', 'pending'].includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }

  const order = await ordersModel.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');

  if (order.seller.toString() !== req.userId) {
    throw new ApiError(403, 'Only the seller can update this order');
  }

  order.status = status as 'in-progress' | 'completed';
  await order.save();

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status}`,
    data: order,
  });
});
