import { Request, Response, NextFunction } from 'express';
import { prayerGroupsService } from './prayerGroups.service';

export class PrayerGroupsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await prayerGroupsService.findAll()); } catch (e) { next(e); }
  }
  async getAllWithParticipants(req: Request, res: Response, next: NextFunction) {
    try { res.json(await prayerGroupsService.findAllWithParticipants()); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category } = req.body as { name?: string; category?: string };
      res.status(201).json(await prayerGroupsService.create(name ?? '', category ?? ''));
    } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category } = req.body as { name?: string; category?: string };
      res.json(await prayerGroupsService.update(req.params.id, { name, category }));
    } catch (e) { next(e); }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try { await prayerGroupsService.delete(req.params.id); res.status(204).send(); } catch (e) { next(e); }
  }
}

export const prayerGroupsController = new PrayerGroupsController();
