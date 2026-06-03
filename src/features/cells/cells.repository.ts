import { prisma } from '../../shared/database/prisma';

export class CellsRepository {
  findAll() {
    return prisma.cell.findMany({ orderBy: { name: 'asc' } });
  }

  async findAllWithParticipants() {
    const cells = await prisma.cell.findMany({ orderBy: { name: 'asc' } });
    const participants = await prisma.participant.findMany({
      where: { cell: { in: cells.map(c => c.name) } },
      include: { team: { select: { name: true, eventId: true } } },
      orderBy: { name: 'asc' },
    });
    return cells.map(cell => ({
      ...cell,
      participants: participants.filter(p => p.cell === cell.name),
    }));
  }

  create(name: string, category: string) {
    return prisma.cell.create({ data: { name, category } });
  }

  update(id: string, data: { name?: string; category?: string }) {
    return prisma.cell.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.cell.delete({ where: { id } });
  }
}

export const cellsRepository = new CellsRepository();
