/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const JobSchema=new mongoose.Schema({
    companyId:{type:String,required:true},
    title:{type:String,required:true},
    jobType:{type:String,required:true},
    location:{type:String,required:true},
    company:{type:String,required:true},
    salary:{type:Number,required:true},
    benefits:{type:String,required:true},
    numOfSlots:{type:String,required:true},
    description:{type:String,required:true},
    dayPosted:{type:Date,required:true},
    deadline:{type:Date,required:true},
    jobCategory:{type:[String],required:true},
})
export interface Job{
    id:string;
    companyId:string;
    title:string;
    jobType:string;
    location:string;
    company:string;
    salary:number;
    benefits:string;
    numOfSlots:string;
    description:string;
    dayPosted:Date;
    deadline:Date;
    jobCategory:string[];
}