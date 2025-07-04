import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userRole? : 'seller' | 'buyer';
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as { 
      id: string,  
      role: 'seller' | 'buyer'
    };
    req.userId = decoded.id;
    req.userRole = decoded.role;

    console.log(decoded.role)
    
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

