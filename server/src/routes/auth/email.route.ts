import express from 'express';
import { loginUser, registerUser, verifyUserOtp } from '../../controllers/emailAuth.controller';
import { validate } from '../../middlewares/validate';
import { signupSchema } from '../../validators/auth.validator';

const router = express.Router();

router.post('/signup', validate(signupSchema), registerUser);
router.post('/verify-otp', verifyUserOtp);
router.post('/login', loginUser);

export default router;
