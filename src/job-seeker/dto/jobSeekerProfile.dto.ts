/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class JobSeekerProfile{
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    sex:string;
    @IsNotEmpty()
    @IsString()
    skills:string;
    @IsNotEmpty()
    @IsString()
    qualifications:string;
}