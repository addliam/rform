import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { Form } from './entities/form.entity';
// Question since we gonna use its service
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
    TypeOrmModule.forFeature([Question]),
  ],
  controllers: [FormController],
  providers: [FormService, QuestionService],
})
export class FormModule {}
