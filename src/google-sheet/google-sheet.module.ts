import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheet.services';
import { SheetsController } from './google-sheet.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [GoogleSheetsService,PrismaService],
  controllers: [SheetsController],
})
export class GoogleSheetsModule {}
