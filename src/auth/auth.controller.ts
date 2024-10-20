import {  Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
export class AuthController{
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req:any){
        console.log("HITTED")
        return req.user
    }
}