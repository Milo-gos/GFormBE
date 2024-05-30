import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Survey } from './Entity/survey.entity';
import { Question } from 'src/question/Entity/question.entity';
import QuestionType from 'src/utils/interface/questionType';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async getSurveyById(id: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: id,
      },
    });
    return survey;
  }

  async createSurvey() {
    const newSurvey = new Survey();
    newSurvey.ownerId = '4b9c24dd-4899-41f5-a33d-b37b1c11cb70';
    newSurvey.description = '';
    newSurvey.title = 'Tiêu đề khảo sát';
    newSurvey.status = 'Bản nháp';
    const questions: Question[] = [];
    const newQuestion = new Question();
    newQuestion.question = '';
    newQuestion.image = '';
    newQuestion.description = '';
    newQuestion.isHasDescription = false;
    newQuestion.isRequired = false;
    newQuestion.questionType = QuestionType.ShortAnswer;
    newQuestion.isValidation = false;
    newQuestion.isHasOther = false;
    questions.push(newQuestion);
    newSurvey.questions = questions;
    return await this.surveyRepository.save(newSurvey);
  }
}