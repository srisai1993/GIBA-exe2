import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule, DxMenuModule, DxPieChartModule, DxChartModule } from 'devextreme-angular';
import { ReportsRoutingModule } from 'src/app/dashboard/reports/reports-routing.module';
import { AlertConfirmationComponent } from '../../components/alert-confirmation/alert-confirmation.component';
import { LoaderComponent } from '../../components/loader/loader.component';

const sharedModules= [
  MaterialModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ReportsRoutingModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxMenuModule,
  DxPieChartModule,
  DxChartModule,
]

const sharedComponents=[
  AlertConfirmationComponent
]

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules],
  exports:[...sharedModules]
})
export class SharedModule { }
