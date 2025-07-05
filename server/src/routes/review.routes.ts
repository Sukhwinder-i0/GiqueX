import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { restrictTo } from '../middlewares/restrictTo';
import { getReviews, writeReview } from '../controllers/review.controller';


const router = express.Router();

router.post('/write', requireAuth, restrictTo('buyer'), writeReview);

router.get('/:gigId', getReviews);

export default router;
