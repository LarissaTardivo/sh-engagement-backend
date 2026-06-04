import { Request, Response, NextFunction } from 'express';
import { cellsService } from './cells.service';

export class CellsController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { res.json(await cellsService.findAll()); } catch (e) { next(e); }
  }
  async getAllWithParticipants(_req: Request, res: Response, next: NextFunction) {
    try { res.json(await cellsService.findAllWithParticipants()); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category } = req.body as { name?: string; category?: string };
      res.status(201).json(await cellsService.create(name ?? '', category ?? ''));
    } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, category } = req.body as { name?: string; category?: string };
      res.json(await cellsService.update(id, { name, category }));
    } catch (e) { next(e); }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await cellsService.delete(id);
      res.status(204).send();
    } catch (e) { next(e); }
  }
}

export const cellsController = new CellsController();
