import { Category } from '@entities/category.entity';
import { ICacheManager } from '@interfaces/abstracts/cache.service';
import { ICategoryRepository } from '@interfaces/repositories/category.repository';

export class FindAllCategoryUseCase {
   constructor(
      private readonly repository: ICategoryRepository,
      private readonly cacheManager: ICacheManager,
   ) {}

   public async execute(userId: string): Promise<Category[]> {
      const cachedCategorys =
         await this.cacheManager.getCachedObject<Category[]>('categories');

      if (cachedCategorys) return cachedCategorys;

      const categorys = await this.repository.findAll(userId);

      await this.cacheManager.setObjectInCache('categories', categorys);

      return categorys;
   }
}
