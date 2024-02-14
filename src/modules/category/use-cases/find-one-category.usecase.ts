import { Category } from '@entities/category.entity';
import { ICacheManager } from '@interfaces/abstracts/cache.service';
import { ICategoryRepository } from '@interfaces/repositories/category.repository';
import { NotFoundException } from '@nestjs/common';

export class FindOneCategoryUseCase {
   constructor(
      private readonly repository: ICategoryRepository,
      private readonly cacheManager: ICacheManager,
   ) {}

   public async execute(id: string): Promise<Category> {
      const cachedCategory =
         await this.cacheManager.getCachedObject<Category>('category');

      if (cachedCategory && cachedCategory.id === id) return cachedCategory;

      const category: Category = await this.repository.findOne(id);

      if (!category)
         throw new NotFoundException({ message: 'Category not found' });

      await this.cacheManager.setObjectInCache('category', category);

      return category;
   }
}
