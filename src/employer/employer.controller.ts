/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { JobDto } from './dto/job.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { EmployerProfileDto } from './dto/employerProfile.dto';

@Controller('employer')
export class EmployerController {
  constructor(private employerService: EmployerService) {}

    @Get()
        async getEmployer(@GetCurrentUserId() id:string){
            return this.employerService.getEmployer(id);
    }

    @Post('postJobs') // create a job in the database
        async postJobs(@GetCurrentUserId() id:string, @Body() job: JobDto) {
            return this.employerService.addJob(id,job);
    }

    @Post('viewDetails') // returns list of jobseekers that applied to one job
        async listApplicants(@Body() id:{jobId:string}) {
            return await this.employerService.listApplicants(id)
    }
    
    @Get("getAllJobs")
    async getAllPosts(@GetCurrentUserId() id:string) {
        return this.employerService.getAllJobs(id);
    }
    @Patch("updateProfile")
    async updateProfile(@GetCurrentUserId() id:string,@Body() profile:EmployerProfileDto){
        return this.employerService.updateProfile(id,profile);
    }
    @Patch("acceptJobSeeker")
    async acceptJobSeeker(@Body() job:{jobId:string,jobSeekerId:string}){
        return this.employerService.acceptJobSeeker(job);
    }
    @Patch("rejectJobSeeker")
    async rejectJobSeeker(@Body() job:{jobId:string,jobSeekerId:string}){
        return this.employerService.rejectJobSeeker(job);
    }

}
