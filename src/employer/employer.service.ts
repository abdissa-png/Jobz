import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/Model/job.model';
import { JobsAppliedTo } from 'src/Model/jobsAppliedTo.model';
import { JobSeeker } from 'src/Model/jobSeeker.model';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel('Job') private job: Model<Job>,
    @InjectModel('JobsAppliedTo') private JobsAppliedTo: Model<JobsAppliedTo>,
    @InjectModel('JobSeeker') private JobSeeker: Model<JobSeeker>,
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
      company: query.company,
    });
    let realResult = [];
    for (let i = 0; i < result.length; i++) {
      let another = await this.JobSeeker.find({
        _id: result[i].jobSeekerId,
      });
      another.forEach((element) => {
        realResult.push(element);
      });
    }
    return realResult;
  }

  async updateStatus(query){
    let person = await this.JobSeeker.find({
      email: query.jobSeekerEmail
    })
    let realPerson = person[0]
    let result = await this.JobsAppliedTo.find({
      jobId: query.jobId,
      jobSeekerId: realPerson._id
    })
    result[0].status = "Accepted"
    result[0].save()
    return result
  }
  async getAllJobs(company) {
    let result1 = this.job.find({ company: company.company });
    return result1;
  }
}
