import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { Form } from 'src/form/entities/form.entity';
import { FormService } from 'src/form/form.service';

@Module({
  // entity for response and form
  imports: [
    TypeOrmModule.forFeature([Response]),
    TypeOrmModule.forFeature([Form]),
  ],
  controllers: [ResponseController],
  providers: [ResponseService, FormService],
})
export class ResponseModule {}
