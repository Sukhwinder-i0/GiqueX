import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { getUser, switchToSeller } from '../controllers/user.controller';

const router = express.Router();

router.get('/me', requireAuth, getUser);

router.patch('/switch-role', requireAuth, switchToSeller);

export default router;
