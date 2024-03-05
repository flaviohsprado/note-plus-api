import { ICategoryRepository } from '@/common/interfaces/repositories/category.repository';
import { Category } from '@/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
   CreateCategoryDTO,
   UpdateCategoryDTO,
} from './presenters/category.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
   constructor(
      @InjectRepository(Category)
      private readonly repository: Repository<Category>,
   ) { }

   public async findAll(userId: string): Promise<Category[]> {
      return this.repository.manager
         .createQueryBuilder(Category, 'category')
         .leftJoinAndSelect('category.children', 'children')
         .leftJoinAndSelect('category.notes', 'notes')
         .where('category.userId = :userId', { userId })
         .andWhere('category.parentId IS NULL')
         .getMany();
   }

   public async findOne(id: string): Promise<Category> {
      return this.repository.manager
         .createQueryBuilder(Category, 'category')
         .leftJoinAndSelect('category.children', 'children')
         .leftJoinAndSelect('category.notes', 'notes')
         .where('category.id = :id', { id })
         .getOne();
   }

   public async create(category: CreateCategoryDTO): Promise<Category> {
      if (category.parentId) {
         const parent = await this.repository.findOne({
            where: { id: category.parentId },
         });
         category.parent = parent;
      }

      const newCategory = this.repository.create(category);
      return this.repository.save(newCategory);
   }

   public async update(
      id: string,
      category: UpdateCategoryDTO,
   ): Promise<Category> {
      return this.repository.save({ ...category, id });
   }

   public async delete(id: string): Promise<Category> {
      const category = await this.repository.findOne({ where: { id } });

      if (category) {
         this.repository.delete(id);
         return category;
      }
   }
}
