import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../product-management.service';
import { PagingModel } from 'src/app/utilities/paging-model.model';
import { ProductDTO } from '../product-management.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchModel = {
    CodeOrNameProduct: '',
    GroupProductId: '',
    CategoryId: '',
    page: 1
  };
  isLoad: boolean = false;
  pagingResult: PagingModel = new PagingModel();
  pageCount: number;
  products: ProductDTO[] = [];
  constructor(private productService: ProductManagementService) { }

  ngOnInit() {
    this.getList();
  }
  getList(event?: any) {
    if (!event) this.searchModel.page = 1;
    else this.searchModel.page = event;
    this.isLoad = true;
    window.scroll(0, 0);
    setTimeout(() => {
      this.productService.getList(this.searchModel)
        .subscribe(
          (res: any) => {
            this.pagingResult = res;
            this.products = res.results as ProductDTO[] || [];
            this.pageCount = res.pageCount as number;
          },
          null,
          () => this.isLoad = false
        );
    }, 1000);
  }

  getDescription(id: any, type: any) {
    if (type == 1) {
      if (id == 1)
        return "Nam";
      else if (id == 2)
        return "Nữ";
      else return "Trẻ em";
    }
    else if (type == 2) {
      if (id == 1)
        return "Cam";
      else if (id == 2)
        return "Đỏ";
      else return "Trắng";
    }
    else if (type == 3) {
      if (id == 1)
        return "Thể thao";
      else if (id == 2)
        return "Gym";
      else return "Chạy bộ";
    }
  }

}
