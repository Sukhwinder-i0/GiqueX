import mongoose from 'mongoose';
import { DB_Name } from '../constants/constant';

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
    console.log(`\n✅ MongoDB connected !! DB HOST: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};
