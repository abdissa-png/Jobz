/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Patch } from '@nestjs/common/decorators';
import { JobSeekerService } from './job-seeker.service';
import { Public } from 'src/common/decorators/public.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { JobSeekerProfile } from './dto/jobSeekerProfile.dto';
import { EducationalInfoProfileDto } from './dto/educationalInfoProfile.dto';
import { JobExperienceDto } from './dto/jobExperience.dto';

@Controller('job-seeker')
export class JobSeekerController {
  constructor(private JobSeekerService: JobSeekerService) {}
  @Get()
  async getJobSeeker(@GetCurrentUserId() id:string) {
    return this.JobSeekerService.getId(id)
    }
  @Get('search')
  async search(@Body() query:{search:string}) {
      return this.JobSeekerService.search(query.search);
   }
  @Patch("editProfile")
  async editJobSeekerProfile(@GetCurrentUserId() id:string,@Body() profile:JobSeekerProfile){
      return this.JobSeekerService.editJobSeekerProfile(id,profile);
  }
  @Post("createEducationalInfo")
  async createEducationalInfo(@GetCurrentUserId() id:string,@Body() profile:EducationalInfoProfileDto){
      return this.JobSeekerService.createEducationalInfo(id,profile);
  }
  @Get("showEducationalInfo")
  async showEducationalInfo(@GetCurrentUserId() id:string){
      return this.JobSeekerService.showEducationalInfo(id);
  }
  @Patch("editEducationalInfo")
  async editEducationalInfo(@Body() profile:{educationalInfoId:string,profile:EducationalInfoProfileDto}){
      return this.JobSeekerService.editEducationalInfo(profile);
  }
  @Post("createJobExperienceInfo")
  async createJobExperience(@GetCurrentUserId() id:string,@Body() profile:JobExperienceDto){
      return this.JobSeekerService.createJobExperience(id,profile);
  }
  @Get("showJobExperience")
  async showJobExperience(@GetCurrentUserId() id:string){
      return this.JobSeekerService.showJobExperience(id);
  }
  @Patch("editJobExperience")
  async editJobExperience(@Body() profile:{jobExperienceId:string,profile:JobExperienceDto}){
      return this.JobSeekerService.editJobExperience(profile); 
  }
  /*
  @Post('createProfile')
  async createProfile(@Body() profile: {
    name: string,
    email: string,
    sex: string,
    skills: string,
    qualifications: string,
    institution: string,
    fieldOfStudy: string,
    gpa: number,
    admissionYear: number,
    graduationYear: number,
    degreeLevel: string,
    jobTitle: string,
    companyName: string,
    startDate: Date,
    endDate: Date,
    reference: string,
  }) {
    return this.JobSeekerService.createProfile(profile);
  }

  @Patch('editProfile')
  async editProfile(@Body() profile: {
    name: string,
    email: string,
    skills: string,
    qualifications: string,
    institution: string,
    fieldOfStudy: string,
    degreeLevel: string,
    jobTitle: string,
    companyName: string,
    startDate: Date,
    endDate: Date,
    reference: string,
  }) {
    return this.JobSeekerService.editProfile(profile);
  }
  */
  @Get("jobsAppliedTo")
  async jobsAppliedTo(@GetCurrentUserId() id:string){
      return this.JobSeekerService.getJobsAppliedTo(id);
  }
  @Post('apply')
  async apply(@GetCurrentUserId() id:string, @Body() jobform: {
      jobId: string,
      companyId:string
      title: string
  }) {
    return this.JobSeekerService.apply(id,jobform);
  }

  @Post('complain')
  async complain(@GetCurrentUserId() id:string, @Body() complaintform: {
    complaint: string
  }) {
    return this.JobSeekerService.complain(id,complaintform);
  }

  @Delete('deleteUser')
  async deleteUser(@Body() inputreq: { email: string }) {
      return this.JobSeekerService.deleteUser(inputreq)
  } 

  @Get("getComplaints")
  async handleComplaints() {
    return this.JobSeekerService.getComplaints();
  }
}
