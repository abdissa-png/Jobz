import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from 'src/Model/job.model';
import { JobsAppliedToSchema } from 'src/Model/jobsAppliedTo.model';
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
        name: 'JobSeeker',
        schema: JobSeekerSchema,
      },
    ]),
  ],
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class EmployerModule {}
