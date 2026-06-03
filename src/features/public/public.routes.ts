import { Router } from 'express';
import { publicController } from './public.controller';

const router = Router();

// GET /api/public/search?q=&eventId= — public
router.get('/search', (req, res, next) => publicController.search(req, res, next));

export default router;
