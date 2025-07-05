import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orders.controller';
import { restrictTo } from '../middlewares/restrictTo';
const router = express.Router();

router.get('/', requireAuth, getMyOrders);
router.get('/getOrder', requireAuth, getOrderById)
router.post('/create', requireAuth, restrictTo('buyer'), createOrder);
router.put('/update-status', requireAuth, restrictTo('seller'), createOrder);

export default router;
