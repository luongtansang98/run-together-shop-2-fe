import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductViewDetailComponent } from './product-view-detail/product-view-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelperModule } from '../../helper/helper.module';
import { ProductImagesDetailComponent } from './product-images-detail/product-images-detail.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductManagementRoutingModule } from './product-management-routing.module';



@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductViewDetailComponent, ProductImagesDetailComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    HelperModule,
    ProductManagementRoutingModule
  ]
})
export class ProductManagementModule { }
