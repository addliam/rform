import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}

  create({ title, description }: CreateFormDto, user_id: string) {
    const uniqueSlug = uuidv4();
    const newForm = this.formRepository.create({
      user_id: +user_id,
      title,
      description,
      slug: uniqueSlug,
    });
    return this.formRepository.save(newForm);
  }

  findAll() {
    return this.formRepository.find();
  }

  async findOne(id: number) {
    // return all belong to author id
    const num = Number(id);
    if (num) {
      return await this.formRepository.findBy({ user_id: num });
    } else {
      return [];
    }
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  async userOwnsForm(userId: string, formId: number): Promise<boolean> {
    // check if users owns a form
    const formExist = await this.formRepository.findOne({
      where: { form_id: formId, user_id: +userId },
    });
    return formExist ? true : false;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
