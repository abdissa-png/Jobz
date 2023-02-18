/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationSchema } from './Model/education.model';
import { EmployerSchema } from './Model/employer.model';
import { ExperienceSchema } from './Model/experience.model';
import { JobSchema } from './Model/job.model';
import { JobsAppliedToSchema } from './Model/jobsAppliedTo.model';
import { JobSeekerSchema } from './Model/jobSeeker.model';
import { LoginSchema } from './Model/login.model';
import { UnivDataOfJobSeekersSchema } from './Model/univDataOfJobSeekers.model';
import { JobSeekerModule } from './job-seeker/job-seeker.module';
import { EmployerModule } from './employer/employer.module';
import { UniversityModule } from './university/university.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Jobzdev:Qwertyuiop$123&23@cluster0.3fsuhdx.mongodb.net/jobz?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: 'Employer', schema: EmployerSchema },
      { name: 'JobSeeker', schema: JobSeekerSchema },
      { name: 'JobExperience', schema: ExperienceSchema },
      { name: 'EducationStatus', schema: EducationSchema },
      { name: 'Jobs', schema: JobSchema },
      { name: 'Login', schema: LoginSchema },
      { name: 'UnivDataOfJobSeekers', schema: UnivDataOfJobSeekersSchema },
      { name: 'JobsAppliedTo', schema: JobsAppliedToSchema },
    ]),
    JobSeekerModule,
    EmployerModule,
    UniversityModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal:true}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
