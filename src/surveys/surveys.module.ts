import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { ConnectionModule } from 'src/modules/connection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Business } from './entities/business.entity';
import { QuestionType } from './entities/questiontype.entity';

@Module({
  imports: [
    ConnectionModule,
    TypeOrmModule.forFeature([Survey, Business, QuestionType])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule { }
