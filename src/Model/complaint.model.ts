/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const complaint=new mongoose.Schema({
    jobSeekerId: { type:String, required: true },
    email:{type:String,required:true},
    complaint:{type:String,required:true},
})
export interface Complaint{
    id:string;
    jobSeekerId: string;
    email: string;
    complaint:string;
}