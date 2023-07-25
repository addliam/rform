import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  create({
    form_id,
    question_text,
    question_type,
    puntuation,
    options,
    constraints,
  }: CreateQuestionDto) {
    const newQuestion = this.questionRepository.create({
      form_id,
      question_text,
      question_type,
      puntuation,
      options,
      constraints,
    });
    return this.questionRepository.save(newQuestion);
  }

  findAll() {
    return this.questionRepository.find();
  }

  async getQuestionsByFormId(formId: number): Promise<Question[]> {
    return this.questionRepository.find({ where: { form_id: formId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
