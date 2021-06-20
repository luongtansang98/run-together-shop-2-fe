import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderContainerComponent } from './order-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: OrderContainerComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: OrderListComponent
  //     },
  //     {
  //       path: ':orderId',
  //       component: OrderDetailComponent
  //     }
  //   ]
  // },
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: ':orderId',
    component: OrderDetailComponent,

  },
  {
    path: ':orderId/edit',
    component: OrderEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
