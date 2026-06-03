import { prisma } from '../../shared/database/prisma';

type TeamInput = { name: string; eventId: string; coordinatorName?: string; whatsappLink?: string; assignments?: string };
type TeamUpdate = { name?: string; coordinatorName?: string; whatsappLink?: string; assignments?: string };

export class TeamsRepository {
  async findAll() {
    return prisma.team.findMany({
      include: { event: { select: { name: true } } },
      orderBy: [{ event: { name: 'asc' } }, { name: 'asc' }],
    });
  }

  async findByEvent(eventId: string) {
    return prisma.team.findMany({
      where: { eventId },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.team.findUnique({
      where: { id },
      include: {
        participants: {
          orderBy: { name: 'asc' },
        },
      },
    });
  }

  async create(data: TeamInput) {
    return prisma.team.create({
      data: {
        name: data.name,
        eventId: data.eventId,
        coordinatorName: data.coordinatorName,
        whatsappLink: data.whatsappLink,
        assignments: data.assignments,
      },
    });
  }

  async update(id: string, data: TeamUpdate) {
    return prisma.team.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.team.delete({ where: { id } });
  }
}

export const teamsRepository = new TeamsRepository();
