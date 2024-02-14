import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { NoteController } from './note/note.controller';
import { NoteModule } from './note/note.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      UserModule.register(),
      AuthModule.register(),
      CategoryModule.register(),
      NoteModule.register(),
   ],
   controllers: [
      UserController,
      AuthController,
      CategoryController,
      NoteController,
   ],
   exports: [
      UserModule.register(),
      AuthModule.register(),
      CategoryModule.register(),
      NoteModule.register(),
   ],
})
export class ControllersModule {}
