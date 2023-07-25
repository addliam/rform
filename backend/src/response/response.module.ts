import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
