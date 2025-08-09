import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../../utils/ApiResponse';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      },
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.redirect(`${process.env.CLIENT_URL}/?login=success`);

  },
);

export default router;
