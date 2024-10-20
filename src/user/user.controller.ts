import { Body, Controller, Get, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
      const user = await this.userService.createUser(createUserDto.email,createUserDto.password);
      return user
    }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginuserDto: LoginUserDto ){
    const user = await this.userService.loginUser(loginuserDto.email,loginuserDto.password)
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user
  }

@Get('profile')
@UseGuards(AuthGuard('session'))
async profile(@Request() req) {
  const currentUserId = req.session?.passport?.user
  if (req.user) {
    return req.user;
  } 
  if(currentUserId){
    const user = await this.userService.findById(currentUserId)
    return user
  }
    throw new NotFoundException('Log In to save this quote to your history !');
  
}

}