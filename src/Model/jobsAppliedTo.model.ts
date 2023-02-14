/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const JobsAppliedToSchema=new mongoose.Schema({
    jobId:{type:String,required:true},
    jobSeekerId:{type:String,required:true},
    status:{type:String,required:true,default:"pending"},
})
export interface JobsAppliedTo{
    id:string;
    jobId:string;
    jobSeekerID:string;
    status:string;
}