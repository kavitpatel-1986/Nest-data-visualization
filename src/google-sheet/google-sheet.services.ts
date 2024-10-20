import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleSheetsService {
  private sheets;

  constructor(private readonly prisma: PrismaService) {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }


  async getSpreadsheet(userId:string,spreadsheetId: string, sheetName: string) {
    // const user = await this.prisma.user.findUnique({where:{id:userId}})
    // if(!user) throw new UnauthorizedException("User doesn't exists !")
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,  
    });
    return response.data.values;  
  }
  
  async getDataByRange(spreadsheetId: string, range: string) {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  }
}
