import express from 'express';
import { UserModel } from '../models/user.model';
import passport from 'passport';
import {Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv'

dotenv.config()

passport.use
(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    async (
      req: express.Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User | false | null) => void
    ) => {
      try {
        let user = await UserModel.findOne({ googleID: profile.id });

        if (!user) {
          user = await UserModel.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            googleID: profile.id,
            avatar: profile.photos?.[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
