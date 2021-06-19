import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { HelperModule } from 'src/app/helper/helper.module';



@NgModule({
  declarations: [OrderListComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    HelperModule,
    OrderManagementRoutingModule
  ]
})
export class OrderManagementModule { }
