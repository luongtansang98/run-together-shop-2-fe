import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CartDetailComponent],
  imports: [

    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class CartModule { }
