import { teamsRepository } from './teams.repository';

type TeamInput = { name: string; eventId: string; coordinatorName?: string; whatsappLink?: string; assignments?: string };
type TeamUpdate = { name?: string; coordinatorName?: string; whatsappLink?: string; assignments?: string };

export class TeamsService {
  async findAll() {
    return teamsRepository.findAll();
  }

  async findByEvent(eventId: string) {
    return teamsRepository.findByEvent(eventId);
  }

  async findById(id: string) {
    const team = await teamsRepository.findById(id);
    if (!team) {
      const err = new Error('Team not found') as Error & { status: number };
      err.status = 404;
      throw err;
    }
    return team;
  }

  async create(data: TeamInput) {
    return teamsRepository.create(data);
  }

  async update(id: string, data: TeamUpdate) {
    const team = await teamsRepository.findById(id);
    if (!team) {
      const err = new Error('Team not found') as Error & { status: number };
      err.status = 404;
      throw err;
    }
    return teamsRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const team = await teamsRepository.findById(id);
    if (!team) {
      const err = new Error('Team not found') as Error & { status: number };
      err.status = 404;
      throw err;
    }
    await teamsRepository.delete(id);
  }
}

export const teamsService = new TeamsService();
