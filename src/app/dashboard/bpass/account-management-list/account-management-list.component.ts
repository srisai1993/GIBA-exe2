import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PDFService } from 'src/app/shared/services/pdf.service';
import { PopupSnackbarService } from 'src/app/shared/services/popup-snackbar.service';

@Component({
  selector: 'app-account-management-list',
  templateUrl: './account-management-list.component.html',
  styleUrls: ['./account-management-list.component.scss']
})
export class AccountManagementListComponent {

  displayedColumns: string[] = [
    'id',
    'accountType',
    'status',
    'firstName',
    'lastName',
    'balance'
  ];
  dataSource!: MatTableDataSource<any>;
  excelData:any[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _accountsService: AccountsService,
    private _coreService: PopupSnackbarService,
    private _excelService:ExcelService,
    private _PdfService:PDFService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.getAccountsList();
  }

  getAccountsList() {
    this._accountsService.getAccountsList().subscribe({
      next: (res) => {
        console.log(res);
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

  onOpenNewAccount(){
      this._router.navigate(['/dashboard/bpass/account-form']);
  }

  exportAsExcelFile(){
    this._excelService.exportAsExcelFile(this.excelData,'Accounts_List','Accounts');
  }
  exportPDF()
  {
    const source = document.getElementById("content")|| '';
    this._PdfService.convert(source,'Accounts_List');
  }
}
