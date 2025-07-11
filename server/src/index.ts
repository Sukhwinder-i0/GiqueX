import { ConnectDB } from './config/connectDB';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import googleRoutes from './routes/auth/google.route';
import emailRoutes from './routes/auth/email.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './config/passport';
import { errorMiddleware } from './middlewares/errorMiddleware';
import userRoutes from './routes/user.route';
import gigsRoutes from './routes/gigs.routes';
import orderRoutes from './routes/order.routes'
import reviewsRoutes from './routes/review.routes'


dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(passport.initialize());


app.use('/api/v1/auth', googleRoutes);
app.use('/api/v1/auth/email', emailRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user/gigs', gigsRoutes);
app.use('/api/v1/user/orders', orderRoutes)
app.use('/api/v1/reviews', reviewsRoutes)

app.use(errorMiddleware);

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
