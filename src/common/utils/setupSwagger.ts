import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SetupSwagger {
   static for(app: INestApplication) {
      const config = new DocumentBuilder()
         .setTitle('Party Everyday API')
         .setDescription('The Party Everyday API description')
         .setVersion('1.0')
         .addTag('Authentication')
         .addTag('Users')
         .addTag('Addresses')
         .addTag('Parties')
         .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
   }
}
