import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementFormComponent } from './account-management-form/account-management-form.component';
import { AccountManagementListComponent } from './account-management-list/account-management-list.component';
import { BpassComponent } from './bpass.component';

const routes: Routes = [
      {
        path:'bpass/accounts-list',component:AccountManagementListComponent
      },
      {
        path:'bpass/account-form',component:AccountManagementFormComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class BpassRoutingModule { }
