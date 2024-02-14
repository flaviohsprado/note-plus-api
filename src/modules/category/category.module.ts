import { CacheConfigModule } from '@/services/redis/cache.module';
import { CacheService } from '@/services/redis/cache.service';
import { LoggerModule } from '@config/logger/logger.module';
import { LoggerService } from '@config/logger/logger.service';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '@utils/usecase-proxy';
import { RepositoriesModule } from '../repositories.proxy.module';
import { CategoryRepository } from './category.repository';
import { CreateCategoryUseCase } from './use-cases/create-category.usecase';
import { DeleteCategoryUseCase } from './use-cases/delete-category.usecase';
import { FindAllCategoryUseCase } from './use-cases/find-all-categories.usecase';
import { FindOneCategoryUseCase } from './use-cases/find-one-category.usecase';
import { UpdateCategoryUseCase } from './use-cases/update-category.usecase';

@Module({
   imports: [LoggerModule, RepositoriesModule, CacheConfigModule],
})
export class CategoryModule {
   static GET_CATEGORY_USECASES_PROXY = 'getCategoryUsecasesProxy';
   static GET_CATEGORIES_USECASES_PROXY = 'getCategoriesUsecasesProxy';
   static POST_CATEGORY_USECASES_PROXY = 'postCategoryUsecasesProxy';
   static PUT_CATEGORY_USECASES_PROXY = 'putCategoryUsecasesProxy';
   static DELETE_CATEGORY_USECASES_PROXY = 'deleteCategoryUsecasesProxy';

   static register(): DynamicModule {
      return {
         module: CategoryModule,
         providers: [
            {
               inject: [CategoryRepository, CacheService],
               provide: CategoryModule.GET_CATEGORIES_USECASES_PROXY,
               useFactory: (
                  repository: CategoryRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new FindAllCategoryUseCase(repository, cacheService),
                  ),
            },
            {
               inject: [CategoryRepository, CacheService],
               provide: CategoryModule.GET_CATEGORY_USECASES_PROXY,
               useFactory: (
                  repository: CategoryRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new FindOneCategoryUseCase(repository, cacheService),
                  ),
            },
            {
               inject: [LoggerService, CategoryRepository],
               provide: CategoryModule.POST_CATEGORY_USECASES_PROXY,
               useFactory: (
                  logger: LoggerService,
                  repository: CategoryRepository,
               ) =>
                  new UseCaseProxy(
                     new CreateCategoryUseCase(logger, repository),
                  ),
            },
            {
               inject: [LoggerService, CategoryRepository],
               provide: CategoryModule.PUT_CATEGORY_USECASES_PROXY,
               useFactory: (
                  logger: LoggerService,
                  repository: CategoryRepository,
               ) =>
                  new UseCaseProxy(
                     new UpdateCategoryUseCase(logger, repository),
                  ),
            },
            {
               inject: [LoggerService, CategoryRepository],
               provide: CategoryModule.DELETE_CATEGORY_USECASES_PROXY,
               useFactory: (
                  logger: LoggerService,
                  repository: CategoryRepository,
               ) =>
                  new UseCaseProxy(
                     new DeleteCategoryUseCase(logger, repository),
                  ),
            },
         ],
         exports: [
            CategoryModule.GET_CATEGORIES_USECASES_PROXY,
            CategoryModule.GET_CATEGORY_USECASES_PROXY,
            CategoryModule.POST_CATEGORY_USECASES_PROXY,
            CategoryModule.PUT_CATEGORY_USECASES_PROXY,
            CategoryModule.DELETE_CATEGORY_USECASES_PROXY,
         ],
      };
   }
}
