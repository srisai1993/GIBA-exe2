import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpcardserviceService } from 'src/app/services/empcardservice.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PDFService } from 'src/app/shared/services/pdf.service';
import { PopupSnackbarService } from 'src/app/shared/services/popup-snackbar.service';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss']
})
export class ReportsGridComponent {

  
  displayedColumns: string[] = [
    // 'id',
    'auditor',
    'bPass',
    'tollMaintenance',
    'eomAnalysis',
  ];
  dataSource!: MatTableDataSource<any>;
  excelData:any[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _reportsService: ReportsService,
    private _coreService: PopupSnackbarService,
    private _excelService:ExcelService,
    private _PdfService:PDFService
  ) {}

  ngOnInit(): void {
    this.getReportsList();
  }

  

  getReportsList() {
    this._reportsService.getReportsList().subscribe({
      next: (res) => {
        this.excelData = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //export to excel 
  exportAsExcelFile(){
    this._excelService.exportAsExcelFile(this.excelData,'Reports_List','Reports');
  }

  exportPDF()
  {
    const source = document.getElementById("content")|| '';
    this._PdfService.convert(source,'Reports_List');
  }
}
