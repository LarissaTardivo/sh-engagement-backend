import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export class AuthController {
  login(req: Request, res: Response, next: NextFunction): void {
    try {
      const { email, password } = req.body as { email?: string; password?: string };

      if (!email || !password) {
        res.status(400).json({ error: 'email and password are required' });
        return;
      }

      const token = authService.login(email, password);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
