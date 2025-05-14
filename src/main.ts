import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration of the global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS configuration
  app.enableCors();

  // Setup the global prefix
  app.setGlobalPrefix('api');


  // Swagger configuration
  const config = new DocumentBuilder()
      .setTitle('Medik Appointment API')
      .setDescription('API to medical appointment')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Get port from configuration
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  await app.listen(port);

}
bootstrap();
