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


const corsOptions = {
  origin: [
    'http://localhost:3000', // Your frontend URL in development
    'https://yourdomain.com', // Your frontend URL in production
  ],
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(express.json());
app.use(cookieParser());

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
