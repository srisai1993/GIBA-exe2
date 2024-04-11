import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpassRoutingModule } from './bpass-routing.module';
import { AccountManagementListComponent } from './account-management-list/account-management-list.component';
import { AccountManagementFormComponent } from './account-management-form/account-management-form.component';
import { BpassComponent } from './bpass.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    AccountManagementListComponent,
    AccountManagementFormComponent,
    BpassComponent
  ],
  imports: [
    CommonModule,
    BpassRoutingModule,
    SharedModule
  ]
})
export class BpassModule { }
