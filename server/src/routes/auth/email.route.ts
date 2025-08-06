import express from 'express';
import { loginUser, registerUser, verifyUserOtp } from '../../controllers/emailAuth.controller';
import { validate } from '../../middlewares/validate';
import { signinSchema, signupSchema } from '../../validators/auth.validator';

const router = express.Router();

router.post('/signup', validate(signupSchema), registerUser);
router.post('/verify-otp', verifyUserOtp);
router.post('/signin', validate(signinSchema), loginUser);

export default router;
