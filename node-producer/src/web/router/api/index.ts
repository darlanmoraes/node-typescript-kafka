import { Router } from 'express';
import { router as posts } from './posts';

export const router = Router();

router.use('/posts', posts);