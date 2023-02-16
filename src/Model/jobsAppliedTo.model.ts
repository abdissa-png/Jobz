/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const JobsAppliedToSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  jobSeekerId: { type: String, required: true },
  company: { type: String, required: true }, // new
  title: { type: String, required: true }, // new
  status: { type: String, required: true, default: 'pending' },
});
export interface JobsAppliedTo {
  id: string;
  jobId: string;
  title: string; // new
  company: string; //new
  jobSeekerId: string;
  status: string;
}
