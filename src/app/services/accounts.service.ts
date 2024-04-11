import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _http: HttpClient) {

  }
 
  apiUrl:string = environment.API_URL;
   
  getAccountsList(): Observable<any> {
    return this._http.get(this.apiUrl+'Accounttype');
  }

  getddlAccountTypes(): Observable<any> {
    return this._http.get(this.apiUrl+'Accounttype');
  }

  createNewAccount(data:any): Observable<any> {
    return this._http.post(this.apiUrl+'Accounts',data);
  }


  getddltypeOfFee(): Observable<any> {
    return this._http.get(this.apiUrl+'typeOfFee');
  }

  getddlpaymentMethod(): Observable<any> {
    return this._http.get(this.apiUrl+'paymentMethod');
  }

  getddloverviewMethod(): Observable<any> {
    return this._http.get(this.apiUrl+'overviewMethod');
  }

  getddlStates(): Observable<any> {
    return this._http.get(this.apiUrl+'states');
  }
}
