import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { QuestionService } from 'src/question/question.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('form')
export class FormController {
  constructor(
    private readonly formService: FormService,
    private readonly questionService: QuestionService,
  ) {}

  /**
   * POST /form/
   * Create a new form.
   *
   * @tags Form
   *
   * @param {CreateUserDto} user - Form data.
   * @requestBody {CreateUserDto} application/json
   * @returns {Form} 201 - Successfully created form
   * @throws {401} - Unauthorized
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFormDto: CreateFormDto, @Request() req) {
    const userId = req.user.userId;
    return this.formService.create(createFormDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllOwnedByMe(@Request() req) {
    const userId = req.user.userId;
    return this.formService.findAllOwnedByMe(userId);
  }

  /**
   * GET /u/<slug>
   * Get form by slug.
   *
   * @tags Form
   *
   * @param {string} slug - Slug unique identifier.
   */
  @Get('u/:slug')
  async getFormBySlug(@Param('slug') slug: string) {
    const form = await this.formService.findBySlug(slug);
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    return form;
  }

  @Get(':id/questions')
  // ParseIntPipe returns 500, might no be enough verbose
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
