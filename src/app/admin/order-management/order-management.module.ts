import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { HelperModule } from 'src/app/helper/helper.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderContainerComponent } from './order-container.component';
import { OrderEditComponent } from './order-edit/order-edit.component';



@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent, OrderContainerComponent, OrderEditComponent],
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
