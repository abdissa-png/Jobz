/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class JobExperienceDto{
    @IsNotEmpty()
    @IsString()
    jobTitle:string;
    @IsNotEmpty()
    @IsString()
    companyName:string;
    @IsNotEmpty()
    startDate:Date;
    @IsNotEmpty()
    endDate:Date;
    @IsNotEmpty()
    @IsString()
    reference:string;
}