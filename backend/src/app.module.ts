import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// typeormmodule for ddbb configuration
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { ResponseModule } from './response/response.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// googlestrategy for auth
import { GoogleStrategy } from './google.strategy';
import { JwtService } from '@nestjs/jwt';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    // ConfigModule relies on dotenv
    ConfigModule.forRoot({ isGlobal: true }),
    // Prefered to use dotenv since on other modules it wont load env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'rform',
      entities: [__dirname + '/**/**/*.entity.{js,ts}'],
      // synchronize: true,
    }),
    UsersModule,
    FormModule,
    QuestionModule,
    ResponseModule,
    AuthModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, JwtService],
})
export class AppModule {
  // DataSource and EntityManager objects will be available to inject across the entire project (without needing to import any modules)
  constructor(private dataSource: DataSource) {}
}
