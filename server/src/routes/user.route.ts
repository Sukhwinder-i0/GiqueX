import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { getUser, logout, switchUserRole } from '../controllers/user.controller';

const router = express.Router();

router.get('/me', requireAuth, getUser);
router.post('/logout', requireAuth, logout);
router.post('/role/switch', requireAuth, switchUserRole);

export default router;
