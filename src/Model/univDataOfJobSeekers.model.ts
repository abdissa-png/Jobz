/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const UnivDataOfJobSeekersSchema=new mongoose.Schema({
    name:{type:String,required:true},
    studentId:{type:String,required:true},
    institution:{type:String,required:true},
    fieldOfStudy:{type:String,required:true},
    degreeLevel:{type:String,required:true},
    admissionYear:{type:Number,required:true},
    graduationYear:{type:Number,required:true},
    gpa:{type:Number,required:true}
});
export interface UnivDataOfJobSeekers{
    id:string;
    studentId:string;
    institution:string;
    fieldOfStudy:string;
    degreeLevel:string;
    admissionYear:string;
    gpa:number;
}