import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { HelperModule } from 'src/app/helper/helper.module';
import { PromotionManagementRoutingModule } from './promotion-management-routing.module';
import { PromotionCruComponent } from './promotion-cru/promotion-cru.component';
@NgModule({
  declarations: [PromotionListComponent, PromotionDetailComponent, PromotionCruComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    HelperModule,
    PromotionManagementRoutingModule,
  ]
})
export class PromotionManagementModule { }
