import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ContactComponent } from '../contact/contact/contact.component';
import { ProductViewDetailComponent } from '../product/product-view-detail/product-view-detail.component';
import { CartDetailComponent } from '../cart/cart-detail/cart-detail.component';
import { SignUpComponent } from '../sign-up/sign-up/sign-up.component';
import { OrderStepComponent } from '../order/order-step/order-step.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      // {
      //   path: 'employee',
      //   component: EmployeeListComponent
      // },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'product-list/:product-group-id',
        component: ProductListComponent
      },
      {
        path: 'product-list/:product-group-id/:id',
        component: ProductViewDetailComponent
      },
      {
        path: 'cart',
        component: CartDetailComponent,

      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'order',
        component: OrderStepComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
