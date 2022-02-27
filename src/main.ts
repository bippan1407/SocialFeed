import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log({ env: process.env.NODE_ENV });
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Social Feed 🚀')
    .setDescription(
      `<div>
  <h3>Developer - Bippan Kumar</h3>
  </div>`,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Running on port ${process.env.PORT} ENVIRONEMNT is ${process.env.NODE_ENV}`,
    );
  });
}
bootstrap();
