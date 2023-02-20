/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from 'src/Model/job.model';
import { JobsAppliedToSchema } from 'src/Model/jobsAppliedTo.model';
import { LoginSchema } from 'src/Model/login.model';
import { EmployerSchema } from 'src/Model/employer.model';
import { JobSeekerSchema } from 'src/Model/jobSeeker.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Job',
        schema: JobSchema,
      },
      {
        name: 'JobsAppliedTo',
        schema: JobsAppliedToSchema,
      },
      {
        name:"Login",
        schema:LoginSchema
      },
      {
        name:"Employer",
        schema:EmployerSchema
      },
      {
        name:"JobSeeker",
        schema:JobSeekerSchema
      }
    ]),
  ],
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class EmployerModule {}
