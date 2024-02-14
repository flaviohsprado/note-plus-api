import { ApiProperty } from '@nestjs/swagger';

export class NotePresenter {
   @ApiProperty({ required: false })
   public id: string;

   @ApiProperty({ required: false })
   public categoryId: string;

   @ApiProperty({ required: false })
   public title: string;

   @ApiProperty({ required: false })
   public content: string;

   constructor(note: NotePresenter) {
      this.id = note.id;
      this.categoryId = note.categoryId;
      this.title = note.title;
      this.content = note.content;
   }
}
