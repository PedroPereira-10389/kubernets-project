import { Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs';
import { Readable } from 'stream';


@Injectable()
export class ExcelService {
  async readExcelData(filePath): Promise<any[]> {
    const rowsData = [];
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(filePath);
    const worksheet = workbook.worksheets[0];
    const rows = worksheet.getSheetValues().filter(function (element) {
      return element != undefined
    });
    rows.shift();
    return rows;
  }
}

