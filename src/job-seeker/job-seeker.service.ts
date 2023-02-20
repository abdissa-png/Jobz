/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Complaint } from 'src/Model/complaint.model';
import { Education } from 'src/Model/education.model';
import { Experience } from 'src/Model/experience.model';
import { Job } from 'src/Model/job.model';
import { JobsAppliedTo } from 'src/Model/jobsAppliedTo.model';
import { JobSeeker } from 'src/Model/jobSeeker.model';
import { Login } from 'src/Model/login.model';
import { JobSeekerProfile } from './dto/jobSeekerProfile.dto';
import { EducationalInfoProfileDto } from './dto/educationalInfoProfile.dto';
import { JobExperienceDto } from './dto/jobExperience.dto';

@Injectable()
export class JobSeekerService {
  constructor(
    @InjectModel('JobSeeker') private JobSeeker: Model<JobSeeker>,
    @InjectModel('JobsAppliedTo') private JobsAppliedTo: Model<JobsAppliedTo>,
    @InjectModel('Job') private Job: Model<Job>,
    @InjectModel('experience') private experience: Model<Experience>,
    @InjectModel('education') private education: Model<Education>,
    @InjectModel('complaint') private complaint: Model<Complaint>,
    @InjectModel("Login") private Login:Model<Login>
  ) {}

  async search(query) {
    //console.log(query.keyWord)
    let Jobs = await this.Job.find({ title: query});
    //console.log(Jobs);
    return Jobs
  }
  async getId(id:string){
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    return jobSeeker.id;
  }
  async editJobSeekerProfile(id:string,profile:JobSeekerProfile){
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.updateOne({email:user.email},{
      name:profile.name,
      sex:profile.sex,
      skills:profile.skills,
      qualifications:profile.qualifications,
    })
    return jobSeeker;
  }
  async showEducationalInfo(id:string){
      const user=await this.Login.findOne({_id:id});
      const jobSeeker=await this.JobSeeker.findOne({email:user.email});
      const education=await this.education.find({jobSeekerId:jobSeeker.id});
      return education;
  }
  async editEducationalInfo(profile){
      console.log(profile);
      const educationalInfo=this.education.findByIdAndUpdate(profile.educationalInfoId,{
        institution:profile.profile.institution,
        degreeLevel:profile.profile.degreeLevel,
        fieldOfStudy:profile.profile.fieldOfStudy,
        gpa:profile.profile.gpa,
        admissionYear:profile.profile.admissionYear,
        graduationYear:profile.profile.graduationYear,
      },{new:true});
      return educationalInfo;
  }
  async showJobExperience(id:string){
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    const jobExperience=await this.experience.find({jobSeekerId:jobSeeker.id});
    return jobExperience;
  }
  async editJobExperience(profile){
    const experience=this.experience.findByIdAndUpdate(profile.jobExperienceId,{
      jobTitle:profile.profile.jobTitle,
      companyName:profile.profile.companyName,
      startDate:profile.profile.startDate,
      endDate:profile.profile.endDate,
      reference:profile.profile.reference
    },{new:true});
    return experience;
  }
  async getJobsAppliedTo(id){
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    const jobsAppliedTo=this.JobsAppliedTo.find({jobSeekerId:jobSeeker.id});
    return jobsAppliedTo;
  }
  /*
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
  */
  async apply(id,jobform) {
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    // find job id will be called here
    console.log(jobform);
    const newApplication = new this.JobsAppliedTo({
      jobId: jobform.jobId,
      jobSeekerId: jobSeeker.id,
      title: jobform.title,
      status: jobform.status,
      company: jobform.company,
      companyId:jobform.companyId
    });
    console.log(newApplication)
    const result = await newApplication.save();
  }
  async createEducationalInfo(id:string,profile:EducationalInfoProfileDto){
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    const education=await this.education.create({
      jobSeekerId:jobSeeker.id,
      institution:profile.institution,
      fieldOfStudy:profile.fieldOfStudy,
      gpa:profile.gpa,
      admissionYear:profile.admissionYear,
      graduationYear:profile.graduationYear,
      degreeLevel:profile.degreeLevel,
    })
    education.save();
    return education;
  }
  async createJobExperience(id:string,profile:JobExperienceDto){
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    const experience=await this.experience.create({
      jobSeekerId:jobSeeker.id,
      jobTitle:profile.jobTitle,
      companyName:profile.companyName,
      startDate:profile.startDate,
      endDate:profile.endDate,
      reference:profile.reference
    })
    experience.save();
    return experience;
  }

  async complain(id,complaintform) {
    const user=await this.Login.findOne({_id:id});
    const jobSeeker=await this.JobSeeker.findOne({email:user.email});
    const newComplaint = new this.complaint({
      jobSeekerId: jobSeeker.id,
      email: jobSeeker.email,   
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
  /*
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
  */
}
