import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ConnectionModule } from 'src/modules/connection.module';

@Module({
  imports:[ConnectionModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
