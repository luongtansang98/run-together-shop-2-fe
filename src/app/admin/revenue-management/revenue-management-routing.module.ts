import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenueListComponent } from './revenue-list/revenue-list.component';


const routes: Routes = [
  {
    path: '',
    component: RevenueListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenueManagementRoutingModule { }
