/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employer } from 'src/Model/employer.model';
import { Job } from 'src/Model/job.model';
import { JobSeeker } from 'src/Model/jobSeeker.model';
import { JobsAppliedTo } from 'src/Model/jobsAppliedTo.model';
import { Login } from 'src/Model/login.model';
import { JobStatus } from 'src/common/status/jobsAppliedTo.status';
import { EmployerProfileDto } from './dto/employerProfile.dto';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel('Job') private job: Model<Job>,
    @InjectModel('JobsAppliedTo') private JobsAppliedTo: Model<JobsAppliedTo>,
    @InjectModel("Login") private Login:Model<Login>,
    @InjectModel("Employer") private Employer:Model<Employer>,
    @InjectModel("JobSeeker") private JobSeeker:Model<JobSeeker>,
  ) {}
  async getEmployer(id){
    const user=await this.Login.findOne({_id:id});
    const employer=this.Employer.findOne({email:user.email});
    return employer;
  };
  async updateProfile(id,profile:EmployerProfileDto){
    const user=await this.Login.findOne({_id:id});
    console.log(profile);
    const employer=await this.Employer.updateOne({email:user.email},{
      name:profile.name,
      location:profile.location,
      webAddress:profile.webAddress,
      description:profile.description,
    });
    return employer;
  } 
  async acceptJobSeeker(job){
    //const jobAppliedTo=await this.JobsAppliedTo.findOne({jobId:job.jobId,jobSeekerId:job.jobSeekerId});
    const jobAppliedTo=this.JobsAppliedTo.updateOne({jobId:job.jobId,jobSeekerId:job.jobSeekerId},{
      status:JobStatus.ACCEPTED
    });
    return jobAppliedTo;
  }
  async rejectJobSeeker(job){
    //const jobAppliedTo=await this.JobsAppliedTo.findOne({jobId:job.jobId,jobSeekerId:job.jobSeekerId});
    const jobAppliedTo=this.JobsAppliedTo.updateOne({jobId:job.jobId,jobSeekerId:job.jobSeekerId},{
      status:JobStatus.REJECTED
    });
    return jobAppliedTo;
  }
  async addJob(id,job) {
    const user=await this.Login.findOne({_id:id});
    const email=user.email;
    const employer=await this.Employer.findOne({email:email});
    const newJob = new this.job({
      title: job.title,
      companyId:employer.id,
      jobType: job.jobType,
      location: job.location,
      company: job.company,
      salary: job.salary,
      benefits: job.benefits,
      numOfSlots: job.numOfSlots,
      description: job.description,
      dayPosted: job.dayPosted,
      deadline: job.deadline,
      jobCategory: job.jobCategory,
    });
    const result = newJob.save();
    return result;
  }

    async listApplicants(id) {
      /*
        let result = await this.JobsAppliedTo.find({
            title: query.title,
            company: query.title
        })
        return result
        */
      //console.log(id.jobId);
      const allApplicants=await this.JobsAppliedTo.find({jobId:id.jobId});
      const promises = allApplicants.map(async (applicant) => {
            const jobSeeker = await this.JobSeeker.find({ _id: applicant.jobSeekerId });
            return jobSeeker;
      });
      const resolvedPromises = await Promise.all(promises);
      return resolvedPromises[0];
      /*
      allApplicants.forEach(async (applicant) => {
        const jobSeeker = await this.JobSeeker.find({ _id: applicant.jobSeekerId });
        listOfAll.push(jobSeeker);
      })
      */
    }
    async getAllJobs(userId) {
      /*
        let result1 = this.job.find({ company: company.company })
        return result1
      */
      const user=await this.Login.findOne({_id:userId});
      const email=user.email;
      const employer=await this.Employer.findOne({email:email});
      const jobs=await this.job.find({companyId:employer.id});
      return jobs;
    } 
}
