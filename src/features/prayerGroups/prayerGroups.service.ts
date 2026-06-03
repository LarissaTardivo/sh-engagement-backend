import { prayerGroupsRepository } from './prayerGroups.repository';

function notFound(): Error & { status: number } {
  const e = new Error('PrayerGroup not found') as Error & { status: number };
  e.status = 404;
  return e;
}

export class PrayerGroupsService {
  findAll() { return prayerGroupsRepository.findAll(); }
  findAllWithParticipants() { return prayerGroupsRepository.findAllWithParticipants(); }

  async create(name: string, category: string) {
    if (!name?.trim()) {
      const e = new Error('name is required') as Error & { status: number };
      e.status = 400; throw e;
    }
    if (!category?.trim()) {
      const e = new Error('category is required') as Error & { status: number };
      e.status = 400; throw e;
    }
    return prayerGroupsRepository.create(name.trim(), category.trim());
  }

  async update(id: string, data: { name?: string; category?: string }) {
    const all = await prayerGroupsRepository.findAll();
    if (!all.find(g => g.id === id)) throw notFound();
    return prayerGroupsRepository.update(id, data);
  }

  async delete(id: string) {
    const all = await prayerGroupsRepository.findAll();
    if (!all.find(g => g.id === id)) throw notFound();
    return prayerGroupsRepository.delete(id);
  }
}

export const prayerGroupsService = new PrayerGroupsService();
