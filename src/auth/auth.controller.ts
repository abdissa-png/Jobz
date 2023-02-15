/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployerAuthDto } from './dto/employerAuth.dto';
import { JobSeekerAuthDto } from './dto/jobSeekerAuth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }

    @Post("signup/employer")
    @HttpCode(HttpStatus.CREATED)
    async signUpEmployer(@Body() dto:EmployerAuthDto){
        
    }

    @Post("signup/jobSeeker")
    @HttpCode(HttpStatus.CREATED)
    async signUpJobSeeker(@Body() dto:JobSeekerAuthDto){
        
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto:LoginDto){

    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(userId:number){
        return this.authService.logout(userId);
    }

    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refreshTokens(){
        
    }
}
