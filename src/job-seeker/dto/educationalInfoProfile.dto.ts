/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EducationalInfoProfileDto{
    @IsNotEmpty()
    @IsString()
    institution:string;
    @IsNotEmpty()
    @IsString()
    fieldOfStudy:string;
    @IsNotEmpty()
    @IsNumber()
    gpa:number;
    @IsNotEmpty()
    @IsNumber()
    admissionYear:number;
    @IsNotEmpty()
    @IsNumber()
    graduationYear:number;
    @IsNotEmpty()
    @IsString()
    degreeLevel:string;
}