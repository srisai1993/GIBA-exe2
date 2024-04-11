import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-confirmation',
  templateUrl: './alert-confirmation.component.html',
  styleUrls: ['./alert-confirmation.component.scss']
})
export class AlertConfirmationComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
