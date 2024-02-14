import { Category } from '@/entities/category.entity';
import { Note } from '@/entities/note.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryPresenter {
   @ApiProperty({ required: false })
   public id: string;

   @ApiProperty({ required: false })
   public name: string;

   @ApiProperty({ required: false })
   public children?: Category[];

   @ApiProperty({ required: false })
   public notes?: Note[];

   constructor(category: CategoryPresenter) {
      this.id = category.id;
      this.name = category.name;
      this.children = category.children;
      this.notes = category.notes;
   }
}
