import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
      })
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
      })
    password:string;
}