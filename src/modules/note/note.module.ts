import { CacheConfigModule } from '@/services/redis/cache.module';
import { CacheService } from '@/services/redis/cache.service';
import { LoggerModule } from '@config/logger/logger.module';
import { LoggerService } from '@config/logger/logger.service';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '@utils/usecase-proxy';
import { RepositoriesModule } from '../repositories.proxy.module';
import { NoteRepository } from './note.repository';
import { CreateNoteUseCase } from './use-cases/create-note.usecase';
import { DeleteNoteUseCase } from './use-cases/delete-note.usecase';
import { FindAllNotesFromUserUseCase } from './use-cases/find-all-notes-from-user.usecase';
import { FindAllNoteUseCase } from './use-cases/find-all-notes.usecase';
import { FindOneNoteUseCase } from './use-cases/find-one-note.usecase';
import { UpdateNoteUseCase } from './use-cases/update-note.usecase';

@Module({
   imports: [LoggerModule, RepositoriesModule, CacheConfigModule],
})
export class NoteModule {
   static GET_NOTE_USECASES_PROXY = 'getNoteUsecasesProxy';
   static GET_NOTES_USECASES_PROXY = 'getNotesUsecasesProxy';
   static GET_NOTES_FROM_USER_USECASES_PROXY = 'getNotesFromUserUsecasesProxy';
   static POST_NOTE_USECASES_PROXY = 'postNoteUsecasesProxy';
   static PUT_NOTE_USECASES_PROXY = 'putNoteUsecasesProxy';
   static DELETE_NOTE_USECASES_PROXY = 'deleteNoteUsecasesProxy';

   static register(): DynamicModule {
      return {
         module: NoteModule,
         providers: [
            {
               inject: [NoteRepository, CacheService],
               provide: NoteModule.GET_NOTES_USECASES_PROXY,
               useFactory: (
                  repository: NoteRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new FindAllNoteUseCase(repository, cacheService),
                  ),
            },
            {
               inject: [NoteRepository, CacheService],
               provide: NoteModule.GET_NOTES_FROM_USER_USECASES_PROXY,
               useFactory: (
                  repository: NoteRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new FindAllNotesFromUserUseCase(repository, cacheService),
                  ),
            },
            {
               inject: [NoteRepository, CacheService],
               provide: NoteModule.GET_NOTE_USECASES_PROXY,
               useFactory: (
                  repository: NoteRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new FindOneNoteUseCase(repository, cacheService),
                  ),
            },
            {
               inject: [LoggerService, NoteRepository],
               provide: NoteModule.POST_NOTE_USECASES_PROXY,
               useFactory: (
                  logger: LoggerService,
                  repository: NoteRepository,
               ) => new UseCaseProxy(new CreateNoteUseCase(logger, repository)),
            },
            {
               inject: [LoggerService, NoteRepository],
               provide: NoteModule.PUT_NOTE_USECASES_PROXY,
               useFactory: (
                  logger: LoggerService,
                  repository: NoteRepository,
               ) => new UseCaseProxy(new UpdateNoteUseCase(logger, repository)),
            },
            {
               inject: [LoggerService, NoteRepository],
               provide: NoteModule.DELETE_NOTE_USECASES_PROXY,
               useFactory: (
                  logger: LoggerService,
                  repository: NoteRepository,
               ) => new UseCaseProxy(new DeleteNoteUseCase(logger, repository)),
            },
         ],
         exports: [
            NoteModule.GET_NOTES_FROM_USER_USECASES_PROXY,
            NoteModule.GET_NOTES_USECASES_PROXY,
            NoteModule.GET_NOTE_USECASES_PROXY,
            NoteModule.POST_NOTE_USECASES_PROXY,
            NoteModule.PUT_NOTE_USECASES_PROXY,
            NoteModule.DELETE_NOTE_USECASES_PROXY,
         ],
      };
   }
}
