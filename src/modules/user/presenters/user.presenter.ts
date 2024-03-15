import { FilePresenter } from '@/modules/file/presenters/file.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
   @ApiProperty({ required: false })
   public id: string;

   @ApiProperty({ required: false })
   public username: string;

   @ApiProperty({ required: false })
   public email?: string;

   @ApiProperty({ required: false })
   public accessToken?: string;

   @ApiProperty({ required: false })
   public file?: FilePresenter;

   @ApiProperty({ required: false })
   public createdAt?: Date;

   @ApiProperty({ required: false })
   public updatedAt?: Date;

   constructor(user: UserPresenter) {
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.accessToken = user.accessToken;
      this.file = new FilePresenter(user.file);
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
   }
}
