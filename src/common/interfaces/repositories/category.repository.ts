import { Category } from '@entities/category.entity';
import {
   CreateCategoryDTO,
   UpdateCategoryDTO,
} from '@modules/category/presenters/category.dto';

export interface ICategoryRepository {
   findAll?(userId: string): Promise<Category[]>;
   findOne?(id: string): Promise<Category>;
   create?(category: CreateCategoryDTO): Promise<Category>;
   update?(id: string, category: UpdateCategoryDTO): Promise<Category>;
   delete?(id: string): Promise<Category>;
}
