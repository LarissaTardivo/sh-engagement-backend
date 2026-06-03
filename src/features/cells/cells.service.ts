import { cellsRepository } from './cells.repository';

function notFound(): Error & { status: number } {
  const e = new Error('Cell not found') as Error & { status: number };
  e.status = 404;
  return e;
}

export class CellsService {
  findAll() { return cellsRepository.findAll(); }
  findAllWithParticipants() { return cellsRepository.findAllWithParticipants(); }

  async create(name: string, category: string) {
    if (!name?.trim()) {
      const e = new Error('name is required') as Error & { status: number };
      e.status = 400; throw e;
    }
    if (!category?.trim()) {
      const e = new Error('category is required') as Error & { status: number };
      e.status = 400; throw e;
    }
    return cellsRepository.create(name.trim(), category.trim());
  }

  async update(id: string, data: { name?: string; category?: string }) {
    const all = await cellsRepository.findAll();
    if (!all.find(c => c.id === id)) throw notFound();
    return cellsRepository.update(id, data);
  }

  async delete(id: string) {
    const all = await cellsRepository.findAll();
    if (!all.find(c => c.id === id)) throw notFound();
    return cellsRepository.delete(id);
  }
}

export const cellsService = new CellsService();
