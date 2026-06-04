import { Request, Response, NextFunction } from 'express';
import { eventsService } from './events.service';

export class EventsController {
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await eventsService.findAll();
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const event = await eventsService.findById(id);
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = req.body as { name?: string; description?: string };

      if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
      }

      const event = await eventsService.create({ name, description });
      res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description } = req.body as { name?: string; description?: string };
      const event = await eventsService.update(id, { name, description });
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await eventsService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const eventsController = new EventsController();
