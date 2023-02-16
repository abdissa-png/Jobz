/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployerSchema } from './Model/employer.model';
import { JobSeekerSchema } from './Model/jobSeeker.model';
import { ExperienceSchema } from './Model/experience.model';
import { EducationSchema } from './Model/education.model';
import { JobSchema } from './Model/job.model';
import { LoginSchema } from './Model/login.model';
import { UnivDataOfJobSeekersSchema } from './Model/univDataOfJobSeekers.model';
import { JobsAppliedToSchema } from './Model/jobsAppliedTo.model';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { ConfigModule } from '@nestjs/config';
=======
import { JobSeekerModule } from './job-seeker/job-seeker.module';
import { EmployerModule } from './employer/employer.module';
import { UniversityModule } from './university/university.module';
>>>>>>> 68ffc20e7ee7ec86ac6a5b25ed0762d4b87b01a9

@Module({
  imports: [MongooseModule.forRoot(
    "mongodb+srv://Jobzdev:Qwertyuiop$123&23@cluster0.3fsuhdx.mongodb.net/jobz?retryWrites=true&w=majority"),
  MongooseModule.forFeature([{name:"Employer",schema:EmployerSchema},
  {name:"JobSeeker",schema:JobSeekerSchema},
{name:"JobExperience",schema:ExperienceSchema},
{name:"EducationStatus",schema:EducationSchema},
{name:"Jobs",schema:JobSchema},
{name:"Login",schema:LoginSchema},
{name:"UnivDataOfJobSeekers",schema:UnivDataOfJobSeekersSchema},
{name:"JobsAppliedTo",schema:JobsAppliedToSchema}],
),
<<<<<<< HEAD
  AuthModule,
  ConfigModule.forRoot({isGlobal:true}),
  UniversityModule,
=======
  JobSeekerModule,
  EmployerModule,
>>>>>>> 68ffc20e7ee7ec86ac6a5b25ed0762d4b87b01a9
],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass: AtGuard,
  }],
})
export class AppModule {}
