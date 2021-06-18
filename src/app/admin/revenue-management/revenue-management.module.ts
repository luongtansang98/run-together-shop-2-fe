import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueListComponent } from './revenue-list/revenue-list.component';
import { RevenueManagementRoutingModule } from './revenue-management-routing.module';



@NgModule({
  declarations: [RevenueListComponent],
  imports: [
    CommonModule,
    RevenueManagementRoutingModule
  ]
})
export class RevenueManagementModule { }
