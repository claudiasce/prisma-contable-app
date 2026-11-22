import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(process.env.PORT || port);
  console.log(`✅  Service API Gateway Running port is: ${port}`);
}

bootstrap();
