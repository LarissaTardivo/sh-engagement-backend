import { CommunityType } from '@prisma/client';
import { prisma } from '../../shared/database/prisma';

export class ParticipantsRepository {
  async findByTeam(teamId: string) {
    return prisma.participant.findMany({
      where: { teamId },
      orderBy: { name: 'asc' },
    });
  }

  async create(data: {
    name: string;
    communityType: CommunityType;
    prayerGroup?: string;
    cell?: string;
    teamId?: string;
  }) {
    return prisma.participant.create({
      data: {
        name: data.name,
        communityType: data.communityType,
        prayerGroup: data.prayerGroup,
        cell: data.cell,
        teamId: data.teamId ?? null,
      },
    });
  }

  async update(id: string, data: {
    name?: string;
    communityType?: CommunityType;
    prayerGroup?: string | null;
    cell?: string | null;
  }) {
    return prisma.participant.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.participant.delete({ where: { id } });
  }
}

export const participantsRepository = new ParticipantsRepository();
