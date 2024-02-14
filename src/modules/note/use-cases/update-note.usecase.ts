import { Note } from '@entities/note.entity';
import { ILogger } from '@interfaces/abstracts/logger.interface';
import { INoteRepository } from '@interfaces/repositories/note.repository';
import { UpdateNoteDTO } from '../presenters/note.dto';

export class UpdateNoteUseCase {
   constructor(
      private readonly logger: ILogger,
      private readonly repository: INoteRepository,
   ) {}

   public async execute(id: string, note: UpdateNoteDTO): Promise<Note> {
      const updatedNote = await this.repository.update(id, note);

      this.logger.log(
         'UpdateNoteUseCases execute()',
         `Note ${id} have been updated`,
      );

      return updatedNote;
   }
}
