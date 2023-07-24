import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  create(name: string, lastname: string, email: string): Promise<Users> {
    const newUser = this.usersRepository.create({ name, lastname, email });
    return this.usersRepository.save(newUser);
  }
  findAll() {
    // return 'Esto retorna una lista de usuarios';
    return this.usersRepository.find();
  }
  findOne(id: string) {
    // return all belong to author
    return `Esto retornaria el usuario con id ${id}`;
  }
  deleteOne(id: string) {
    return `Esto ELIMINARIA el usuario con id ${id}`;
  }
}
