import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionsTypeService } from '../services/subscriptionstype.service';

@Controller()
export class SubscriptionsTypeController {
  constructor(private readonly subscriptionsTypeService: SubscriptionsTypeService) { }

  @MessagePattern({ cmd: 'findAllSubscriptionsType' })
  findAllTypes() {
    return this.subscriptionsTypeService.findAll();
  }
  
}