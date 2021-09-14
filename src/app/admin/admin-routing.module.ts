import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: BlankPageComponent,
      },
      {
        path: 'product',
        loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule)
      },
      {
        path: 'promotion',
        loadChildren: () => import('./promotion-management/promotion-management.module').then(m => m.PromotionManagementModule)
      },
      {
        path: 'customer-list',
        loadChildren: () => import('./customer-management/customer-management.module').then(m => m.CustomerManagementModule)
      },
      {
        path: 'revenue-list',
        loadChildren: () => import('./revenue-management/revenue-management.module').then(m => m.RevenueManagementModule)
      },
      {
        path: 'order-list',
        loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule)
      },
      {
        path: 'warehouse-list',
        loadChildren: () => import('./warehouse-management/warehouse-management.module').then(m => m.WarehouseManagementModule)
      },
      {
        path: 'employee-list',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
    ],
    canActivate: [AuthGuard],
    data: { expectedRoles: ['ADMIN','STAFF','CUSTOMER'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
