import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
//import {SwaggerModule, DocumentBuilder} from'@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError:true,
    //logger: console,
  },);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages:false,
      forbidNonWhitelisted:true,
      transform:true
    }),
  );

  /*const config = new DocumentBuilder()

   .setTitle('ONLINE HEALTH API')
   .setDescription('Online health System Api')
   .setVersion('1.0')
   .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api,app,document');*/

   app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));

  await app.listen(8080);
}

bootstrap();
