import { Body, Controller, Patch, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
  constructor(private employerService: EmployerService) {}

  @Public()
  @Post('getUser')
  async getUser(@Body() query: { email: string }) {
    return this.employerService.getUser(query);
  }

  @Public()
  @Post('postJobs') // create a job in the database
  async postJobs(
    @Body()
    job: {
      title: string;
      jobType: string;
      location: string;
      company: string;
      salary: number;
      benefits: string;
      numOfSlots: string;
      description: string;
      dayPosted: Date;
      deadline: Date;
      jobCategory: string;
    },
  ) {
    return this.employerService.addJob(job);
  }

  @Public()
  @Post('editProfile')
  async editProfile(
    @Body()
    query: {
      oldEmail: string;
      name: string;
      email: string;
      location: string;
      webAddress: string;
      description: string;
    },
  ) {
    return this.employerService.editProfile(query);
  }

  @Public()
  @Post('viewDetails') // returns list of jobseekers that applied to one job
  async listApplicants(@Body() query: { title: string; company: string }) {
    return this.employerService.listApplicants(query);
  }

  @Public()
  @Post('getAllJobs')
  async getAllPosts(@Body() company: { company: string }) {
    return this.employerService.getAllJobs(company);
  }

  @Public()
  @Patch('updateStatus')
  async updateStatus(
    @Body() query: { jobSeekerEmail: string; jobId: string; jobStatus: string },
  ) {
    return this.employerService.updateStatus(query);
  }
}
