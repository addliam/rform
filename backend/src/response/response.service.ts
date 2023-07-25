import { Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  create({ form_id, user_id, response_data }: CreateResponseDto) {
    const newResponse = this.responseRepository.create({
      form_id,
      user_id,
      response_data,
    });
    return this.responseRepository.save(newResponse);
  }

  findAll() {
    return this.responseRepository.find();
  }

  findOne(id: number) {
    return this.responseRepository.findBy({ response_id: id });
  }

  update(id: number, updateResponseDto: UpdateResponseDto) {
    return `This action updates a #${id} response`;
  }

  remove(id: number) {
    return `This action removes a #${id} response`;
  }
}
