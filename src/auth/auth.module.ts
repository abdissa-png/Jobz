/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JobSeekerSchema } from 'src/Model/jobSeeker.model';
import { EmployerSchema } from 'src/Model/employer.model';
import { LoginSchema } from 'src/Model/login.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[JwtModule.register({}),MongooseModule.forFeature([{name:"Employer",schema:EmployerSchema},
  {name:"JobSeeker",schema:JobSeekerSchema},{name:"Login",schema:LoginSchema}])],
  controllers: [AuthController],
  providers: [AuthService,AtStrategy,RtStrategy]
})
export class AuthModule {}
