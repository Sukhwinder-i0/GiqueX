import express from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { UserModel } from '../../models/user.model';

const router = express.Router();

import { Request, Response, NextFunction } from 'express';

router.get('/me', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // @ts-ignore
    const user = await UserModel.findById(req.userId).select('-password -id -isVerified');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    console.log(user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
