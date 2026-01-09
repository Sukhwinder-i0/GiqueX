import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createGig, deleteGig, getGigs, updateGig, getAllGigs, getGigById } from '../controllers/gigs.controller';
import upload from '../middlewares/upload';
import { restrictTo } from '../middlewares/restrictTo';
import { createGigSchema, updateGigSchema } from '../validators/gig.validator';
import { validate } from '../middlewares/validate';
import { parseFormData } from '../middlewares/parseFormData';

const router = express.Router();

// Public routes - must come before /:id
router.get('/browse', getAllGigs);

// Protected routes - specific routes before dynamic /:id
router.get('/get', requireAuth, getGigs);
router.post('/create', requireAuth, restrictTo('seller'), upload.array('media', 5), parseFormData, validate(createGigSchema),  createGig);
router.put('/update/:id', requireAuth, restrictTo('seller'), upload.array('media', 5), parseFormData, validate(updateGigSchema), updateGig);
router.delete('/delete/:id', requireAuth, restrictTo('seller'), deleteGig);

// Public route - must come last to avoid conflicts
router.get('/:id', getGigById);

export default router;
