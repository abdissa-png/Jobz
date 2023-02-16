import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/Model/job.model';
import { JobsAppliedTo } from 'src/Model/jobsAppliedTo.model';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel('Job') private job: Model<Job>,
    @InjectModel('JobsAppliedTo') private JobsAppliedTo: Model<JobsAppliedTo>,
  ) {}

  async addJob(job) {
    const newJob = new this.job({
      title: job.title,
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

    async listApplicants(query) {
        let result = await this.JobsAppliedTo.find({
            title: query.title,
            company: query.title
        })
        return result
    }
    async getAllJobs(company) {
        let result1 = this.job.find({ company: company.company })
        return result1
    } 
}
