import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleSheetsModule } from './google-sheet/google-sheet.module';

@Module({
  imports: [UserModule,AuthModule,GoogleSheetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
