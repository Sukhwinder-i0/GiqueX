import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createOrder, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/orders.controller';
import { restrictTo } from '../middlewares/restrictTo';
const router = express.Router();

router.get('/', requireAuth, getMyOrders);
router.get('/getOrder/:id', requireAuth, getOrderById)
router.post('/create', requireAuth, restrictTo('buyer'), createOrder);
router.put('/update-status/:id', requireAuth, restrictTo('seller'), updateOrderStatus);

export default router;
