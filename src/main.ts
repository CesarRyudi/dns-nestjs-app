import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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

  // Defina o timeout para 5 minutos (300000 milissegundos)
  app.use((req, res, next) => {
    res.setTimeout(300000); // 5 minutos
    next();
  });

  const configService = new ConfigService;
  const port = configService.get('PORT')

  await app.listen(port);
}
bootstrap();
