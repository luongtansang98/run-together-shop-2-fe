import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionCruComponent } from './promotion-cru/promotion-cru.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';


const routes: Routes = [
  {
    path: '',
    component: PromotionListComponent
  },
  {
    path: 'create',
    component: PromotionCruComponent,
  },
  {
    path: ':promotionId/edit',
    component: PromotionCruComponent,
  },
  {
    path: ':promotionId',
    component: PromotionDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionManagementRoutingModule { }
