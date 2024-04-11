import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';






@Component({
  selector: 'app-view-chart',
  templateUrl: './view-chart.component.html',
  styleUrls: ['./view-chart.component.scss']
})
export class ViewChartComponent implements OnInit {

  energySources : any;
  countriesInfo: any;
  urlId:any;
  ngOnInit(): void {
    this.getReportsList();
    this.urlId = this._route.snapshot.paramMap.get('id');
    this.countriesInfo = this._reportsService.getCountriesInfo();
    this.energySources = this._reportsService.getEnergySources();
  }


  constructor(
    private _reportsService: ReportsService,
    private _route:ActivatedRoute
  ){}
  
  types: string[] = ['line', 'stackedline', 'fullstackedline'];
  
  jsonarry :any =[];
  transactionType: any;
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
    //this.piechartData = this.jsonarry;
    this.transactionType = this._reportsService.getTransactionTypes();

    
  }
  
  


}
