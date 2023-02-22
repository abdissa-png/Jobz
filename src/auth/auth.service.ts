/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employer } from 'src/Model/employer.model';
import { JobSeeker } from 'src/Model/jobSeeker.model';
import { Login } from 'src/Model/login.model';
import * as bcrypt from 'bcrypt';
import { tokens } from './types/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmployerAuthDto } from './dto/employerAuth.dto';
import { JobSeekerAuthDto } from './dto/jobSeekerAuth.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from 'src/common/roles/user.role';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Login') private readonly loginModel: Model<Login>,
    @InjectModel('Employer') private readonly employerModel: Model<Employer>,
    @InjectModel('JobSeeker') private readonly jobSeekerModel: Model<JobSeeker>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get<string>('AT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get<string>('RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    const doc = await this.loginModel.findByIdAndUpdate(userId, {
      hashedRt: hash,
    });
    if (!doc) {
      throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
    } else {
      console.log('Updated document: ', doc);
    }
  }
  async signUpEmployer(dto: EmployerAuthDto): Promise<any> {
    const hash = await this.hashData(dto.password);
    const newEmployerLogin = new this.loginModel({
      email: dto.email,
      password: hash,
      role: UserRole.EMPLOYER,
    });
    const newEmployer = new this.employerModel({
      name: dto.name,
      email: dto.email,
      location: dto.location,
      webAddress: dto.webAddress,
      description: dto.description,
    });
    await newEmployerLogin.save((err, savedData) => {
      if (err) {
        //console.error(err);
        throw new HttpException(
          'A problem has occured',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        //console.log('Data saved: ', savedData);
      }
    });
    await newEmployer.save((err, savedData) => {
      if (err) {
        //console.error(err);
        throw new HttpException(
          'A problem has occured',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        //console.log('Data saved: ', savedData);
      }
    });
    const tokens = await this.getTokens(
      newEmployerLogin.id,
      newEmployerLogin.email,
      newEmployerLogin.role,
    );
    await this.updateRtHash(newEmployerLogin.id, tokens.refresh_token);
    console.log(tokens);
    return { ...tokens, role: newEmployerLogin.role };
  }
  async signUpJobSeeker(dto: JobSeekerAuthDto): Promise<any> {
    const hash = await this.hashData(dto.password);
    const newJobSeekerLogin = new this.loginModel({
      email: dto.email,
      password: hash,
      role: UserRole.JOBSEEKER,
    });
    const newJobSeeker = new this.jobSeekerModel({
      name: dto.name,
      email: dto.email,
      sex: dto.sex,
      skills: dto.skills,
      qualifications: dto.qualifications,
    });
    await newJobSeekerLogin.save();
    await newJobSeeker.save();
    const tokens = await this.getTokens(
      newJobSeekerLogin.id,
      newJobSeekerLogin.email,
      newJobSeekerLogin.role,
    );
    await this.updateRtHash(newJobSeekerLogin.id, tokens.refresh_token);
    //console.log(tokens);
    return { ...tokens, role: newJobSeekerLogin.role };
  }
  async login(query): Promise<any> {
    const email = query.email;
    const user = await this.loginModel.findOne({ email: email });
    if (!user) {
      //console.log('User not found');
      throw new HttpException('User not found!', HttpStatus.FORBIDDEN);
    } else {
      //console.log('Found user:', user);
      const passwordMatches = await bcrypt.compare(
        query.password,
        user.password,
      );
      if (!passwordMatches)
        throw new HttpException(
          'Password is not correct',
          HttpStatus.FORBIDDEN,
        );
      return user.role;
    }
  }
  async logout(userId: string) {
    const doc = await this.loginModel.findByIdAndUpdate(userId, {
      hashedRt: null,
    });
    if (!doc) {
      throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
    } else {
      //console.log('Updated document: ', doc);
    }
    return true;
  }
  async refreshTokens(userId: string, rt: string) {
    const user = await this.loginModel.findById({ _id: userId });
    console.log(user.toJSON());
    if (!user) {
      throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
      //console.error(err);
    } else {
      //console.log(user);
      if (!user || !user.hashedRt)
        throw new HttpException('Access Denied!', HttpStatus.FORBIDDEN);
      const rtMatches = await bcrypt.compare(rt, user.hashedRt);
      console.log(rtMatches, ' ');
      if (!rtMatches) {
        throw new HttpException('Access Denied!', HttpStatus.FORBIDDEN);
      } else {
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return { ...tokens, role: user.role };
      }
    }
  }
}
