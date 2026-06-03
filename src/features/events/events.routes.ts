import { Router } from 'express';
import { eventsController } from './events.controller';
import { teamsController } from '../teams/teams.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();

// GET /api/events — public
router.get('/', (req, res, next) => eventsController.getAll(req, res, next));

// POST /api/events — admin
router.post('/', authMiddleware, (req, res, next) => eventsController.create(req, res, next));

// GET /api/events/:id — public
router.get('/:id', (req, res, next) => eventsController.getById(req, res, next));

// PATCH /api/events/:id — admin
router.patch('/:id', authMiddleware, (req, res, next) => eventsController.update(req, res, next));

// DELETE /api/events/:id — admin
router.delete('/:id', authMiddleware, (req, res, next) => eventsController.remove(req, res, next));

// GET /api/events/:eventId/teams — public
router.get('/:eventId/teams', (req, res, next) => teamsController.getByEvent(req, res, next));

// POST /api/events/:eventId/teams — admin
router.post('/:eventId/teams', authMiddleware, (req, res, next) =>
  teamsController.create(req, res, next),
);

export default router;
