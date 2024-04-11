import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


interface TransactionType {
  transactionType: string;
  due: string;
}

interface CountryInfo {
  lane: string;
  due: number;
  cash: number;
  paid: number;
  balance: number;
}

interface EnergyDescription {
  value: string;
  name: string;
}

const energySources: EnergyDescription[] = [
  { value: 'due', name: 'Due' },
  { value: 'cash', name: 'Cash' },
  { value: 'paid', name: 'Paid' },
  { value: 'balance', name: 'Balance' },
];

const countriesInfo: CountryInfo[] = [{
  lane: 'Lane 01',
  due: 71.2,
  cash: 910.4,
  paid: 483.2,
  balance: 564.3,
}, {
  lane: 'Lane 02',
  due: 72.5,
  cash: 223.6,
  paid: 36,
  balance: 956.9,
}, {
  lane: 'Lane 03',
  due: 47.7,
  cash: 149.4,
  paid: 432.3,
  balance: 105,
}, {
  lane: 'Lane 04',
  due: 17.9,
  cash: 283.6,
  paid: 61.8,
  balance: 120.8,
}, {
  lane: 'Lane 05',
  due: 14.4,
  cash: 86.4,
  paid: 25.1,
  balance: 204.8,
}, {
  lane: 'Lane 06',
  due: 6.6,
  cash: 101.7,
  paid: 92.7,
  balance: 85.7,
}];



const transactionTypes: TransactionType[] = [{
  transactionType: 'Violation Transaction',
  due: '12',
}, {
  transactionType: 'Cash Transaction',
  due: '27',
}, {
  transactionType: 'Non-Rev Auto',
  due: '17',
}, {
  transactionType: 'Turnaround Transaction',
  due: '37',
}, {
  transactionType: 'Emergency Transaction',
  due: '46',
}, {
  transactionType: 'Lane Open',
  due: '54',
}, {
  transactionType: 'Lane Close',
  due:' 2',
}, {
  transactionType: 'Shift End',
  due: '55',
}];

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  constructor(private _http: HttpClient) {}

  apiUrl:string = environment.API_URL;
  getReportsList(): Observable<any> {
    return this._http.get('http://localhost:3000/reports');
    // return this._http.get(this.apiUrl+'reports');
  }

  getTransactionTypes(): TransactionType[] {
    return transactionTypes;
  }
  jsonarry :any =[];
  viewReportDetails(): Observable<any> {
    return this._http.get('http://localhost:3000/reports');
    // for(var i=0;i<50;i++)
    // {
    //   this.jsonarry.push({
    // 'transactionType':i+'lane Open',
    // 'lanes':'Lane 0'+i,
    // 'employee':'Employee'+i,
    // 'laneMode':'Mode'+i,
    // 'paymentMethod':'Cash',
    // 'due':55+i,
    // 'paid':789+i
    //   })
    // }
    // return this.jsonarry;
  }

  getEnergySources(): EnergyDescription[] {
    return energySources;
  }

  getCountriesInfo(): CountryInfo[] {
    return countriesInfo;
  }



  
}
