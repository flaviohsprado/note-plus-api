import { Note } from '@/entities/note.entity';
import { ILogger } from '@interfaces/abstracts/logger.interface';
import { INoteRepository } from '@interfaces/repositories/note.repository';
import { CreateNoteDTO } from '../presenters/note.dto';

export class CreateNoteUseCase {
   constructor(
      private readonly logger: ILogger,
      private readonly repository: INoteRepository,
   ) {}

   public async execute(note: CreateNoteDTO): Promise<Note> {
      const createdNote = await this.repository.create(note);

      this.logger.log(
         'CreateNoteUseCases execute()',
         'New note have been inserted',
      );

      return createdNote;
   }
}
