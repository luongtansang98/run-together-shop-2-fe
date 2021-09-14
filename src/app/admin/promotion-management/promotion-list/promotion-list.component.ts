import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagingModel } from 'src/app/utilities/paging-model.model';
import { ProductDTO } from '../../product-management/product-management.model';
import { PromotionDTO } from '../promotion-management.model';
import { PromotionManagementService } from '../promotion-management.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {
  searchModel = {
    CodeOrName: '',
    PromotionTypeId: null ,
    IsDisable: null,
    CanApplyForAll: null,
    StartTime: null,
    EndTime: null,
    page: 1
  };
  isLoad = false;
  pagingResult: PagingModel = new PagingModel();
  pageCount: number;
  promotions: PromotionDTO[] = [];
  constructor(private promotionService: PromotionManagementService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }
  getList(event?: any) {
    if (!event) { this.searchModel.page = 1; } else { this.searchModel.page = event; }
    this.isLoad = true;
    window.scroll(0, 0);
    setTimeout(() => {
      this.promotionService.getList(this.searchModel)
        .subscribe(
          (res: any) => {
            this.pagingResult = res;
            this.promotions = res.results as PromotionDTO[] || [];
            this.pageCount = res.pageCount as number;
          },
          null,
          () => this.isLoad = false
        );
    }, 1000);
  }

  goToDetail(promotionId) {
    this.router.navigate([`${promotionId}`]);
  }
  createPromotion() {
    this.router.navigateByUrl('create');
  }
}
