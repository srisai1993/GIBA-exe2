import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportsService } from 'src/app/services/reports.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PDFService } from 'src/app/shared/services/pdf.service';
import { PopupSnackbarService } from 'src/app/shared/services/popup-snackbar.service';

@Component({
  selector: 'app-viewreports',
  templateUrl: './viewreports.component.html',
  styleUrls: ['./viewreports.component.scss']
})
export class ViewreportsComponent implements OnInit{

  
  
  displayedColumns: string[] = [
    'transactionType',
    'lanes',
    'employee',
    'laneMode',
    'paymentMethod',
    'due',
    'paid'
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

  
  jsonarry :any =[];
  getReportsList() {
    // for(var i=0;i<50;i++)
    // {
    //   this.jsonarry.push({
    // 'transactionType':i+'lane Open',
    // 'lanes':i,
    // 'employee':i,
    // 'laneMode':i+9,
    // 'paymentMethod':i+123,
    // 'due':55+i,
    // 'paid':789+i
    //   })
    // }
    // this.excelData = this.jsonarry;
    // this.dataSource = new MatTableDataSource(this.jsonarry);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    this._reportsService.viewReportDetails().subscribe({
      next: (res) => {
        this.excelData = res;
        console.log(res);
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
    this._excelService.exportAsExcelFile(this.excelData,'Report_View','Reports');
  }

  exportPDF()
  {
    const source = document.getElementById("content")|| '';
    this._PdfService.convert(source,'Report_View');
  }
}
