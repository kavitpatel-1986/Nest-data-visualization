import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService){}

    async validateUser(email:string,password:string){
        const user = await this.prisma.user.findUnique({where:{email}})
        if(user && (await bcrypt.compare(password,user.password))){
            return user
        }
        return null
    }
}