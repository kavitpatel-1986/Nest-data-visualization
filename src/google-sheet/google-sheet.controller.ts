import { Controller, Get, Param, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheet.services';
import { AuthGuard } from '@nestjs/passport';

@Controller('sheet')
export class SheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

@Get(':spreadsheetId/:sheetName')
@UseGuards(AuthGuard('session'))
async getSheetData(
    @Request() req,
  @Param('spreadsheetId') spreadsheetId: string,
  @Param('sheetName') sheetName: string
) {
    // const currentUserId = req.session.passport?.user
    // if(!currentUserId) throw new UnauthorizedException('You must logged in !')
  return this.googleSheetsService.getSpreadsheet("currentUserId",spreadsheetId, sheetName);
}

  @Get('filter')
  async getFilteredData(
    @Query('spreadsheetId') spreadsheetId: string,
    @Query('range') range: string,
    @Query('age') age: string,
    @Query('gender') gender: string,
    @Query('dateRange') dateRange: string,
  ) {
    const data = await this.googleSheetsService.getDataByRange(
      spreadsheetId,
      range,
    );
    return {data:"FILTER LOGIC"}
  }
}
