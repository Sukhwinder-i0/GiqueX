import express from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { createGig, deleteGig, getGigs, updateGig } from '../../controllers/gigs.controller';
import upload from '../../middlewares/upload';
import { restrictTo } from '../../middlewares/restrictTo';

const router = express.Router();

router.get('/get', requireAuth, getGigs)
router.post('/create', requireAuth, restrictTo('seller'),  upload.array('media', 5), createGig);
router.put('/update/:id', requireAuth, restrictTo('seller'),  upload.array('media', 5), updateGig);
router.delete('/delete/:id', requireAuth, restrictTo('seller'),  upload.array('media', 5), deleteGig);



export default router;
