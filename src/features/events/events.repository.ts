import { prisma } from '../../shared/database/prisma';

export class EventsRepository {
  async findAll() {
    return prisma.event.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        teams: {
          orderBy: { name: 'asc' },
          include: {
            _count: { select: { participants: true } },
          },
        },
      },
    });
  }

  async create(data: { name: string; description?: string }) {
    return prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async update(id: string, data: { name?: string; description?: string }) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.event.delete({ where: { id } });
  }
}

export const eventsRepository = new EventsRepository();
