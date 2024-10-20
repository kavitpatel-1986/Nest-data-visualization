// session.serializer.ts
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private prisma: PrismaService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user.id); 
  }


  async deserializeUser(id: any, done: Function) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (user) {
        return done(null, user); 
      }
      return done(new Error('User not found!'), null); 
    } catch (error) {
      done(error, null);
    }
  }
}