import { INoteRepository } from '@/common/interfaces/repositories/note.repository';
import { Note } from '@/entities/note.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDTO, UpdateNoteDTO } from './presenters/note.dto';

@Injectable()
export class NoteRepository implements INoteRepository {
   constructor(
      @InjectRepository(Note)
      private readonly repository: Repository<Note>,
   ) { }

   public async findAllFromUser(userId: string): Promise<Note[]> {
      return this.repository.find({
         where: {
            category: {
               userId,
            },
         },
         order: {
            updatedAt: 'DESC',
            createdAt: 'DESC',
         },
      });
   }

   public async findAll(categoryId: string): Promise<Note[]> {
      return this.repository.find({
         where: { categoryId },
      });
   }

   public async findOne(id: string): Promise<Note> {
      return this.repository.findOne({ where: { id } });
   }

   public async create(note: CreateNoteDTO): Promise<Note> {
      const newNote = this.repository.create(note);
      return this.repository.save(newNote);
   }

   public async update(id: string, note: UpdateNoteDTO): Promise<Note> {
      return this.repository.save({ ...note, id });
   }

   public async delete(id: string): Promise<Note> {
      const note = await this.repository.findOne({ where: { id } });

      if (note) {
         this.repository.delete(id);
         return note;
      }
   }
}
