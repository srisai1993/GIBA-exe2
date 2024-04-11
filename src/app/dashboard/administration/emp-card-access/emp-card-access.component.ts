import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpcardserviceService } from 'src/app/services/empcardservice.service';
import { PopupSnackbarService } from 'src/app/shared/services/popup-snackbar.service';
import { EmpCardFormComponent } from '../emp-card-form/emp-card-form.component';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PDFService } from 'src/app/shared/services/pdf.service';

@Component({
  selector: 'app-emp-card-access',
  templateUrl: './emp-card-access.component.html',
  styleUrls: ['./emp-card-access.component.scss']
})
export class EmpCardAccessComponent {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    // 'address',
    // 'city',
    'state',
    'boothpermission',
    'softwarepermission',
    'reportexecution',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  excelData:any[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmpcardserviceService,
    private _coreService: PopupSnackbarService,
    private _excelService:ExcelService,
    private _PdfService:PDFService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    this._empService.viewOrEditMode='edit';
    const dialogRef = this._dialog.open(EmpCardFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
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

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  viewOrEditEmployee(data: any,vieworedit:any) {
    this._empService.viewOrEditMode=vieworedit;
    const dialogRef = this._dialog.open(EmpCardFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }



  //export to excel 
  exportAsExcelFile(){
    this._excelService.exportAsExcelFile(this.excelData,'Employee_Details','Employee');
  }

  exportPDF()
  {
    const source = document.getElementById("content")|| '';
    this._PdfService.convert(source,'Employee_Details');
  }
}
