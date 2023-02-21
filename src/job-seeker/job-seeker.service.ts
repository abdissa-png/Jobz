import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint } from 'src/Model/complaint.model';
import { Education } from 'src/Model/education.model';
import { Experience } from 'src/Model/experience.model';
import { Job } from 'src/Model/job.model';
import { JobsAppliedTo } from 'src/Model/jobsAppliedTo.model';
import { JobSeeker } from 'src/Model/jobSeeker.model';

@Injectable()
export class JobSeekerService {
  constructor(
    @InjectModel('JobSeeker') private JobSeeker: Model<JobSeeker>,
    @InjectModel('JobsAppliedTo') private JobsAppliedTo: Model<JobsAppliedTo>,
    @InjectModel('Job') private Job: Model<Job>,
    @InjectModel('experience') private experience: Model<Experience>,
    @InjectModel('education') private education: Model<Education>,
    @InjectModel('complaint') private complaint: Model<Complaint>,
    @InjectModel('JobsAppliedTo') private jobsappliedto: Model<JobsAppliedTo>,
  ) {}

  async search(query) {
    console.log(query.keyWord)
    let Jobs = await this.Job.find({ title: query.title });
    return Jobs
  }
   async getjobsappliedto(query){
    let jobsapplied = await this.jobsappliedto.find({jobSeekerId: query.userid});
    return jobsapplied;

   }

  async createProfile(profile) {
    const newUser = new this.JobSeeker({
      name: profile.name,
      email: profile.email,
      sex: profile.sex,
      skills: profile.skills,
      qualifications: profile.qualifications,
    });
    const result = await newUser.save();
    console.log(result._id);
    const newUSerexp = new this.experience({
      jobSeekerId: result._id,
      jobTitle: profile.jobTitle,
      companyName: profile.companyName,
      startDate: profile.startDate,
      endDate: profile.endDate,
      reference: profile.reference,
    });
    const result1 = await newUSerexp.save();

    const newUseredu = new this.education({
      jobSeekerId: result._id,
      institution: profile.institution,
      fieldOfStudy: profile.fieldOfStudy,
      gpa: profile.gpa,
      admissionYear: profile.admissionYear,
      graduationYear: profile.graduationYear,
      degreeLevel: profile.degreeLevel,
    });
    const result2 = await newUseredu.save();
    return;
  }

  async editProfile(profile) {
    const userID = await this.findJS(profile.email);
    const userExp = await this.findexp(profile.email);
    const userEdu = await this.findedu(profile.email);

    if (userID) {
      if (profile.name) {
        userID.name = profile.name;
      }
      if (profile.email) {
        userID.email = profile.email;
      }
      if (profile.skills) {
        userID.skills = profile.skills;
      }
      if (profile.qualifications) {
        userID.qualifications = profile.qualifications;
      }
      if (profile.institution) {
        userEdu.institution = profile.institution;
      }
      if (profile.fieldOfStudy) {
        userEdu.fieldOfStudy = profile.fieldOfStudy;
      }
      if (profile.degreeLevel) {
        userEdu.gpa = profile.gpa;
      }
      if (profile.jobTitle) {
        userExp.jobTitle = profile.jobTitle;
      }
      if (profile.companyName) {
        userExp.companyName = profile.companyName;
      }
      if (profile.startDate) {
        userExp.startDate = profile.startDate;
      }
      if (profile.endDate) {
        userExp.endDate = profile.endDate;
      }
      if (profile.reference) {
        userExp.reference = profile.reference;
      }
      userID.save();
      userEdu.save();
      userExp.save();
    }
  }

  async apply(jobform) {
    let jid = await this.findJS(jobform.email) 
    jid = jid.id
    // find job id will be called here
    const newApplication = new this.JobsAppliedTo({
      jobId: jobform.jobID,
      jobSeekerId: jid,
      title: jobform.title,
      status: jobform.status,
      company: jobform.company
    });
    console.log(newApplication)
    const result = await newApplication.save();
  }

  async complain(complaintform) {
    const jid = await this.findJS(complaintform.email)
    const newComplaint = new this.complaint({
      jobSeekerId: jid.id,
      email: complaintform.email,   
      complaint: complaintform.complaint
    })
    const result = await newComplaint.save();
  }

  async getComplaints() {
    const complaints = await this.complaint.find().exec();
    return complaints
  }
  
  async deleteUser(inputreq) {
    const result = await this.JobSeeker.deleteOne({
      email: inputreq.email,
    }).exec();
    console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user');
    }
  }

  async findJS(email: string) {
    let res;
    try {
      res = await this.JobSeeker.findOne({ email: email }).exec();
    } catch (error) {
      throw new NotFoundException();
    }
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }
  async findedu(email: string) {
    let res;
    try {
      res = await this.JobSeeker.findOne({ email: email }).exec();
    } catch (error) {
      throw new NotFoundException();
    }
    if (!res) {
      throw new NotFoundException();
    }
    let resID = res.id;
    let edu;
    edu = await this.education.findOne({ jobSeekerId: resID });
    return edu;
  }
  async findexp(email: string) {
    let res;
    try {
      res = await this.JobSeeker.findOne({ email: email }).exec();
    } catch (error) {
      throw new NotFoundException();
    }
    if (!res) {
      throw new NotFoundException();
    }
    let resID = res.id;
    let exp = await this.experience.findOne({ jobSeekerId: resID });
    return exp;
  }
}
