/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const EmployerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    Location:{type:String,required:true},
    webAddress:{type:String,required:true},
    description:{type:String,required:true}
})
export interface Employer{
    id:string;
    name:string;
    location:string;
    webAddress:string;
    description:string;
}