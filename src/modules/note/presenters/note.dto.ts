import { IsOptionalString } from '@decorators/validators/isOptionalString.decorator';
import { IsRequiredString } from '@decorators/validators/isRequiredString.decorator';
import { uuid } from 'uuidv4';

export class NoteDTO {
   public id: string;

   public categoryId: string;

   public title: string;

   public content: string;

   constructor(props: NoteDTO) {
      Object.assign(this, props);
   }
}

export class CreateNoteDTO {
   public id?: string;

   @IsRequiredString()
   public categoryId: string;

   @IsOptionalString()
   public title: string;

   @IsRequiredString()
   public content: string;

   constructor(props: CreateNoteDTO) {
      Object.assign(this, props);
      this.id = uuid();
   }
}

export class UpdateNoteDTO {
   @IsOptionalString()
   public title: string;

   @IsOptionalString()
   public name?: string;

   constructor(props: UpdateNoteDTO) {
      Object.assign(this, props);
   }
}
