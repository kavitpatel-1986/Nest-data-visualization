import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serialize";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports:[PassportModule.register({session:true})],
    providers:[AuthService,PrismaService,LocalStrategy,SessionSerializer],
    exports:[AuthService],
    controllers:[AuthController]
})
export class AuthModule{}