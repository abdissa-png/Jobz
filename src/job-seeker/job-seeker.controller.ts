import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Patch } from '@nestjs/common/decorators';
import { JobSeekerService } from './job-seeker.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('job-seeker')
export class JobSeekerController {
  constructor(private JobSeekerService: JobSeekerService) {}
  @Public()
  @Post('getUser')
  async getId(@Body() query: { email: string }) {
    return this.JobSeekerService.findJS(query.email);
  }
  @Post('search')
  async search(@Body() query: { title: string }) {
    return this.JobSeekerService.search(query);
  }

  @Public()
  @Post('createProfile')
  async createProfile(
    @Body()
    profile: {
      name: string;
      email: string;
      sex: string;
      skills: string;
      qualifications: string;
      institution: string;
      fieldOfStudy: string;
      gpa: number;
      admissionYear: number;
      graduationYear: number;
      degreeLevel: string;
      jobTitle: string;
      companyName: string;
      startDate: Date;
      endDate: Date;
      reference: string;
    },
  ) {
    return this.JobSeekerService.createProfile(profile);
  }

  @Public()
  @Patch('editProfile')
  async editProfile(
    @Body()
    profile: {
      name: string;
      email: string;
      skills: string;
      qualifications: string;
      institution: string;
      fieldOfStudy: string;
      degreeLevel: string;
      jobTitle: string;
      companyName: string;
      startDate: Date;
      endDate: Date;
      reference: string;
    },
  ) {
    return this.JobSeekerService.editProfile(profile);
  }

  @Public()
  @Post('apply')
  async apply(
    @Body()
    jobform: {
      email: string;
      jobID: string;
      status: string;
      company: string;
      title: string;
    },
  ) {
    return this.JobSeekerService.apply(jobform);
  }

  @Post('complain')
  async complain(@Body() complaintform: { email: string; complaint: string }) {
    this.JobSeekerService.complain(complaintform);
  }

  @Delete('deleteUser')
  async deleteUser(@Body() inputreq: { email: string }) {
    return this.JobSeekerService.deleteUser(inputreq);
  }

  @Get('getComplaints')
  async handleComplaints() {
    return this.JobSeekerService.getComplaints();
  }

  @Public()
  @Post('getEducation')
  async getEducation(@Body() query: { email: string }) {
    return this.JobSeekerService.getEducation(query);
  }

  @Public()
  @Post('getExperience')
  async getExperience(@Body() query: { email: string }) {
    return this.JobSeekerService.getExperience(query);
  }
}
