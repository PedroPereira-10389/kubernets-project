import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { join } from 'path';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

@Module({
  imports:[ConfigModule, MailerModule.forRoot({
    transport: {
      host: configService.get('SMTP_HOST'),
      port: +configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASS'),
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
