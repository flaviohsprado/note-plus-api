import { IsRequiredStringColumn } from '@/common/decorators/columns/isRequiredStringColumn.decorator';
import {
   Entity,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
   Tree,
   TreeChildren,
   TreeParent,
} from 'typeorm';
import { Note } from './note.entity';
import { User } from './user.entity';

@Tree('closure-table')
@Entity()
export class Category {
   @PrimaryGeneratedColumn('uuid')
   public id: string;

   @IsRequiredStringColumn()
   public userId: string;

   @IsRequiredStringColumn()
   public name: string;

   @TreeParent({ onDelete: 'CASCADE' })
   public parent: Category;

   @TreeChildren({ cascade: true })
   public children: Category[];

   @ManyToOne(() => User, (user) => user.categories)
   public user: User;

   @OneToMany(() => Note, (note) => note.category)
   public notes: Note[];
}
