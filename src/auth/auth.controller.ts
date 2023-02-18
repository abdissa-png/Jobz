/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployerAuthDto } from './dto/employerAuth.dto';
import { JobSeekerAuthDto } from './dto/jobSeekerAuth.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RtGuard } from 'src/common/guards/rt.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }

    @Public()
    @Post("signup/employer")
    @HttpCode(HttpStatus.CREATED)
    async signUpEmployer(@Body() dto:EmployerAuthDto){
       const result=await this.authService.signUpEmployer(dto);
       return  result as object;
    }

    @Public()
    @Post("signup/jobSeeker")
    @HttpCode(HttpStatus.CREATED)
    async signUpJobSeeker(@Body() dto:JobSeekerAuthDto){
        const result=await this.authService.signUpJobSeeker(dto);
        return  result as object;
    }

    @Public()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto:LoginDto){
        const result=await this.authService.login(dto);
        return result as object;
    }


    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId:string){
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
        @GetCurrentUserId() userId:string,
        @GetCurrentUser("refreshToken") refreshToken:string,
    ){
        //console.log(refreshToken);
        const result=await this.authService.refreshTokens(userId,refreshToken);
        return result as object;
    }
}
