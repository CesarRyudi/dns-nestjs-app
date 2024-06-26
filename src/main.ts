import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Substitua com o(s) domínio(s) permitido(s)
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: ['Content-Disposition', 'X-Total-Count'],
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('APIs que alimentam o App da DNS')
    .setDescription(
      'Um conjunto de apis que alimentam um aplicativo específico da DNS. A Autenticação é feita usando o Auth0 e os dados principais estão em um banco PostgreSQL.',
    )
    .setVersion('0.7')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = new ConfigService();
  const port = configService.get('PORT');

  await app.listen(port);
  console.log(`Server ruinning on port: ${port}`);
}
bootstrap();
