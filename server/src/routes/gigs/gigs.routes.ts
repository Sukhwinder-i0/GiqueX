import express from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { createGig } from '../../controllers/gigs.controller';
import upload from '../../middlewares/upload';

const router = express.Router();

router.post('/create', requireAuth, upload.array('media', 5), createGig);

export default router;
