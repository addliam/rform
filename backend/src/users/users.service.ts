import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
// import { User } from './interfaces/users.interface';
@Injectable()
export class UsersService {
  //   private readonly users: User[] = [];
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  create() {
    // this.users.push(user);
    return 'Esto crea un nuevo usuario';
  }
  findAll() {
    // return 'Esto retorna una lista de usuarios';
    return this.usersRepository.find();
  }
  findOne(id: string) {
    return `Esto retornaria el usuario con id ${id}`;
  }
  deleteOne(id: string) {
    return `Esto ELIMINARIA el usuario con id ${id}`;
  }
}
