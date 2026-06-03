import { prisma } from '../../shared/database/prisma';

export class PrayerGroupsRepository {
  findAll() {
    return prisma.prayerGroup.findMany({ orderBy: { name: 'asc' } });
  }

  async findAllWithParticipants() {
    const groups = await prisma.prayerGroup.findMany({ orderBy: { name: 'asc' } });
    const participants = await prisma.participant.findMany({
      where: { prayerGroup: { in: groups.map(g => g.name) } },
      include: { team: { select: { name: true, eventId: true } } },
      orderBy: { name: 'asc' },
    });
    return groups.map(group => ({
      ...group,
      participants: participants.filter(p => p.prayerGroup === group.name),
    }));
  }

  create(name: string, category: string) {
    return prisma.prayerGroup.create({ data: { name, category } });
  }

  update(id: string, data: { name?: string; category?: string }) {
    return prisma.prayerGroup.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.prayerGroup.delete({ where: { id } });
  }
}

export const prayerGroupsRepository = new PrayerGroupsRepository();
