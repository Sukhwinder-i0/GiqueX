import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createGig, deleteGig, getGigs, updateGig } from '../controllers/gigs.controller';
import upload from '../middlewares/upload';
import { restrictTo } from '../middlewares/restrictTo';
import { createGigSchema, updateGigSchema } from '../validators/gig.validator';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.get('/get', requireAuth, getGigs);
router.post('/create', requireAuth, restrictTo('seller'), upload.array('media', 5), validate(createGigSchema),  createGig);
router.put('/update/:id', requireAuth, restrictTo('seller'), upload.array('media', 5), validate(updateGigSchema), updateGig);
router.delete('/delete/:id', requireAuth, restrictTo('seller'), upload.array('media', 5), deleteGig);

export default router;
