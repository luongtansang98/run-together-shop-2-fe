import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingComponent } from './paging/paging.component';
import { VndOnlyDirective } from './directive/vnd-only.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const modules = [BsDatepickerModule];

@NgModule({
  declarations: [PagingComponent, VndOnlyDirective],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    PagingComponent,
    VndOnlyDirective,
    modules
  ]
})
export class HelperModule { }
