import { Body, Controller, Post } from '@nestjs/common';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
  constructor(private employerService: EmployerService) {}

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
      return this.employerService.addJob(job)
  }

  @Post('viewDetails') // returns list of jobseekers that applied to one job
  async listApplicants(@Body() query: {
      title: string,
      company: string
  }) {
      return this.employerService.listApplicants(query)
  }
    
    @Post("getAllJobs")
    async getAllPosts(@Body() company: {
        company: string
    }) {
        return this.employerService.getAllJobs(company)
    }
}
