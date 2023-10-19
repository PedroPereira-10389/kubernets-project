import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business, QuestionType, Survey } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    @InjectRepository(QuestionType) private readonly questionTypeRepository: Repository<QuestionType>
  ) { }
  async create(createSurveyDto: CreateSurveyDto) {
    const createSurvey = await this.surveyRepository.create(createSurveyDto);
    for (const qType in createSurvey.question) {
      const stringType = createSurvey.question[qType].type.name as unknown as string;
      const newQuestionType = new QuestionType();
      newQuestionType.name = stringType;
      const qTypeFound = await this.questionTypeRepository.findOne({ where: { name: newQuestionType.name } })
      createSurvey.question[qType].type.id = qTypeFound.id;
    }

    const newSurvey = await this.surveyRepository.save(createSurvey)
    if (newSurvey.id) {
      return { status: 200, message: "Survey created successfully" }
    }

  }

  findAll() {
    return `This action returns all surveys`;
  }

  findAllBusinesses() {
    return this.businessRepository.find();
  }

  findOneByUser(payload: any) {
    console.log(payload)
    return this.surveyRepository.createQueryBuilder('survey')
      .leftJoin('survey.question', 'question')
      .loadRelationCountAndMap('survey.questionCount', 'survey.question', 'count')
      .leftJoin('survey.user', 'user')
      .where('user.uuid = :id', { id: payload.id })
      .select(['survey.id', 'survey.title', 'survey.description', 'survey.created_at', 'survey.updated_at'])
      .groupBy('survey.id, survey.title, survey.description, survey.created_at, survey.updated_at')
      .getMany();
  }

  findOne(id: number) {

  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
