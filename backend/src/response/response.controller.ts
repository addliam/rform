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

  @Post()
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(createResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return { response: 'Yes you are allowed', user };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    // jwt parsing returns userId and email
    const userId = req.user.userId;
    return this.responseService.findOne(+id, userId);
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
