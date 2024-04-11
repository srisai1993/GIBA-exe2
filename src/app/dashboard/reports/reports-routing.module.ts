import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditorReportComponent } from './auditor-report/auditor-report.component';
import { ReportsGridComponent } from './reports-grid/reports-grid.component';
import { ReportsComponent } from './reports.component';
import { ViewChartComponent } from './view-chart/view-chart.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';

const routes: Routes = [
  {
    path:'reportslist',component:ReportsGridComponent
  },
  {
    path:'reportdetails',component:ReportsComponent
  },
  {
    path:'viewreports',component:ViewreportsComponent
  },
  {
    path:'auditorreports',component:AuditorReportComponent
  },
  {
    path:'viewcharts/:id',component:ViewChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
