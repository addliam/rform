import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { QuestionService } from 'src/question/question.service';

@Controller('form')
export class FormController {
  constructor(
    private readonly formService: FormService,
    private readonly questionService: QuestionService,
  ) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id/questions')
  // ParseIntPipe returns 500, might no ve enough verbose
  findAllQuestions(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.getQuestionsByFormId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
