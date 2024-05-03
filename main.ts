import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
   import * as fs from 'fs';
   import * as https from 'https';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/dns.harutech.com.br/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/dns.harutech.com.br/fullchain.pem',
    ),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('APIs que alimentam o App da DNS')
    .setDescription(
      'Um conjunto de apis que alimentam um aplicativo específico da DNS. A Autenticação é feita usando o Auth0 e os dados principais estão em um banco PostgreSQL.',
    )
    .setVersion('0.7')
    .addTag('auth')
    .addTag('users')
    .addTag('testes')
    .addTag('quotes-test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
