import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Subscription, User } from 'src/typeorm';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TokenService } from './services/users/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { AppModule } from 'src/modules/app.module';
import { ConnectionModule } from 'src/modules/connection.module';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { SubscriptionsService } from 'src/subscriptions/services/subscriptions.service';

@Module({
  imports: [
    ConnectionModule,
    SubscriptionsModule,
    TypeOrmModule.forFeature([User, Role, Subscription]),
    JwtModule.register({
      global: true,
      secret: 'mysecret',
      signOptions: { expiresIn: '120s' }
    }),],
  providers: [UsersService, TokenService, RolesService, SubscriptionsService],
  controllers: [UsersController, RolesController],
})
export class UsersModule { }
