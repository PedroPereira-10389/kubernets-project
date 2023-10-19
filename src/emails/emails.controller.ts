import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @EventPattern('createEmail')
  create(@Payload() createEmailDto: CreateEmailDto, @Ctx() context:RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    this.emailsService.create(createEmailDto);
    //channel.ack(orginalMessage);
  }

  @MessagePattern('findAllEmails')
  findAll() {
    return this.emailsService.findAll();
  }

  @MessagePattern('findOneEmail')
  findOne(@Payload() id: number) {
    return this.emailsService.findOne(id);
  }

  @MessagePattern('updateEmail')
  update(@Payload() updateEmailDto: UpdateEmailDto) {
    return this.emailsService.update(updateEmailDto.id, updateEmailDto);
  }

  @MessagePattern('removeEmail')
  remove(@Payload() id: number) {
    return this.emailsService.remove(id);
  }
}
