import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: 'seller' | 'buyer';
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as { id: string, role: 'seller' | 'buyer' };

    req.userId = decoded.id;
    req.userRole = decoded.role;
    
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
    return; 
  }
};
