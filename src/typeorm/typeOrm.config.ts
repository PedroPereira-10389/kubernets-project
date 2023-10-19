import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { config } from 'dotenv';
import entities from '../typeorm/index';
import { Subscriptionstype1695465319092 } from 'src/db_data/seeders/subscriptionstype/1695465319092-subscriptionstype';
import { Roles1695463432026 } from 'src/db_data/seeders/roles/1695463432026-roles';
import { Businesses1695466851469 } from 'src/db_data/seeders/businesses/1695466851469-businesses';
import { Users1695555590663 } from 'src/db_data/seeders/users/1695555590663-users';
import { User } from "../users/entities/user.entity";
import { Survey } from "../surveys/entities/survey.entity";
import { Question } from "src/surveys/entities/question.entity";
import { Option } from "src/surveys/entities/option.entity";
import { Client } from "src/clients/entities/client.entity";
import { Response } from "src/surveys/entities/response.entity";
import { QuestionType } from "src/surveys/entities/questiontype.entity";
import { Answer } from "src/surveys/entities/answer.entity";
import { Business } from "src/surveys/entities/business.entity";
import { Role } from "src/users/entities/roles.entity";
import { Subscription } from "src/subscriptions/entities/subscription.entity";
import { SubscriptionType } from "src/subscriptions/entities/subscriptiontype.entity";
import { Product } from "../products/entities/product.entity";
import { Store } from 'src/products/entities/store.entity';
import { Stores1696257629377 } from 'src/db_data/seeders/stores/1696257629377-stores';
import { Products1696257334877 } from 'src/db_data/seeders/products/1696257334877-products';
import { Questiontype1697537957843 } from 'src/db_data/seeders/questiontype/1697537957843-questiontype';

config();
const configService = new ConfigService();
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      migrationsRun: false,
      entities: [User, Survey, Question, Option, Response, Client, QuestionType, Answer, Business, Role, Subscription, SubscriptionType, Product, Store],
      migrations: [Questiontype1697537957843],
      migrationsTableName: "migrations_table",
      synchronize: true,
      logging: false
    };
  },
}; 