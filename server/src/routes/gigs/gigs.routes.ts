import express from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { createGig, getGigs, updateGig } from '../../controllers/gigs.controller';
import upload from '../../middlewares/upload';

const router = express.Router();

router.get('/get', requireAuth, getGigs)
router.post('/create', requireAuth, upload.array('media', 5), createGig);
router.put('/update/:id', requireAuth, upload.array('media', 5), updateGig);



export default router;
