import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewDetailComponent } from './product-view-detail/product-view-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelperModule } from '../helper/helper.module';
import { LoginToBuyComponent } from './login-to-buy/login-to-buy.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ProductListComponent, ProductViewDetailComponent, LoginToBuyComponent],
  imports: [
    RouterModule,
    NgxGalleryModule,
    CommonModule,
    FormsModule,
    HelperModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [LoginToBuyComponent],
  exports: [ LoginToBuyComponent ]
})
export class ProductModule { }
