import { Note } from '@entities/note.entity';
import { ICacheManager } from '@interfaces/abstracts/cache.service';
import { INoteRepository } from '@interfaces/repositories/note.repository';
import { NotFoundException } from '@nestjs/common';

export class FindOneNoteUseCase {
   constructor(
      private readonly repository: INoteRepository,
      private readonly cacheManager: ICacheManager,
   ) {}

   public async execute(id: string): Promise<Note> {
      const cachedNote = await this.cacheManager.getCachedObject<Note>('note');

      if (cachedNote && cachedNote.id === id) return cachedNote;

      const note: Note = await this.repository.findOne(id);

      if (!note) throw new NotFoundException({ message: 'Note not found' });

      await this.cacheManager.setObjectInCache('note', note);

      return note;
   }
}
