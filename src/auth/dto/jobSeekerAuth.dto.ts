/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
export class JobSeekerAuthDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password:string;

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