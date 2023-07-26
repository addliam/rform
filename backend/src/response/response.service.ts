import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { FormService } from 'src/form/form.service';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    private formService: FormService,
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

  async findOne(formId: number, userId: string) {
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
