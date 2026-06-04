import { Request, Response, NextFunction } from 'express';
import { teamsService } from './teams.service';

export class TeamsController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await teamsService.findAll();
      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  async getByEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eventId = req.params.eventId as string;
      const teams = await teamsService.findByEvent(eventId);
      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const team = await teamsService.findById(id);
      res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eventId = req.params.eventId as string;
      const { name, coordinatorName, whatsappLink, assignments } = req.body as {
        name?: string;
        coordinatorName?: string;
        whatsappLink?: string;
        assignments?: string;
      };

      if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
      }

      const team = await teamsService.create({ name, eventId, coordinatorName, whatsappLink, assignments });
      res.status(201).json(team);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const { name, coordinatorName, whatsappLink, assignments } = req.body as {
        name?: string;
        coordinatorName?: string;
        whatsappLink?: string;
        assignments?: string;
      };

      const team = await teamsService.update(id, { name, coordinatorName, whatsappLink, assignments });
      res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await teamsService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const teamsController = new TeamsController();
