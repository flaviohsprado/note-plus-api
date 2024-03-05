import { IsCreateDateColumn } from '@/common/decorators/columns/isCreateDateColumn.decorator';
import { IsRequiredStringColumn } from '@/common/decorators/columns/isRequiredStringColumn.decorator';
import { IsUpdateDateColumn } from '@/common/decorators/columns/isUpdateDateColumn.decorator';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Note {
   @PrimaryGeneratedColumn('uuid')
   public id: string;

   @IsRequiredStringColumn()
   public categoryId: string;

   @IsRequiredStringColumn()
   public title: string;

   @IsRequiredStringColumn()
   public content: string;

   @IsCreateDateColumn()
   public createdAt: Date;

   @IsUpdateDateColumn()
   public updatedAt: Date;

   @ManyToOne(() => Category, (category) => category.notes, {
      onDelete: 'CASCADE',
      nullable: false,
   })
   @JoinColumn({ name: 'categoryId' })
   public category: Category;
}
