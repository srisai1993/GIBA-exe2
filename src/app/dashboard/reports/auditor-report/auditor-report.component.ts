import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpcardserviceService } from 'src/app/services/empcardservice.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PDFService } from 'src/app/shared/services/pdf.service';
import { PopupSnackbarService } from 'src/app/shared/services/popup-snackbar.service';
import { EmpCardFormComponent } from '../../administration/emp-card-form/emp-card-form.component';
import { DxDataGridModule } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';

import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
//import { Workbook } from 'exceljs';

@Component({
  selector: 'app-auditor-report',
  templateUrl: './auditor-report.component.html',
  styleUrls: ['./auditor-report.component.scss']
})
export class AuditorReportComponent implements OnInit {

  
  
  
  // displayedColumns: string[] = [
  //   'transactionType',
  //   'lanes',
  //   'employee',
  //   'laneMode',
  //   'paymentMethod',
  //   'due',
  //   'paid'
  // ];

  onExporting(e:any) {

    //export to PDF
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save('Auditor_Reports.pdf');
    });

    console.log(e);

    //export to excel 
    // const workbook = new Workbook();
    // const worksheet = workbook.addWorksheet('Employees');

    // exportDataGrid({
    //   component: e.component,
    //   worksheet,
    //   autoFilterEnabled: true,
    // }).then(() => {
    //   workbook.xlsx.writeBuffer().then((buffer) => {
    //     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    //   });
    // });
    // e.cancel = true;
  }
  dataSource!: any;
  excelData:any[]=[];
  products: any[]=[];

  showSubmenuModes: any;

  showFirstSubmenuModes: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _reportsService: ReportsService,
    private _coreService: PopupSnackbarService,
    private _excelService:ExcelService,
    private _PdfService:PDFService,
    private _router:Router
  ) {}

  currentProduct: any;

  ngOnInit(): void {
    this.getReportsList();
    
    this.products = [{
      id: '1',
      name: 'View Charts',
      items: [{
        id: '1_1',
        name: 'Line Charts',
        subname: 'LineCharts',
        icon: './assets/images/linecharts.png',
      }, {
        id: '1_2',
        name: 'Pie Charts',
        icon: './assets/images/piechart.png',
        subname: 'PieCharts',
      }],
    }];

    this.showSubmenuModes = [{
      name: 'onHover',
      delay: { show: 0, hide: 500 },
    }, {
      name: 'onClick',
      delay: { show: 0, hide: 300 },
    }];
    this.showFirstSubmenuModes = this.showSubmenuModes[1];
  }

  itemClick(data:any) {
    const item = data.itemData;
    if(item.name!='View Charts')
    {
      this._router.navigate(['/dashboard/viewcharts/'+item.subname]);
    }
    console.log(item);
    //this._router.navigate(['/dashboard/viewcharts/']);
    
  }
  
  jsonarry :any =[];
  getReportsList() {
    for(var i=0;i<50;i++)
    {
      this.jsonarry.push({
        'ID':i,
    'TransactionType':i+'lane Open',
    'Lanes':'Lane 0'+i,
    'Employee':'Employee'+i,
    'LaneMode':'Mode'+i,
    'PaymentMethod':'Cash',
    'due':55+i,
    'paid':789+i
      })
    }
    this.excelData = this.jsonarry;
    this.dataSource = this.jsonarry;
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;

    // this._reportsService.viewReportDetails().subscribe({
    //   next: (res) => {
    //     this.excelData = res;
    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   error: console.log,
    // });
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
