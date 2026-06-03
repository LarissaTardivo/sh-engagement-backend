import { Request, Response, NextFunction } from 'express';
import { publicRepository } from './public.repository';

export class PublicController {
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = (req.query['q'] as string) ?? '';
      const eventId = req.query['eventId'] as string | undefined;

      const result = await publicRepository.search(q, eventId || undefined);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const publicController = new PublicController();
