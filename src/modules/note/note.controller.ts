import { DeleteApiResponse } from '@/common/decorators/requests/deleteApiResponse.decorator';
import { GetApiResponse } from '@/common/decorators/requests/getApiResponse.decorator';
import { PostApiResponse } from '@/common/decorators/requests/postApiResponse.decorator';
import { PutApiResponse } from '@/common/decorators/requests/putApiResponse.decorator';
import { IAuth } from '@/common/interfaces/auth.interface';
import { HttpCode, Inject } from '@nestjs/common';
import { Body, Controller, Param, Req } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '@utils/usecase-proxy';
import { NoteModule } from './note.module';
import { CreateNoteDTO, UpdateNoteDTO } from './presenters/note.dto';
import { NotePresenter } from './presenters/note.presenter';
import { CreateNoteUseCase } from './use-cases/create-note.usecase';
import { DeleteNoteUseCase } from './use-cases/delete-note.usecase';
import { FindAllNoteUseCase } from './use-cases/find-all-notes.usecase';
import { FindOneNoteUseCase } from './use-cases/find-one-note.usecase';
import { UpdateNoteUseCase } from './use-cases/update-note.usecase';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
   constructor(
      @Inject(NoteModule.GET_NOTES_USECASES_PROXY)
      private readonly findAllNotesUseCase: UseCaseProxy<FindAllNoteUseCase>,
      @Inject(NoteModule.GET_NOTES_FROM_USER_USECASES_PROXY)
      private readonly findAllNotesFromUserUseCase: UseCaseProxy<FindAllNoteUseCase>,
      @Inject(NoteModule.GET_NOTE_USECASES_PROXY)
      private readonly findOneNoteUseCase: UseCaseProxy<FindOneNoteUseCase>,
      @Inject(NoteModule.POST_NOTE_USECASES_PROXY)
      private readonly createNoteUseCase: UseCaseProxy<CreateNoteUseCase>,
      @Inject(NoteModule.PUT_NOTE_USECASES_PROXY)
      private readonly updateNoteUseCase: UseCaseProxy<UpdateNoteUseCase>,
      @Inject(NoteModule.DELETE_NOTE_USECASES_PROXY)
      private readonly deleteNoteUseCase: UseCaseProxy<DeleteNoteUseCase>,
   ) { }

   @GetApiResponse(NotePresenter)
   public async findAllNotes(@Req() req: IAuth): Promise<NotePresenter[]> {
      const notes = await this.findAllNotesFromUserUseCase
         .getInstance()
         .execute(req.user.id);

      return notes.map((note) => new NotePresenter(note));
   }

   @GetApiResponse(NotePresenter, ':id')
   public async findOneNote(@Param('id') id: string): Promise<NotePresenter> {
      const note = await this.findOneNoteUseCase.getInstance().execute(id);

      return new NotePresenter(note);
   }

   @GetApiResponse(NotePresenter, '/:categoryId/all')
   public async findAllNote(
      @Param('categoryId') categoryId: string,
   ): Promise<NotePresenter[]> {
      const notes = await this.findAllNotesUseCase
         .getInstance()
         .execute(categoryId);

      return notes.map((note) => new NotePresenter(note));
   }

   @PostApiResponse(NotePresenter, '', false)
   public async createNote(
      @Body() note: CreateNoteDTO,
   ): Promise<NotePresenter> {
      const createdNote = await this.createNoteUseCase
         .getInstance()
         .execute(note);

      return new NotePresenter(createdNote);
   }

   @PutApiResponse(NotePresenter, '/:id')
   public async updateNote(
      @Param('id') id: string,
      @Body() note: UpdateNoteDTO,
   ): Promise<NotePresenter> {
      const updatedNote = await this.updateNoteUseCase
         .getInstance()
         .execute(id, note);

      return new NotePresenter(updatedNote);
   }

   @HttpCode(204)
   @DeleteApiResponse('/:id')
   public async deleteNote(@Param('id') id: string): Promise<NotePresenter> {
      const deletedNote = await this.deleteNoteUseCase
         .getInstance()
         .execute(id);

      return new NotePresenter(deletedNote);
   }
}
