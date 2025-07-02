import express from 'express';
import { loginUser, registerUser, verifyOtp } from '../../controllers/emailAuth.controller';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);

export default router;
