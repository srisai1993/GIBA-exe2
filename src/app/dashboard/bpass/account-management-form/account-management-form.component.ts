import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetails } from 'src/app/models/account-details';
import { AccountsService } from 'src/app/services/accounts.service';
import { ReportsService } from 'src/app/services/reports.service';
import { AlertConfirmationComponent } from 'src/app/shared/components/alert-confirmation/alert-confirmation.component';
import { LanesCheckBox } from '../../reports/reports.component';

@Component({
  selector: 'app-account-management-form',
  templateUrl: './account-management-form.component.html',
  styleUrls: ['./account-management-form.component.scss']
})
export class AccountManagementFormComponent {

  constructor(
    private _accountsService: AccountsService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) {

  }

  acountTypeGroup: AccountDetails = {
    acountType: '',
    typeofFee: '',
    adminFee: '',
    openingBalance: '',
    paymentMethod: '',
    threshold: '',
    expiration: '',
  }

  public acountTypeForm = this._formBuilder.group({
    acountType: new FormControl('', Validators.required),
    typeofFee: new FormControl({ value: '', disabled: true }, Validators.required),
    adminFee: new FormControl({ value: '', disabled: true }, Validators.required),
    openingBalance: new FormControl({ value: '', disabled: true }, Validators.required),
    paymentMethod: new FormControl({ value: '', disabled: true }, Validators.required),
    threshold: new FormControl({ value: '', disabled: true }, Validators.required),
    expiration: new FormControl({ value: new Date(), disabled: true }, Validators.required),
  });

