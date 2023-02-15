/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class EmployerAuthDto{
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
    location:string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    webAddress:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    
}