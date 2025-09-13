import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { getUser, logout, switchToSeller } from '../controllers/user.controller';

const router = express.Router();

router.get('/me', requireAuth, getUser);
router.post('/logout', requireAuth, logout);
// Align with client call: POST /user/role/seller
router.post('/role/switch', requireAuth, switchToSeller);

export default router;
