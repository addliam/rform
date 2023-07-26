import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // i should use usersService
    private jwtService: JwtService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async generateJwt(payload) {
    return await this.jwtService.signAsync(payload);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      return null;
    }
    return user;
  }
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const googleUser = req.user;
    const userExist = await this.findUserByEmail(googleUser.email);
    if (!userExist) {
      const newUser = this.userRepository.create({
        name: googleUser.firstName,
        lastname: googleUser.lastName,
        email: googleUser.email,
      });
      await this.userRepository.save(newUser);
      return await this.generateJwt({
        sub: newUser.user_id,
        email: newUser.email,
      });
    } else {
      console.log(`User exist.`);
      console.log(userExist);
      return await this.generateJwt({
        sub: userExist.user_id,
        email: userExist.email,
      });
    }
  }
}
