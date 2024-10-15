import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // グローバルに ValidationPipe を適用 dtoを使用するため
  app.enableCors({
    origin: 'http://localhost:8080', // フロントエンドのURL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // 許可するHTTPメソッド
    allowedHeaders: ['Content-Type', 'Authorization'], // 許可するヘッダー
  });
  await app.listen(3000);
}
bootstrap();
