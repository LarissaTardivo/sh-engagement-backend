import { Router } from 'express';
import { prayerGroupsController } from './prayerGroups.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();

router.get('/', (req, res, next) => prayerGroupsController.getAll(req, res, next));
router.get('/with-participants', (req, res, next) => prayerGroupsController.getAllWithParticipants(req, res, next));
router.post('/', authMiddleware, (req, res, next) => prayerGroupsController.create(req, res, next));
router.patch('/:id', authMiddleware, (req, res, next) => prayerGroupsController.update(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => prayerGroupsController.remove(req, res, next));

export default router;
