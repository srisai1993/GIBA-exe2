import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpcardserviceService } from 'src/app/services/empcardservice.service';
import { PopupSnackbarService } from 'src/app/shared/services/popup-snackbar.service';

@Component({
  selector: 'app-emp-card-form',
  templateUrl: './emp-card-form.component.html',
  styleUrls: ['./emp-card-form.component.scss']
})
export class EmpCardFormComponent implements OnInit {

  empForm: FormGroup;

  boothpermission: string[] = [
    'Lane Access',
    'Unattended Mode',
  ];

  softwarepermission: string[] = [
    'B-Pass Management',
    'Administration',
    'Cash Management',
  ];
   
  reportexecution: string[] = [
    'Auditor Reports',
    'B-Pass Reports',
    'Supervisor Reports',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmpcardserviceService,
    private _dialogRef: MatDialogRef<EmpCardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _popUpService: PopupSnackbarService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      boothpermission: '',
      softwarepermission: '',
      reportexecution: '',
      cardnumber:'',
      pin:'',
      postalcode:'',
      phone:''
      
    });
  }
  viewOrEditMode:any;
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.viewOrEditMode =this._empService.viewOrEditMode;
    console.log(this.viewOrEditMode)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._popUpService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._popUpService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
