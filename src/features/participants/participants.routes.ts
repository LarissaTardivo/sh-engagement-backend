import { Router } from 'express';
import { participantsController } from './participants.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();

// POST /api/participants — admin (standalone, sem equipe)
router.post('/', authMiddleware, (req, res, next) =>
  participantsController.createStandalone(req, res, next),
);

// PATCH /api/participants/:id — admin
router.patch('/:id', authMiddleware, (req, res, next) =>
  participantsController.update(req, res, next),
);

// DELETE /api/participants/:id/group — remove from group + clean team records
router.delete('/:id/group', authMiddleware, (req, res, next) =>
  participantsController.removeFromGroup(req, res, next),
);

// DELETE /api/participants/:id — admin
router.delete('/:id', authMiddleware, (req, res, next) =>
  participantsController.remove(req, res, next),
);

export default router;
