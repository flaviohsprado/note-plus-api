import { Category } from '@entities/category.entity';
import { ILogger } from '@interfaces/abstracts/logger.interface';
import { ICategoryRepository } from '@interfaces/repositories/category.repository';
import { UpdateCategoryDTO } from '../presenters/category.dto';

export class UpdateCategoryUseCase {
   constructor(
      private readonly logger: ILogger,
      private readonly repository: ICategoryRepository,
   ) {}

   public async execute(
      id: string,
      category: UpdateCategoryDTO,
   ): Promise<Category> {
      const updatedCategory = await this.repository.update(id, category);

      this.logger.log(
         'UpdateCategoryUseCases execute()',
         `Category ${id} have been updated`,
      );

      return updatedCategory;
   }
}
