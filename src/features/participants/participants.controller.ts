import { Request, Response, NextFunction } from 'express';
import { participantsService } from './participants.service';

export class ParticipantsController {
  async getByTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teamId } = req.params;
      const participants = await participantsService.findByTeam(teamId);
      res.status(200).json(participants);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teamId } = req.params;
      const { name, communityType, prayerGroup, cell } = req.body as {
        name?: string;
        communityType?: string;
        prayerGroup?: string;
        cell?: string;
      };

      if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
      }

      if (!communityType) {
        res.status(400).json({ error: 'communityType is required' });
        return;
      }

      const participant = await participantsService.create({
        name,
        communityType,
        prayerGroup,
        cell,
        teamId,
      });

      res.status(201).json(participant);
    } catch (err) {
      next(err);
    }
  }

  async createStandalone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, communityType, prayerGroup, cell } = req.body as {
        name?: string;
        communityType?: string;
        prayerGroup?: string;
        cell?: string;
      };

      if (!name) { res.status(400).json({ error: 'name is required' }); return; }
      if (!communityType) { res.status(400).json({ error: 'communityType is required' }); return; }

      const participant = await participantsService.create({ name, communityType, prayerGroup, cell });
      res.status(201).json(participant);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, communityType, prayerGroup, cell } = req.body as {
        name?: string;
        communityType?: string;
        prayerGroup?: string;
        cell?: string;
      };
      const participant = await participantsService.update(id, { name, communityType, prayerGroup, cell });
      res.status(200).json(participant);
    } catch (err) {
      next(err);
    }
  }

  async removeFromGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await participantsService.removeFromGroup(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await participantsService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const participantsController = new ParticipantsController();
