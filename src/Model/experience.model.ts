/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const ExperienceSchema=new mongoose.Schema({
    jobSeekerId:{type:String,required:true},
    jobTitle:{type:String,required:true},
    companyName:{type:String,required:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    reference:{type:String,required:true}
})
export interface Experience{
    id:string;
    jobSeekerId:string;
    jobTitle:string;
    companyName:string;
    startDate:Date;
    endDate:Date;
    reference:string;
}