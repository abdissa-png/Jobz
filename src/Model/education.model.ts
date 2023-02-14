/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const EducationSchema=new mongoose.Schema({
    jobSeekerId:{type:String,required:true},
    institution:{type:String,required:true},
    fieldOfStudy:{type:String,required:true},
    gpa:{type:Number,required:true},
    admissionYear:{type:Number,required:true},
    graduationYear:{type:Number,required:true},
    degreeLevel:{type:String,required:true}
});
export interface Education{
    id:string;
    jobSeekerId:string;
    institution:string;
    fieldOfStudy:string;
    gpa:number;
    admissionYear:number;
    graduationYear:number;
    degreeLevel:string;
}