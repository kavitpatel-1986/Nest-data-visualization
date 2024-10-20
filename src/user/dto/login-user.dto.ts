import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @IsString()
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
      })
    email:string;

    @IsString()
    @MinLength(4)
    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
      })
    password:string;
}