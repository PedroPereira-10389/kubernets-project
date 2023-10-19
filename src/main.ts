import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { EmailsModule } from './emails/emails.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SurveysModule } from './surveys/surveys.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3000,
    },
  });

  const app_emails = await NestFactory.createMicroservice(EmailsModule, {
    transport: Transport.RMQ,
    provide: 'EMAIL_SUBSCRIBE',
    noAck: false,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'emails_queue',
      queueOptions: { 
        durable: false
      },
    },
  });

  const app_products = await NestFactory.createMicroservice(ProductsModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003,
    },
  });

  const app_surveys = await NestFactory.createMicroservice(SurveysModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3004,
    },
  });

  await app_surveys.listen();
  await app_products.listen();
  await app_emails.listen();
  await app.listen();
}
bootstrap();
