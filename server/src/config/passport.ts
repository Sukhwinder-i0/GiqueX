import express from 'express';
import { UserModel } from '../models/user.model';
import passport from 'passport';
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error('Missing required Google OAuth environment variables');
}


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (
      req: express.Request,
      accessToken: string,
      refreshToken: string,
      params: any,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        // your logic
        const user = await UserModel.findOne({ email: profile.emails?.[0].value });
        if (!user) {
          const newUser = await UserModel.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            googleID: profile.id,
            avatar: profile.photos?.[0].value,
          });
          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);


