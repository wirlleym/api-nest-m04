import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);  (Sem Deploy)

  // Tipar com NestExpressApplication para funcionar o https (Deploy)
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // configurar para https  (Deploy)
  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Hamburgueria Blue')
    .setDescription('API responsavel pela gestão da Hamburgueria da Blue')
    .setVersion('1.0.0')
    .addTag('users')
    .addTag('products')
    .addTag('status')
    .addTag('tables')
    .addTag('categories')
    .addTag('orders')
    .addTag('favorites')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // await app.listen(3333);  (Sem Deploy)
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
