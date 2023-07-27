import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { FormService } from 'src/form/form.service';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';
import { ResultService } from 'src/result/result.service';
import { CreateResultDto } from 'src/result/dto/create-result.dto';

interface QuestionResponse {
  qid: number;
  choice: number[];
}

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    private questionService: QuestionService,
    private formService: FormService,
    private resultService: ResultService,
  ) {}

  async create({ form_id, response_data }: CreateResponseDto, user_id: string) {
    function areAllElementsPresent(arr1: any[], arr2: any[]): boolean {
      return arr1.every((item) => arr2.includes(item));
    }
    try {
      // TODO: response_data qid should match questionId
      const newResponse = this.responseRepository.create({
        form_id,
        user_id: +user_id,
        response_data,
      });
      // process response comparing to correct results
      let score = 0;
      let n_incorrects = 0;
      let n_corrects = 0;
      const questions = await this.questionService.getQuestionsByFormId(
        form_id,
      );
      // turn array questions to map for easy query
      const questionsMap = new Map();
      questions.forEach((question) => {
        questionsMap.set(question.question_id, question);
      });
      // lets asume choice always is array 1 element
      response_data.forEach((response_entry: QuestionResponse) => {
        let foundQuestion: Question = questionsMap.get(response_entry.qid);
        let puntuation = foundQuestion.puntuation;
        let arrayChoice = response_entry.choice;
        let arrayAnswers = foundQuestion.options.correct_answers;
        let isCorrect = areAllElementsPresent(arrayChoice, arrayAnswers);
        if (!isCorrect) {
          n_incorrects += 1;
        } else {
          n_corrects += 1;
          score += puntuation;
        }
      });
      const createdResponse = await this.responseRepository.save(newResponse);
      let resultObj: CreateResultDto = {
        response_id: createdResponse.response_id,
        score,
        n_corrects,
        n_incorrects,
      };
      const createdResult = await this.resultService.create(resultObj);
      return { response: { ...createdResponse }, result: { ...createdResult } };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  findAll() {
    return this.responseRepository.find();
  }

  async findAllByFormId(formId: number, userId: string) {
    // Returns all response from specific formId, the userId must be owner of the formId
    const checkIsOwner = await this.formService.userOwnsForm(userId, formId);

    if (!checkIsOwner) {
      throw new ForbiddenException(
        'You do not have permission to access this response.',
      );
    }
    // Get all responses from the specific form id
    const responses = await this.responseRepository.findBy({ form_id: formId });
    return responses;
  }

  update(id: number, updateResponseDto: UpdateResponseDto) {
    return `This action updates a #${id} response`;
  }

  remove(id: number) {
    return `This action removes a #${id} response`;
  }
}
