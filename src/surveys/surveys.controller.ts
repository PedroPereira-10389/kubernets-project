import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller()
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) { }

  @MessagePattern({ cmd: 'createSurvey' })
  create(@Payload() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto['body']);
  }

  @MessagePattern('findAllSurveys')
  findAll() {
    return this.surveysService.findAll();
  }

  @MessagePattern({ cmd: 'findAllBusinesses' })
  findAllBusinesses() {
    return this.surveysService.findAllBusinesses();
  }

  @MessagePattern('findOneSurvey')
  findOne(@Payload() id: number) {
    return this.surveysService.findOne(id);
  }

  @MessagePattern({ cmd: 'findOneSurveyByUser' })
  findOneByUser(@Payload() payload: any) {
    return this.surveysService.findOneByUser(payload['id']);
  }

  @MessagePattern('updateSurvey')
  update(@Payload() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(updateSurveyDto.id, updateSurveyDto);
  }

  @MessagePattern('removeSurvey')
  remove(@Payload() id: number) {
    return this.surveysService.remove(id);
  }
}
