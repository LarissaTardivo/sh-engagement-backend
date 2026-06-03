import { Router } from 'express';
import { cellsController } from './cells.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();

router.get('/', (req, res, next) => cellsController.getAll(req, res, next));
router.get('/with-participants', (req, res, next) => cellsController.getAllWithParticipants(req, res, next));
router.post('/', authMiddleware, (req, res, next) => cellsController.create(req, res, next));
router.patch('/:id', authMiddleware, (req, res, next) => cellsController.update(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => cellsController.remove(req, res, next));

export default router;
