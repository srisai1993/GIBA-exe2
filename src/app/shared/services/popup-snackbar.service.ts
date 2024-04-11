import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupSnackbarService {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string,status:string="") {
    this._snackBar.open(message, "ok", {
     // duration: 1000,
      verticalPosition: 'bottom',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
  closeSnackBar(){
    this._snackBar.dismiss();
  }
}
