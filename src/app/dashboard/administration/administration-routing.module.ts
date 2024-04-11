import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpCardAccessComponent } from './emp-card-access/emp-card-access.component';

const routes: Routes = [
  {
    path:'empcardaccess',component:EmpCardAccessComponent
  },
  {
    path:'fareschedulemanagement',component:EmpCardAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
