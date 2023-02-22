import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly UniversitySerivce: UniversityService) {}
  @Public()
  @Post('add')
  async addUniversity(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const university = await this.UniversitySerivce.inserUniversity(
      email,
      password,
    );
    return {
      id: university._id,
      email: university.email,
      password: university.password,
    };
  }

  @Get('getAll')
  async getUniversity() {
    const universities = await this.UniversitySerivce.getAllUniversities();
    return universities;
  }

  @Post('getUnique')
  async getUniversityByName(@Body('name') name: string) {
    const university = await this.UniversitySerivce.getUniversity(name);
    return university;
  }

  @Delete('delete')
  async deleteUniversity(@Body('name') name: string) {
    try {
      const result = await this.UniversitySerivce.deleteUniversity(name);
      return result;
    } catch {
      return HttpStatus.NOT_FOUND;
    }
  }

  @Post('upload')
  async uploadData(
    @Body('name') name: string,
    @Body('id') id: string,
    @Body('department') department: string,
    @Body('cgpa') CGPA: string,
    @Body('graduation') graduation: Date,
  ) {
    let result = await this.UniversitySerivce.uploadData(
      name,
      id,
      department,
      CGPA,
      graduation,
    );
    return result;
  }
}
