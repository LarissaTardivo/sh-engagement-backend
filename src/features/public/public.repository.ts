import { prisma } from '../../shared/database/prisma';

export class PublicRepository {
  async search(q: string, eventId?: string) {
    const where = q.trim()
      ? {
          ...(eventId ? { eventId } : {}),
          OR: [
            { name: { contains: q, mode: 'insensitive' as const } },
            { participants: { some: { name: { contains: q, mode: 'insensitive' as const } } } },
            { participants: { some: { cell: { contains: q, mode: 'insensitive' as const } } } },
            { participants: { some: { prayerGroup: { contains: q, mode: 'insensitive' as const } } } },
          ],
        }
      : { ...(eventId ? { eventId } : {}) };

    const teams = await prisma.team.findMany({
      where,
      include: {
        participants: {
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    return { teams };
  }
}

export const publicRepository = new PublicRepository();
