/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class EmployerProfileDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    @IsString()
    location:string;
    @IsNotEmpty()
    @IsString()
    webAddress:string;
    @IsNotEmpty()
    @IsString()
    description:string;
}