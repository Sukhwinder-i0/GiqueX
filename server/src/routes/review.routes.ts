import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { restrictTo } from '../middlewares/restrictTo';
import { getReviews, writeReview } from '../controllers/review.controller';
import { reviewSchema } from '../validators/review.validator';
import { validate } from '../middlewares/validate';


const router = express.Router();

router.post('/write', requireAuth, restrictTo('buyer'), validate(reviewSchema), writeReview);

router.get('/:gigId', getReviews);

export default router;
