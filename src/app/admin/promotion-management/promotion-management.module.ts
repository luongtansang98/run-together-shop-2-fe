import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { HelperModule } from 'src/app/helper/helper.module';
import { PromotionManagementRoutingModule } from './promotion-management-routing.module';



@NgModule({
  declarations: [PromotionListComponent, PromotionDetailComponent, PromotionEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    HelperModule,
    PromotionManagementRoutingModule
  ]
})
export class PromotionManagementModule { }
