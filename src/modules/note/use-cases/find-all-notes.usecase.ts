import { Note } from '@entities/note.entity';
import { ICacheManager } from '@interfaces/abstracts/cache.service';
import { INoteRepository } from '@interfaces/repositories/note.repository';

export class FindAllNoteUseCase {
   constructor(
      private readonly repository: INoteRepository,
      private readonly cacheManager: ICacheManager,
   ) {}

   public async execute(categoryId: string): Promise<Note[]> {
      const cachedNotes =
         await this.cacheManager.getCachedObject<Note[]>('notes');

      if (cachedNotes) return cachedNotes;

      const notes = await this.repository.findAll(categoryId);

      await this.cacheManager.setObjectInCache('notes', notes);

      return notes;
   }
}
