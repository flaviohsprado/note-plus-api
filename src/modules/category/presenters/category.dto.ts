import { Category } from '@/entities/category.entity';
import { Note } from '@/entities/note.entity';
import { IsOptionalString } from '@decorators/validators/isOptionalString.decorator';
import { IsRequiredString } from '@decorators/validators/isRequiredString.decorator';
import { uuid } from 'uuidv4';

export class CategoryDTO {
   public id: string;

   public userId: string;

   public parentId: string;

   public name: string;

   public children: Category[];

   public notes: Note[];

   constructor(props: CategoryDTO) {
      Object.assign(this, props);
   }
}

export class CreateCategoryDTO {
   public id?: string;

   public userId: string;

   @IsOptionalString()
   public parentId?: string;

   @IsRequiredString()
   public name: string;

   public parent: Category;

   constructor(props: CreateCategoryDTO) {
      Object.assign(this, props);
      this.id = uuid();
   }
}

export class UpdateCategoryDTO {
   @IsOptionalString()
   public name?: string;
}
