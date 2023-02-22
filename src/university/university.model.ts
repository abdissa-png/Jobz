import * as mongoose from 'mongoose';

export const UniversitySchema = new mongoose.Schema({
  email: String,
  password: String,
});

export const EducationDetails = new mongoose.Schema({
  name: String,
  id: String,
  department: String,
  CGPA: String,
  graduation: Date,
});

export interface University {
  id: string;
  email: string;
  password: string;
}

export interface EducationDetails {
  name: string;
  id: string;
  department: string;
  CGPA: string;
  graduation: Date;
}
