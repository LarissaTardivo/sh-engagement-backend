import { CommunityType } from '@prisma/client';
import { prisma } from '../../shared/database/prisma';

export class ParticipantsRepository {
  async findByTeam(teamId: string) {
    return prisma.participant.findMany({
      where: { teamId },
      orderBy: { name: 'asc' },
    });
  }

  async findStandalone(name: string, cell?: string, prayerGroup?: string) {
    return prisma.participant.findFirst({
      where: {
        name,
        teamId: null,
        ...(cell ? { cell } : {}),
        ...(prayerGroup ? { prayerGroup } : {}),
      },
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
    subscribed?: boolean;
  }) {
    return prisma.participant.update({ where: { id }, data });
  }

  async findById(id: string) {
    return prisma.participant.findUnique({ where: { id } });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.participant.delete({ where: { id } });
  }

  async removeFromTeam(id: string): Promise<void> {
    await prisma.participant.update({ where: { id }, data: { teamId: null } });
  }

  async deleteDuplicateStandalones(name: string, cell?: string, prayerGroup?: string, keepId?: string): Promise<void> {
    await prisma.participant.deleteMany({
      where: {
        name,
        teamId: null,
        ...(cell ? { cell } : {}),
        ...(prayerGroup ? { prayerGroup } : {}),
        ...(keepId ? { id: { not: keepId } } : {}),
      },
    });
  }

  async deleteAllByName(name: string): Promise<void> {
    await prisma.participant.deleteMany({ where: { name } });
  }

  async deleteTeamParticipationsByName(name: string): Promise<void> {
    await prisma.participant.deleteMany({ where: { name, teamId: { not: null } } });
  }
}

export const participantsRepository = new ParticipantsRepository();
