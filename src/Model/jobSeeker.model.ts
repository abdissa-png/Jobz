/* eslint-disable prettier/prettier */
import { Global } from "@nestjs/common";
import * as mongoose from "mongoose";
export const JobSeekerSchema=new mongoose.Schema({
    name:{type:String,required:true},   
    email:{type:String,required:true,unique: true}, // made it unique
    sex:{type:String,required:true},
    skills:{type:String},
    qualifications:{type:String}
})
export interface JobSeeker{
    id:string;
    name:string;
    email:string;
    sex:string;
    skills:string;
    qualifications:string;
}