import jwt from 'jsonwebtoken';

export class AuthService {
  login(email: string, password: string): string {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminEmail || !adminPassword || !jwtSecret) {
      throw new Error('Auth environment variables not configured');
    }

    if (email !== adminEmail || password !== adminPassword) {
      const err = new Error('Invalid credentials') as Error & { status: number };
      err.status = 401;
      throw err;
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '8h' });
    return token;
  }
}

export const authService = new AuthService();
