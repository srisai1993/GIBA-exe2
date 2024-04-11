import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PopupSnackbarService } from './shared/services/popup-snackbar.service';
import { LoaderService } from './shared/services/loader.service';

@Injectable()
export class HttpinterceptorsInterceptor implements HttpInterceptor {

  apiURL!:string;
  constructor(private _popUpService: PopupSnackbarService,private loaderService: LoaderService) {
   this.apiURL = "http://192.9.0.201:900/GibaApi/api/"
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.indexOf(this.apiURL)>-1){
      if(!request.headers.has("Content-Type")){ //&& request .method!= "POST"){
        request =request.clone({
          headers:request.headers.set("Content-Type","application/json"),
        });
      }
      request = request.clone({
        headers:request.headers.set("Accept","application/json"),
      });
      request = request.clone({
        headers:request.headers.set("Cache-Control","no-cache"),
      });
      request = request.clone({
        headers:request.headers.set("Pragma","no-cache"),
      });

    }
    this._popUpService.closeSnackBar();
    //return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors globally
        this.loaderService.hide();
        console.error('HTTP error occurred:', error);
        this._popUpService.openSnackBar(error.message,"error");
        return throwError(error);

      })
    );
  }
}
