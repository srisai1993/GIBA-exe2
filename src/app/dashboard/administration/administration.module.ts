import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { EmpCardAccessComponent } from './emp-card-access/emp-card-access.component';
import { FareScheduleManagementComponent } from './fare-schedule-management/fare-schedule-management.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { EmpCardFormComponent } from './emp-card-form/emp-card-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmpCardAccessComponent,
    EmpCardFormComponent,
    FareScheduleManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule,
  ]
})
export class AdministrationModule { }
