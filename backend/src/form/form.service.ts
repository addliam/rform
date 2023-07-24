import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}

  // create(name: string, lastname: string, email: string): Promise<Users> {
  //   const newUser = this.usersRepository.create({ name, lastname, email });
  //   return this.usersRepository.save(newUser);
  // }
  create({ user_id, title, description }: CreateFormDto) {
    // TODO: user_id obtenido de JWT token
    const newForm = this.formRepository.create({
      user_id: 1,
      title,
      description,
    });
    return this.formRepository.save(newForm);
  }

  findAll() {
    return this.formRepository.find();
  }

  findOne(id: number) {
    // return all belong to author id
    const num = Number(id);
    if (num) {
      return this.formRepository.findBy({ user_id: num });
    } else {
      return [];
    }
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
