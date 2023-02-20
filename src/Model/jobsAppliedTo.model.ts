/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const JobsAppliedToSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  jobSeekerId: { type: String, required: true },
  companyId: { type: String, required: true }, // new
  title: { type: String, required: true }, // new
  status: { type: String, required: true, default: 'pending' },
});
export interface JobsAppliedTo {
  id: string;
  jobId: string;
  jobSeekerId: string;
  companyId: string; //new
  title:string;
  status: string;
}
