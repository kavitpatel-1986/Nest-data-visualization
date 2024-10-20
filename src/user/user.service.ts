import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService){}
    async findOne(email:string){
        return this.prisma.user.findUnique({
            where:{email}
        })
    }

    async createUser(email:string,password:string){
        const hashedPassword = await bcrypt.hash(password,10)
        return this.prisma.user.create({
            data:{email,password:hashedPassword}
        })
    }

    async loginUser(email:string,password:string){
        const user = await this.prisma.user.findUnique({where:{email}})
        if(user && (await bcrypt.compare(password,user.password))){
            const {password,...rest}=user
            return rest;
        }
        return null       
    }

    async findById(id:string){
        return this.prisma.user.findUnique({where:{id}})
    }

}