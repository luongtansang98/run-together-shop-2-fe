import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingComponent } from './paging/paging.component';
import { VndOnlyDirective } from './directive/vnd-only.directive';



@NgModule({
  declarations: [PagingComponent, VndOnlyDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PagingComponent,
    VndOnlyDirective
  ]
})
export class HelperModule { }
