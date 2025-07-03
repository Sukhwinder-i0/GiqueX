import express from 'express';
import { loginUser, registerUser, verifyUserOtp } from '../../controllers/emailAuth.controller';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/verify-otp', verifyUserOtp);
router.post('/login', loginUser);

export default router;
