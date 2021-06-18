import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HelperModule } from 'src/app/helper/helper.module';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailComponent],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HelperModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
