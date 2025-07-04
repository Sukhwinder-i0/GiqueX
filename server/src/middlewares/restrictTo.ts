import { NextFunction, Response } from 'express';
import ApiError from '../utils/ApiError';
import { AuthRequest } from './requireAuth';

export const restrictTo =
  (role: 'seller' | 'user') =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userRole !== role) {
      return next(new ApiError(403, `Only ${role}s can access this route`));
    }
    next();
  };
