import { ConnectDB } from './config/connectDB';
import express from 'express'
import dotenv from 'dotenv';
import passport from 'passport';
import authRoutes from './routes/auth.route';
import './config/passport';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(passport.initialize())

app.use('/api/v1/auth', authRoutes)

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
