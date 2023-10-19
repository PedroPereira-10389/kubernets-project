import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) {}

  async create(createEmailDto: CreateEmailDto) {
    const url = `example.com/auth/confirm?token=`;
    await this.mailerService.sendMail({
      to: createEmailDto.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: { 
        name: createEmailDto.name,
        username: createEmailDto.username,
        sender:'noreply@email.com',
        url:url,
      },
    });

    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all emails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
