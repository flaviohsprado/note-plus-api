import { Category } from '@entities/category.entity';
import { ILogger } from '@interfaces/abstracts/logger.interface';
import { ICategoryRepository } from '@interfaces/repositories/category.repository';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export class DeleteCategoryUseCase {
   constructor(
      private readonly logger: ILogger,
      private readonly repository: ICategoryRepository,
   ) {}

   public async execute(id: string): Promise<Category> {
      const categoryDeleted = await this.repository.delete(id);

      if (categoryDeleted) {
         this.logger.log(
            'DeleteCategoryUseCases execute()',
            `Category ${id} have been deleted`,
         );

         return categoryDeleted;
      } else {
         throw new NotFoundException({
            message: 'Category not found!',
            statusCode: HttpStatus.NOT_FOUND,
         });
      }
   }
}
