import { Router } from 'express';
import { teamsController } from './teams.controller';
import { participantsController } from '../participants/participants.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();

// GET /api/teams — public (all teams with event name)
router.get('/', (req, res, next) => teamsController.getAll(req, res, next));

// GET /api/teams/:id — public
router.get('/:id', (req, res, next) => teamsController.getById(req, res, next));

// PATCH /api/teams/:id — admin
router.patch('/:id', authMiddleware, (req, res, next) => teamsController.update(req, res, next));

// DELETE /api/teams/:id — admin
router.delete('/:id', authMiddleware, (req, res, next) => teamsController.remove(req, res, next));

// GET /api/teams/:teamId/participants — public
router.get('/:teamId/participants', (req, res, next) =>
  participantsController.getByTeam(req, res, next),
);

// POST /api/teams/:teamId/participants — admin
router.post('/:teamId/participants', authMiddleware, (req, res, next) =>
  participantsController.create(req, res, next),
);

export default router;
