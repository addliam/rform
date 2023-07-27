import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  /**
   * POST /response/
   * Create a new response entry.
   *
   * @tags Response
   *
   * @requestBody {CreateResponseDto} application/json
   * @returns {Form} 201 - Successfully created form
   * @throws {401} - Unauthorized
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createResponseDto: CreateResponseDto, @Request() req) {
    const userId = req.user.userId;
    return await this.responseService.create(createResponseDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return { response: 'Yes you are allowed', user };
  }

  /**
   * GET /response/form/<form-id>
   * Obtain all responses by form id. Requires to be owner of the form.
   *
   * @tags Response
   *
   * @returns {Response[]} 200 - List of responses
   * @throws {401} - Unauthorized
   */
  @UseGuards(JwtAuthGuard)
  @Get('/form/:id')
  findAllByFormId(@Param('id') id: string, @Request() req) {
    // jwt parsing returns userId and email
    const userId = req.user.userId;
    return this.responseService.findAllByFormId(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    return this.responseService.update(+id, updateResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responseService.remove(+id);
  }
}
