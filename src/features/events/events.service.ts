import { eventsRepository } from './events.repository';

export class EventsService {
  async findAll() {
    return eventsRepository.findAll();
  }

  async findById(id: string) {
    const event = await eventsRepository.findById(id);
    if (!event) {
      const err = new Error('Event not found') as Error & { status: number };
      err.status = 404;
      throw err;
    }
    return event;
  }

  async create(data: { name: string; description?: string }) {
    return eventsRepository.create(data);
  }

  async update(id: string, data: { name?: string; description?: string }) {
    const event = await eventsRepository.findById(id);
    if (!event) {
      const err = new Error('Event not found') as Error & { status: number };
      err.status = 404;
      throw err;
    }
    return eventsRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const event = await eventsRepository.findById(id);
    if (!event) {
      const err = new Error('Event not found') as Error & { status: number };
      err.status = 404;
      throw err;
    }
    await eventsRepository.delete(id);
  }
}

export const eventsService = new EventsService();
