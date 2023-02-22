import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NOTFOUND } from 'dns';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { UserRole } from 'src/common/roles/user.role';
import { Login } from 'src/Model/login.model';
import { EducationDetails, University } from './university.model';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('University')
    private readonly universityModel: Model<University>,
    @InjectModel('EducationDetails')
    private readonly EducationDetailsModel: Model<EducationDetails>,
    @InjectModel('Login') private readonly loginModel: Model<Login>,
  ) {}

  async inserUniversity(email: string, password: string) {
    const newUniversity = new this.loginModel({
      email,
      password,
      role: UserRole.UNIVERSITY,
    });
    const newUni = new this.universityModel({
      email,
      password,
    });
    const result = await newUniversity.save();
    const newuni = await newUni.save();
    return result;
  }

  async getAllUniversities() {
    const universities = await this.universityModel.find();
    return universities;
  }

  async getUniversity(name: string) {
    const university = await this.universityModel
      .findOne({ name: name })
      .exec();
    return university;
  }

  async deleteUniversity(name: string) {
    const result = await this.universityModel
      .deleteOne({
        name: name,
      })
      .exec();
    if (result.deletedCount === 0) {
      throw new Error('University not found!');
    }
    return 'done';
  }

  async uploadData(
    name: string,
    id: string,
    department: string,
    CGPA: string,
    graduation: Date,
  ) {
    const newData = new this.EducationDetailsModel({
      name,
      id,
      department,
      CGPA,
      graduation,
    });
    let result = await newData.save();
    return result;
  }
}
