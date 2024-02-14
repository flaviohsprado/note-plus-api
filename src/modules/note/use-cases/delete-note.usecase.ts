import { Note } from '@entities/note.entity';
import { ILogger } from '@interfaces/abstracts/logger.interface';
import { INoteRepository } from '@interfaces/repositories/note.repository';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export class DeleteNoteUseCase {
   constructor(
      private readonly logger: ILogger,
      private readonly repository: INoteRepository,
   ) {}

   public async execute(id: string): Promise<Note> {
      const noteDeleted = await this.repository.delete(id);

      if (noteDeleted) {
         this.logger.log(
            'DeleteNoteUseCases execute()',
            `Note ${id} have been deleted`,
         );

         return noteDeleted;
      } else {
         throw new NotFoundException({
            message: 'Note not found!',
            statusCode: HttpStatus.NOT_FOUND,
         });
      }
   }
}
