import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
// typeormmodule for ddbb configuration
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Form } from './form/entities/form.entity';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'TryHackM3',
      database: 'rform',
      entities: [__dirname + '/**/**/*.entity.{js,ts}'],
      // synchronize: true,
    }),
    UsersModule,
    FormModule,
    QuestionModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // DataSource and EntityManager objects will be available to inject across the entire project (without needing to import any modules)
  constructor(private dataSource: DataSource) {}
}
