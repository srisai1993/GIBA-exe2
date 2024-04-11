import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpcardserviceService {

  constructor(private _http: HttpClient) {}
  viewOrEditMode:any='view';

  apiUrl:string = environment.API_URL;

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.apiUrl+'employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(this.apiUrl+`employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.apiUrl+'employees');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(this.apiUrl+`employees/${id}`);
  }

  getDataInFilesList(createDate:string,selectedFrequency:string): Observable<any> {
    return this._http.get(`https://localhost:44341/Folder?createDate=${createDate}&frequency=${selectedFrequency}`);
  }
  getDataProcessedFilesList(createDate:string): Observable<any> {
    return this._http.get(`https://localhost:44341/Folder?createDate=${createDate}`);
  }
  getInsertFailedFoldersList(createDate:string): Observable<any> {
    return this._http.get(`https://localhost:44341/Folder?createDate=${createDate}`);
  }
  getInvalidXMLFoldersList(createDate:string): Observable<any> {
    return this._http.get(`https://localhost:44341/Folder?createDate=${createDate}`);
  }
  

  sendEmail(emailBody:any): Observable<any> {
    return this._http.post(`https://localhost:44341/Folder/Send`,emailBody);
  }
}
