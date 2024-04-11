import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpcardserviceService } from '../services/empcardservice.service';
import { ExcelService } from '../shared/services/excel.service';
import { LoaderService } from '../shared/services/loader.service';
import { PDFService } from '../shared/services/pdf.service';
import { PopupSnackbarService } from '../shared/services/popup-snackbar.service';
import { EmpCardFormComponent } from './administration/emp-card-form/emp-card-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'folderName',
    'fileCount',
  ];


  DataIn!: MatTableDataSource<any>;
  DataProcessed!: MatTableDataSource<any>;
  InsertFailed!: MatTableDataSource<any>;
  InvalidXML!: MatTableDataSource<any>;

  dataDestination!: MatTableDataSource<any>;
  excelData: any[] = [];

  @ViewChild('processedpaginator') processedpaginator!: MatPaginator;
  // @ViewChild(MatPaginator) processedpaginator!: MatPaginator;
  @ViewChild(MatSort) processedsort!: MatSort;

  @ViewChild('insertedpaginator') insertedpaginator!: MatPaginator;
  //@ViewChild(MatPaginator) insertedpaginator!: MatPaginator;
  @ViewChild(MatSort) insertedsort!: MatSort;

  @ViewChild('invalidpaginator') invalidpaginator!: MatPaginator;
  //@ViewChild(MatPaginator) invalidpaginator!: MatPaginator;
  @ViewChild(MatSort) invalidsort!: MatSort;

  @ViewChild('datainpaginator') datainpaginator!: MatPaginator;
  //  @ViewChild(MatPaginator) datainpaginator!: MatPaginator;
  @ViewChild(MatSort) datainsort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmpcardserviceService,
    private _coreService: PopupSnackbarService,
    private _excelService: ExcelService,
    private _PdfService: PDFService,
    private loaderService: LoaderService,
    private _popUpService: PopupSnackbarService,
  ) { }

  getEmail: boolean = false;
  polling: any;
  nextDate: Date = new Date();
  delay: any = 60 * 60 * 1000;
  ngOnInit(): void {

    this.today = new Date();

    this.nextDate = new Date();
    if (this.nextDate.getMinutes().toString() === "2") { // You can check for seconds here too
      this.callEveryHour()
    } else {
      this.nextDate.setHours(this.nextDate.getHours() + 1);
      this.nextDate.setMinutes(2);
      this.nextDate.setSeconds(0);// I wouldn't do milliseconds too ;)

      var difference = +this.nextDate - +new Date();
      //setTimeout(this.callEveryHour(), difference);
      setTimeout(() => {
        this.callEveryHour();
      }, difference);
    }

    //setInterval(() => { this.trigger5minAPI(); }, 5 * 60 * 1000);
    this.start5minTimer();

  }

  callEveryHour() {
    setInterval(() => { this.triggerHourlyAPI(); }, this.delay);
  }


  timeLeft5min: number = 300;
  interval:any;

  start5minTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft5min === 0)
      this.trigger5minAPI();
      if(this.timeLeft5min > 0) {
        this.timeLeft5min--;
        this.transformsecondsToMinutes(this.timeLeft5min);
        
      } else {
        this.timeLeft5min = 300;
        this.transformsecondsToMinutes(this.timeLeft5min);
      }
    },1000)
  }

  pause5minTimer() {
    clearInterval(this.interval);
  }

  showtransformsecondsToMinutes():boolean{
    if(new Date(this.selectDate).toLocaleDateString('en-ZA') === new Date().toLocaleDateString('en-ZA'))
    return true;
    else 
    return false;
  }

  transformsecondsToMinutes(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }


  triggerHourlyAPI(): any {
    //get the mins of the current time
    var mins = new Date().getMinutes();
    //if (mins.toString() == "02" || mins.toString() == "2") {
    console.log('call api for every 1hr');
    this.selectedFrequency = "Date";
    this.getEmail = true;
    this.getDataInFilesList(this.today.toLocaleDateString('en-ZA'));
    //}
  }

  trigger5minAPI(): any {
    var mins = new Date().getMinutes();
    console.log('call api for every 5min');
    this.selectedFrequency = "Date";
    this.getEmail = false;
    this.getDataInFilesList(this.today.toLocaleDateString('en-ZA'));
  }



  getTwoDigitHours(hour: number) {
    return hour > 9 ? "" + hour.toString() : "0" + hour.toString();
  }

  sixMonthsAgo: Date = new Date(2022, 0, 1);
  showProcessing: boolean = true;

  getDataInFilesList(createDate: string) {
    
    this.timeLeft5min=300;
    this.pause5minTimer();
    this.showProcessing = false;
    this.loaderService.show();
    this._empService.getDataInFilesList(createDate, this.selectedFrequency).subscribe({
      next: (res) => {
        if (res) {
          if (res[0].dataIn) {
            this.DataIn = new MatTableDataSource(res[0].dataIn);
            this.DataIn.sort = this.datainsort;
            this.DataIn.paginator = this.datainpaginator;
          }

          if (res[0].dataProcessed) {
            this.DataProcessed = new MatTableDataSource(res[0].dataProcessed);
            this.DataProcessed.sort = this.processedsort;
            this.DataProcessed.paginator = this.processedpaginator;
          }

          if (res[0].insertFailed) {
            this.InsertFailed = new MatTableDataSource(res[0].insertFailed);
            this.InsertFailed.sort = this.insertedsort;
            this.InsertFailed.paginator = this.insertedpaginator;
          }

          if (res[0].invalidXML) {
            this.InvalidXML = new MatTableDataSource(res[0].invalidXML);
            this.InvalidXML.sort = this.invalidsort;
            this.InvalidXML.paginator = this.invalidpaginator;
          }
        
        if (this.getEmail)
          this.sendEmail(res[0].dataIn, res[0].dataProcessed, res[0].insertFailed, res[0].invalidXML)
        //this.sendEmail(res[0].dataIn, " Invalid XML");
        
        // this.timeLeft5min=300;
        // this.start5minTimer();
        }
        if (!res[0].dataIn&& !res[0].dataProcessed &&  !res[0].insertFailed &&  !res[0].invalidXML)
        {
        this._popUpService.openSnackBar("No Data Available","error");
        this.DataIn = new MatTableDataSource();
        this.DataProcessed = new MatTableDataSource();
        this.InvalidXML = new MatTableDataSource();
        this.InsertFailed = new MatTableDataSource();
        this.showProcessing = true;

        }
        console.log(res);
        this.showProcessing = true;
        this.loaderService.hide();
        this.timeLeft5min=300;
        this.start5minTimer();
        

      },
      error: (err) => {
        console.log('Test');
        this.DataIn = new MatTableDataSource();
        this.DataProcessed = new MatTableDataSource();
        this.InvalidXML = new MatTableDataSource();
        this.InsertFailed = new MatTableDataSource();
        this.showProcessing = true;
      }
    });
  }

  getDataProcessedFilesList(createDate: string) {
    this._empService.getDataProcessedFilesList(createDate).subscribe({
      next: (res) => {
        this.DataProcessed = new MatTableDataSource(res[0].dataProcessed);
        this.DataProcessed.sort = this.processedsort;
        this.DataProcessed.paginator = this.processedpaginator;
      },
      error: console.log,
    });
  }

  getInsertFailedFilesList(createDate: string) {
    this._empService.getInsertFailedFoldersList(createDate).subscribe({
      next: (res) => {
        this.InsertFailed = new MatTableDataSource(res[0].insertFailed);
        this.InsertFailed.sort = this.insertedsort;
        this.InsertFailed.paginator = this.insertedpaginator;

      },
      error: console.log,
    });
  }

  getInvalidXMLFilesList(createDate: string) {
    this._empService.getInvalidXMLFoldersList(createDate).subscribe({
      next: (res) => {
        this.InvalidXML = new MatTableDataSource(res[0].invalidXML);
        this.InvalidXML.sort = this.invalidsort;
        this.InvalidXML.paginator = this.invalidpaginator;
      },
      error: console.log,
    });
  }

  today = new Date();
  selectDate: any = new Date();
  getResults() {
    let obj = new Date(this.selectDate).toLocaleDateString('en-ZA');
    this.getDataInFilesList(obj.toString());

  }

  showDataIn: boolean = true;
  showProcessed: boolean = false;
  showFailed: boolean = false;
  showXML: boolean = false;

  onchkDataIn(event: any) {
    if (event.checked)
      this.showDataIn = true;
    else
      this.showDataIn = false;
  }

  onchkProcessed(event: any) {
    if (event.checked)
      this.showProcessed = true;
    else
      this.showProcessed = false;
  }

  onchkFailed(event: any) {
    if (event.checked)
      this.showFailed = true;
    else
      this.showFailed = false;
  }
  onchkXML(event: any) {
    if (event.checked)
      this.showXML = true;
    else
      this.showXML = false;
  }

  changeRowColor(row: any) {
    if (new Date(this.selectDate).toLocaleDateString() === new Date().toLocaleDateString())
      return row.fileCount > 0 && this.getTwoDigitHours(new Date().getHours()) != row.folderName.toString();
    else
      return row.fileCount > 0;
  }

  sendEmail(dataIn: any, dataProcessed: any, insertFailed: any, invalidXML: any) {
    if (this.getFolderslistforHour(dataIn) > 0 || this.getFolderslistforHour(dataProcessed) > 0 || this.getFolderslistforHour(insertFailed) > 0 || this.getFolderslistforHour(invalidXML) >0) {
      var MailRequest;
      var bodyTemplate = `
    <p> Date : <b> ${new Date().toLocaleDateString()} </b></p>
    <p> Current Time : <b> ${new Date().toLocaleTimeString()} </b></p>
    <p> Data In Folder Count : <b> ${this.getFolderslistforHour(dataIn)} </b></p>
    <p> Data Processed Count : <b> ${this.getFolderslistforHour(dataProcessed)} </b></p>
    <p> Data Insert Failed Count : <b> ${this.getFolderslistforHour(insertFailed)} </b></p>
    <p> Invalid XML Count : <b> ${this.getFolderslistforHour(invalidXML)} </b></p>
    `
      let email = this.getHeaderTeamplate() + bodyTemplate + this.getFooterTeamplate();
      MailRequest = {
        "Subject": "Folder Service Count",
        "Body": email,
      }

      //test changes

      // this._empService.sendEmail(MailRequest).subscribe({
      //   next: (res) => {
      //     console.log("Email has been sent");
      //   },
      //   error: console.log,
      // });

    }

  }

  getFolderslistforHour(data: any) {
    var objdata;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].fileCount > 0 && (this.getTwoDigitHours(new Date().getHours() - 1) === data[i].folderName.toString() || this.selectedFrequency === "Month")) {
          objdata = data;
        }
      }
    }
    return objdata != null && objdata != undefined ? objdata.length : 0;
  }

  getBodyTeamplate(data: any) {

  }

  // sendEmail(data: any, subject: any) {
  //   var MailRequest;
  //   if (data) {
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].fileCount > 0 && (this.getTwoDigitHours(new Date().getHours() - 1) === data[i].folderName.toString() || this.selectedFrequency === "Month")) {

  //         console.log(data[i]);
  //         let email = this.getHeaderTeamplate() + this.getBodyTeamplate(subject, data[i]) + this.getFooterTeamplate();

  //         MailRequest = {
  //           "Subject": subject,
  //           "Body": email,
  //         }
  //       }
  //     }
  //     this._empService.sendEmail(MailRequest).subscribe({
  //       next: (res) => {
  //         console.log("Email has been sent");
  //       },
  //       error: console.log,
  //     });
  //   }

  // }

  // getBodyTeamplate(subject: string, data: any) {
  //   var header = `<div style="padding-left:30px">
  //   <p>We have found below files in <span style="background-color:yellow"> <b>${subject}<b> Folder</span></p>
  //   <table class="email-table">
  //     <tr>
  //       <th class="header-class">S.No</th>
  //       <th class="header-class">Folder Name</th>
  //       <th class="header-class">File Name</th>
  //     </tr>`

  //   var body = ""
  //   for (let i = 0; i < data.fileNames.length; i++) {
  //     body += `<tr>
  //    <td class="td-class">${i + 1}</td>
  //     <td class="td-class">${data.folderName}</td>
  //     <td class="td-class">${data.fileNames[i]}</td>
  //     </tr>`
  //   }

  //   var footer = `</table></div>`

  //   return header + body + footer;
  // }

  getHeaderTeamplate() {
    return `<!DOCTYPE html>
    <html>
    <head>
    <style>
    .email-table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    .td-class, .header-class {
      border: 1px solid black;
      text-align: left;
      padding: 8px;
    }
    .header-class {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>
    <div style="padding-bottom:30px;padding-top:10px;">
    <p>Hi <b> Team</b></p>
    </div>`;
  }

  getFooterTeamplate() {
    return `<div style="padding-top:30px">
  <p><b>Regards,</b></p>
  <p>E-Transit Team</p>
  </div>
  </body>
  </html>`
  }


  //sixMonthsAgo: any;
  showMonth: boolean = true;

  openDatePicker(dp: any, event: any) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?: any) {
    this.selectDate = eventData;
    dp.close();
  }

  selectedFrequency: string = "Date";
  radioChange(event: any, data: any) {
    if (event.value === "Month") {
      this.showMonth = false;
      this.selectedFrequency = "Month";
      this.selectDate = null;
    }
    else {
      this.showMonth = true;
      this.selectedFrequency = "Date";
      this.selectDate = null;
    }

    this.DataIn = new MatTableDataSource();
    this.DataProcessed = new MatTableDataSource();
    this.InvalidXML = new MatTableDataSource();
    this.InsertFailed = new MatTableDataSource();
  }

  disableGetdate(): boolean {
    if (this.selectDate)
      return false;
    else
      return true;
  }

  getFoldername() {
    if (this.selectedFrequency === "Month")
      return "Days";
    else
      return "Hours";
  }

}
