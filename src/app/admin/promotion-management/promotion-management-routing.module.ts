import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';


const routes: Routes = [
  {
    path: '',
    component: PromotionListComponent
  },
  {
    path: ':promotionId',
    component: PromotionDetailComponent,

  },
  {
    path: ':promotionId/edit',
    component: PromotionEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionManagementRoutingModule { }
