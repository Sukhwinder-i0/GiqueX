import { NextFunction, Response } from 'express';
import ApiError from '../utils/ApiError';
import { AuthRequest } from './requireAuth';

export const restrictTo =
  (role: 'seller' | 'buyer') =>
  (req: AuthRequest, res: Response, next: NextFunction) => {

    console.log(req.userRole, 'ekl')
    console.log(role, 'dwsdsc')
    if (req.userRole !== role) {
      return next(new ApiError(403, `Only ${role}s can access this route`));
    }
    next();
  };