  public acountHolderInfoForm = this._formBuilder.group({
    accountHolder: new FormControl({ value: '', disabled: true }, Validators.required),
    firstName: new FormControl({ value: '', disabled: true }, Validators.required),
    lastName: new FormControl({ value: '', disabled: true }, Validators.required),
    business: new FormControl({ value: '', disabled: true }, Validators.required),
    address1: new FormControl({ value: '', disabled: true }, Validators.required),
    address2: new FormControl({ value: '', disabled: true }, Validators.required),
    city: new FormControl({ value: '', disabled: true }, Validators.required),
    state: new FormControl({ value: '', disabled: true }, Validators.required),
    postalCode: new FormControl({ value: '', disabled: true }, Validators.required),
    fax: new FormControl({ value: '', disabled: true }, Validators.required),
    contactPhone: new FormControl({ value: '', disabled: true }, Validators.required),
    extension: new FormControl({ value: '', disabled: true }, Validators.required),
    mobilePhone: new FormControl({ value: '', disabled: true }, Validators.required),
    smsAlert: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    emailAlert: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  public creditCardForm = this._formBuilder.group({
    method: new FormControl({ value: '', disabled: true }, Validators.required),
    draftMethod: new FormControl({ value: '', disabled: true }, Validators.required),
    verifyName: new FormControl({ value: '', disabled: true }, Validators.required),
    cardHolderName: new FormControl({ value: '', disabled: true }, Validators.required),
    address1: new FormControl({ value: '', disabled: true }, Validators.required),
    address2: new FormControl({ value: '', disabled: true }, Validators.required),
    city: new FormControl({ value: '', disabled: true }, Validators.required),
    state: new FormControl({ value: '', disabled: true }, Validators.required),
    postalCode: new FormControl({ value: '', disabled: true }, Validators.required),
    cardType: new FormControl({ value: '', disabled: true }, Validators.required),
    cardNumber: new FormControl({ value: '', disabled: true }, Validators.required),
    expiration: new FormControl({ value: '', disabled: true }, Validators.required),
    security: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  todayDate: any = new Date();
  plazaslist: string[] = [
    'GIBA Plaza',
    'LELA Plaza',
  ];

  // accountTypes: any[] = [
  //  {id:1,name: 'Standard'},
  //  {id:2,name:'Annual Pass'},
  // ];

  overviewMethod: string[] = [
    'In-Person',
    'Auto Replenishment : CC',
    'Info On-File'
  ];
  cardTypes: string[] = [
    'Visa',
    'Master Card',
    'Discover',
    'American Express',
    'Credit Card'
  ];

  paymentMethods: any[] = [
    {id:98,name:  'Cash'},
    {id:96,name:  'Check'},
    {id:95,name:  'Visa'},
    {id:99,name:  'Master Card'},
    {id:91,name:  'Discover'},
    {id:92,name:  'American Express'},
    {id:93,name:  'Credit Card'},
  ];

  states: string[] = [
    'FL-Florida',
    'GA-GEORGIA',
    'NY-Newyork',
    'AK-Alaska',
    'AL-Alabama',
    'AZ-Arizona',
    'CA-California'
  ];

  typeofFee: any[] = [
    {id:1,name:  'Admin Fee'},
  ];

  disableAccountButtons: any = true;
  disableCCDetailsButtons: any = true;

  //dropdowns
  ddlAccountTypes:any;
  ngOnInit(): void {
     this.loadAllDropdowns();
  }

  isAccountType: any = true;
  onChangeAccountType(event: any) {
    var accountName = this.acountTypeForm.controls;
    var holderInfo = this.acountHolderInfoForm.controls;
    var ccInfo=this.creditCardForm.controls;
    if(event.value)
    {
    this.disableAccountForms(accountName,event.value.avi_Account_Desc);
    this.disableAccountForms(holderInfo,event.value.avi_Account_Desc);
    this.disableAccountForms(ccInfo,event.value.avi_Account_Desc);
    }
    else{
    this.disableAccountForms(accountName,event.value);
    this.disableAccountForms(holderInfo,event.value);
    this.disableAccountForms(ccInfo,event.value);
    }
  }


  onMethodChange(event: any) {
    
    var ccInfo=this.creditCardForm.controls;
    for (const name in ccInfo) {
      if (event.value === "In-Person") {
        if (name == "draftMethod" || name == "method")
        this.creditCardForm.get(name)?.enable();
        else
        this.creditCardForm.get(name)?.disable();

        this.disableCCDetailsButtons=true;
      }
      else if (event.value === "Auto Replenishment : CC" || event.value === "Info On-File") {
        this.creditCardForm.get(name)?.enable();
        this.disableCCDetailsButtons=false;
      }
      else if (event.value === undefined) {
        if (name != "method")
        this.creditCardForm.get(name)?.disable();
        this.disableCCDetailsButtons=true;

      }
    }
  }

    disableAccountForms(data:any,event:any){
      for (const name in data) {
        if (event === "Standard") {

              this.acountHolderInfoForm.get(name)?.enable();
              this.disableAccountButtons =false;

          if (name != "acountType" && name != "expiration")
              this.acountTypeForm.get(name)?.enable();
          
          if (name == "method")
              this.creditCardForm.get(name)?.enable();

          if (name == "expiration")
              this.acountTypeForm.get(name)?.disable();
        }
        else if (event === "Annual Pass") {

         
            this.acountTypeForm.get(name)?.enable();

            if (name == "threshold")
            this.acountTypeForm.get(name)?.disable();

            if (name == "method")
            this.creditCardForm.get(name)?.enable();

            this.disableAccountButtons =false;
        }
        else if (event === undefined) {
          
          if (name != "acountType")
            this.acountTypeForm.get(name)?.disable();
            this.disableAccountButtons =true;
            this.acountHolderInfoForm.get(name)?.disable();
            this.creditCardForm.get(name)?.disable();
        }
      }

    } 

  openDialog(data: any, width: any): void {
    this._dialog.open(AlertConfirmationComponent, {
      width: width,
      data: data
    });
  }

  onchkSMS(event: any) {
    if (event.checked) {
      this.openDialog('To receive SMS alerts a Mobile Phone Number must be provided', '400px');
    }
  }

  onchkEmail(event: any) {
    if (event.checked) {
      this.openDialog('To receive Email alerts an  Email Address must be provided', '400px');
    }
  }

  loadAllDropdowns(){
    this.getddlAccountTypes();
  }

  getddlAccountTypes() {
    this._accountsService.getddlAccountTypes().subscribe({
      next: (res) => {
       this.ddlAccountTypes =res;
       //console.log(res)
      },
      error: console.log,
    });
  }

  onOpenNewAccount(){
    //var accounttypeid = this.acountTypeForm.value.acountType;
    let OpeningTransaction ={
      "OpeningBalance":this.acountTypeForm.value.openingBalance,
      "ContactProfile":{
       "AccountTypeId": 2,
       "FirstName":this.acountHolderInfoForm.value.firstName,
       "LastName":this.acountHolderInfoForm.value.lastName,
       "CompanyName":this.acountHolderInfoForm.value.business,
       "State":this.acountHolderInfoForm.value.state
      },
      "PaymentProfile":{
        "Amount":this.acountTypeForm.value.openingBalance,
        "FullName":this.creditCardForm.value.cardHolderName,
        "CardNumber":this.creditCardForm.value.cardNumber?.toString(),
        "SecurityCode":this.creditCardForm.value.security?.toString(),
        "Replenish_Method":this.creditCardForm.value.cardType?.toString(),
        "Address":{
          "AddressLine1":this.creditCardForm.value.address1,
          "City":this.creditCardForm.value.city,
          "State":this.creditCardForm.value.state,
          "Country":"USA"
        }
      },
      "AccountOpeningTransaction":{
        "UpdateType": this.acountTypeForm.value.typeofFee,
        "Amount": this.acountTypeForm.value.adminFee,
        "PaymentType":this.acountTypeForm.value.paymentMethod?.toString()
      }
    }


    var json = {
      "OpeningBalance": 10,
      "ContactProfile":
      {
         "AccountTypeId" : 4,
          "FirstName" : "Test",
          "LastName" : "User",
          "CompanyName" : "Test",
          "State": "PA - Pennsylvania "
      },
      "PaymentProfile":
      {
          "Amount": 20.00,
          "FullName": "Test User",
          "CardNumer": "4111111111111111",
          "SecurityCode": "123",
          "Replenish_Method": "Credit Card" ,
          "Address"        : {
           "AddressLine1": "408 E4th Street",
           "City": "Bridgeport",
            "State": "PA - Pennsylvania",
             "Country": "USA"
         }
      },
      "AccountOpeningTransaction": {        
          "UpdateType": 1,
          "Amount": 10.00,
          "PaymentType": "98"
      }
  }
  
   console.log(json);
   
   //OpeningTransaction
   this._accountsService.createNewAccount(json).subscribe({
    next: (res) => {
     //this.ddlAccountTypes =res;
     console.log(res)
    },
    error: console.log,
  });

  }
}
