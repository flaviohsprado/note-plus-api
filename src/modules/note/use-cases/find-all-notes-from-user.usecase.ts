import { Note } from '@entities/note.entity';
import { ICacheManager } from '@interfaces/abstracts/cache.service';
import { INoteRepository } from '@interfaces/repositories/note.repository';

export class FindAllNotesFromUserUseCase {
   constructor(
      private readonly repository: INoteRepository,
      private readonly cacheManager: ICacheManager,
   ) { }

   public async execute(userId: string): Promise<Note[]> {
      const cachedNotes =
         await this.cacheManager.getCachedObject<Note[]>('userNotes');

      if (cachedNotes) return cachedNotes;

      const notes = await this.repository.findAllFromUser(userId);

      await this.cacheManager.setObjectInCache('userNotes', notes);

      return notes;
   }
}
