import { FilePresenter } from '@/modules/file/presenters/file.presenter';
import { IsRequiredString } from '@decorators/validators/isRequiredString.decorator';

export class AuthPresenter {
   @IsRequiredString()
   public username: string;

   @IsRequiredString()
   public accessToken: string;

   public file: FilePresenter;

   constructor(auth: AuthPresenter) {
      this.username = auth.username;
      this.accessToken = auth.accessToken;
      this.file = new FilePresenter(auth.file);
   }
}
