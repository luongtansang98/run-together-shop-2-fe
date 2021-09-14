import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'create',
    component: ProductDetailComponent,
    data: { action: 'create' }
  },
  {
    path: ':id/edit',
    component: ProductDetailComponent,
    data: { action: 'edit' }
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    data: { action: 'detail' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule{ }
