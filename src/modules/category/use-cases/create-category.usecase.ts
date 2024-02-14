import { Category } from '@/entities/category.entity';
import { ILogger } from '@interfaces/abstracts/logger.interface';
import { ICategoryRepository } from '@interfaces/repositories/category.repository';
import { CreateCategoryDTO } from '../presenters/category.dto';

export class CreateCategoryUseCase {
   constructor(
      private readonly logger: ILogger,
      private readonly repository: ICategoryRepository,
   ) {}

   public async execute(category: CreateCategoryDTO): Promise<Category> {
      const createdCategory = await this.repository.create(category);

      this.logger.log(
         'CreateCategoryUseCases execute()',
         'New category have been inserted',
      );

      return createdCategory;
   }
}
