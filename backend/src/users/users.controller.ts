import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(
      createUserDTO.name,
      createUserDTO.lastname,
      createUserDTO.email,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }
}
