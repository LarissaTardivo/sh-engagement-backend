import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './features/auth/auth.routes';
import eventsRoutes from './features/events/events.routes';
import teamsRoutes from './features/teams/teams.routes';
import participantsRoutes from './features/participants/participants.routes';
import publicRoutes from './features/public/public.routes';
import cellsRoutes from './features/cells/cells.routes';
import prayerGroupsRoutes from './features/prayerGroups/prayerGroups.routes';
import { errorMiddleware } from './shared/middleware/error.middleware';

const app = express();

// CORS
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/participants', participantsRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/cells', cellsRoutes);
app.use('/api/prayer-groups', prayerGroupsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler (must be last)
app.use(errorMiddleware);

const PORT = parseInt(process.env.PORT || '3001', 10);

app.listen(PORT, () => {
  console.log(`sh-engagement backend running on port ${PORT}`);
});

export default app;
