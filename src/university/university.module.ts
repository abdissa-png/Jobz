import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationDetails, UniversitySchema } from './university.model';
import { LoginSchema } from 'src/Model/login.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'University', schema: UniversitySchema },
      { name: 'EducationDetails', schema: EducationDetails },
      { name: 'Login', schema: LoginSchema },
    ]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
