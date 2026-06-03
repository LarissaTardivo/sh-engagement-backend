import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

export function errorMiddleware(
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  console.error(`[Error] ${req.method} ${req.path}:`, err);

  const status = err.status ?? err.statusCode ?? 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
}
