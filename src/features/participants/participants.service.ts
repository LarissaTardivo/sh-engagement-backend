import { CommunityType } from '@prisma/client';
import { participantsRepository } from './participants.repository';

const VALID_COMMUNITY_TYPES: CommunityType[] = ['OBRA', 'COMUNIDADE_VIDA', 'COMUNIDADE_ALIANCA'];

function makeHttpError(message: string, status: number): Error & { status: number } {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  return err;
}

export class ParticipantsService {
  async findByTeam(teamId: string) {
    return participantsRepository.findByTeam(teamId);
  }

  async create(data: {
    name: string;
    communityType: string;
    prayerGroup?: string;
    cell?: string;
    teamId?: string;
  }) {
    if (!VALID_COMMUNITY_TYPES.includes(data.communityType as CommunityType)) {
      throw makeHttpError(
        `communityType must be one of: ${VALID_COMMUNITY_TYPES.join(', ')}`,
        400,
      );
    }

    const communityType = data.communityType as CommunityType;

    if (communityType === 'OBRA') {
      if (!data.prayerGroup) {
        throw makeHttpError('prayerGroup is required for OBRA community type', 400);
      }
    } else {
      if (!data.cell) {
        throw makeHttpError(
          `cell is required for ${communityType} community type`,
          400,
        );
      }
    }

    return participantsRepository.create({
      name: data.name,
      communityType,
      prayerGroup: data.prayerGroup,
      cell: data.cell,
      teamId: data.teamId,
    });
  }

  async update(id: string, data: {
    name?: string;
    communityType?: string;
    prayerGroup?: string | null;
    cell?: string | null;
    subscribed?: boolean;
  }) {
    if (data.communityType && !VALID_COMMUNITY_TYPES.includes(data.communityType as CommunityType)) {
      throw makeHttpError(`communityType must be one of: ${VALID_COMMUNITY_TYPES.join(', ')}`, 400);
    }

    const communityType = data.communityType as CommunityType | undefined;

    if (communityType === 'OBRA') {
      if (!data.prayerGroup) throw makeHttpError('prayerGroup is required for OBRA', 400);
    } else if (communityType === 'COMUNIDADE_VIDA' || communityType === 'COMUNIDADE_ALIANCA') {
      if (!data.cell) throw makeHttpError(`cell is required for ${communityType}`, 400);
    }

    return participantsRepository.update(id, {
      name: data.name,
      communityType,
      prayerGroup: communityType === undefined ? undefined : communityType === 'OBRA' ? data.prayerGroup : null,
      cell: communityType === undefined ? undefined : communityType !== 'OBRA' ? data.cell : null,
      subscribed: data.subscribed,
    });
  }

  async removeFromGroup(id: string): Promise<void> {
    const participant = await participantsRepository.findById(id);
    if (!participant) throw makeHttpError('Participant not found', 404);
    await participantsRepository.update(id, { cell: null, prayerGroup: null });
    await participantsRepository.deleteTeamParticipationsByName(participant.name);
  }

  async delete(id: string): Promise<void> {
    const participant = await participantsRepository.findById(id);
    if (!participant) throw makeHttpError('Participant not found', 404);
    await participantsRepository.deleteById(id);
  }
}

export const participantsService = new ParticipantsService();
