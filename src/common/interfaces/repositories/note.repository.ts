import { Note } from '@entities/note.entity';
import {
   CreateNoteDTO,
   UpdateNoteDTO,
} from '@modules/note/presenters/note.dto';

export interface INoteRepository {
   findAll?(categoryId: string): Promise<Note[]>;
   findOne?(id: string): Promise<Note>;
   create?(note: CreateNoteDTO): Promise<Note>;
   update?(id: string, note: UpdateNoteDTO): Promise<Note>;
   delete?(id: string): Promise<Note>;
}
