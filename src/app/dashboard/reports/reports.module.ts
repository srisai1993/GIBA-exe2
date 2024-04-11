import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './reports.component';
import { ReportsGridComponent } from './reports-grid/reports-grid.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';
import { AuditorReportComponent } from './auditor-report/auditor-report.component';
import { DxChartModule, DxCheckBoxModule, DxDataGridModule, DxMenuModule, DxPieChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { ViewChartComponent } from './view-chart/view-chart.component';


@NgModule({
  declarations: [
    ReportsComponent,
    ReportsGridComponent,
    ViewreportsComponent,
    AuditorReportComponent,
    ViewChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
   
  ]
})
export class ReportsModule { }
