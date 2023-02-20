/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, isNumber } from "class-validator";

export class JobDto{
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    jobType: string;
    @IsNotEmpty()
    @IsString()
    location: string;
    @IsNotEmpty()
    @IsString()
    company: string;
    @IsNotEmpty()
    @IsNumber()
    salary: number;
    @IsNotEmpty()
    @IsString()
    benefits: string;
    @IsNotEmpty()
    @IsString()
    numOfSlots: string;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    dayPosted: Date;
    @IsNotEmpty()
    deadline: Date;
    @IsNotEmpty()
    @IsString()
    jobCategory: string;
}