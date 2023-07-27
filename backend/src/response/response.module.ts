import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { Form } from 'src/form/entities/form.entity';
import { Question } from '../question/entities/question.entity';
import { Result } from 'src/result/entities/result.entity';

import { FormService } from 'src/form/form.service';
import { QuestionService } from 'src/question/question.service';
import { ResultService } from 'src/result/result.service';

@Module({
  // entity for response and form
  imports: [
    TypeOrmModule.forFeature([Response]),
    TypeOrmModule.forFeature([Form]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Result]),
  ],
  controllers: [ResponseController],
  providers: [ResponseService, FormService, QuestionService, ResultService],
})
export class ResponseModule {}
