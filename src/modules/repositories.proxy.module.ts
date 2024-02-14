import { Category } from '@/entities/category.entity';
import { Note } from '@/entities/note.entity';
import { TypeOrmConfigModule } from '@/services/typeorm/typeorm.module';
import { File } from '@entities/file.entity';
import { User } from '@entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category/category.repository';
import { FileRepository } from './file/file.repository';
import { NoteRepository } from './note/note.repository';
import { UserRepository } from './user/user.repository';

@Module({
   imports: [
      TypeOrmConfigModule,
      TypeOrmModule.forFeature([User, File, Category, Note]),
   ],
   providers: [
      UserRepository,
      FileRepository,
      CategoryRepository,
      NoteRepository,
   ],
   exports: [
      UserRepository,
      FileRepository,
      CategoryRepository,
      NoteRepository,
   ],
})
export class RepositoriesModule {}
