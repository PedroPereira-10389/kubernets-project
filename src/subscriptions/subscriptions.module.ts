import { Module } from '@nestjs/common';
import { SubscriptionsService } from './services/subscriptions.service';
import { SubscriptionsController } from './controllers/subscriptions.controller';
import { ConnectionModule } from 'src/modules/connection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription, SubscriptionType } from 'src/typeorm';
import { SubscriptionsTypeController } from './controllers/subscriptionstype.controller';
import { SubscriptionsTypeService } from './services/subscriptionstype.service';

@Module({
  imports:[ 
    ConnectionModule,
    TypeOrmModule.forFeature([Subscription, SubscriptionType])],
  controllers: [SubscriptionsController, SubscriptionsTypeController],
  providers: [SubscriptionsService, SubscriptionsTypeService],
})
export class SubscriptionsModule {}
