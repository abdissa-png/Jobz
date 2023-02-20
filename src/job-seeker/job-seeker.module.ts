/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JobSeekerService } from './job-seeker.service';
import { JobSeekerController } from './job-seeker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeekerSchema } from 'src/Model/jobSeeker.model';
import { JobsAppliedToSchema } from 'src/Model/jobsAppliedTo.model';
import { JobSchema } from 'src/Model/job.model';
import { ExperienceSchema } from 'src/Model/experience.model';
import { EducationSchema } from 'src/Model/education.model';
import { complaint } from 'src/Model/complaint.model';
import { LoginSchema } from 'src/Model/login.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'JobSeeker',
        schema: JobSeekerSchema,
      },
      {
        name: 'JobsAppliedTo',
        schema: JobsAppliedToSchema
      },
      {
        name: 'Job',
        schema: JobSchema
      },
      {
        name: 'experience',
        schema: ExperienceSchema      
      },
      {
        name: 'education',
        schema: EducationSchema
      },
      {
        name: 'complaint',
        schema: complaint
      },{
        name:"Login",
        schema:LoginSchema
      }
    ]),
  ],
  providers: [JobSeekerService],
  controllers: [JobSeekerController],
})
export class JobSeekerModule {}
