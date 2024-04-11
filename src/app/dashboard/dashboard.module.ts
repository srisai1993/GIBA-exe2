import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdministrationModule } from './administration/administration.module';
import { ReportsModule } from './reports/reports.module';
import { BpassModule } from './bpass/bpass.module';
import { EmpCardAccessComponent } from './administration/emp-card-access/emp-card-access.component';
import { SharedModule } from '../shared/modules/shared/shared.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    AdministrationModule,
    ReportsModule,
    BpassModule,
  ]
})
export class DashboardModule { }
