import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
   imports: [
      Jwt.register({
         secret: String(process.env.JWT_SECRET),
      }),
   ],
   providers: [JwtTokenService],
   exports: [JwtTokenService],
})
export class JwtModule { }
