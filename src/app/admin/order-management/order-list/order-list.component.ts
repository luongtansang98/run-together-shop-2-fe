import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentType } from 'src/app/utilities/enum/enum-type.model';
import { PagingModel } from 'src/app/utilities/paging-model.model';
import { ProductDTO } from '../../product-management/product-management.model';
import { ProductManagementService } from '../../product-management/product-management.service';
import { OrderDTO } from '../order-management.model';
import { OrderManagementService } from '../order-management.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  searchModel = {
    OrderCode: '',
    OrderStatus: '',
    DeliveryType: '',
    PaymentType: '',
    page: 1
  };
  isLoad: boolean = false;
  pagingResult: PagingModel = new PagingModel();
  pageCount: number;
  orders: OrderDTO[] = [];


  testReset7: any;
  testReset8: any;
  testReset9: any;
  testReset1: any;
  testReset2: any;
  testReset3: any;
  constructor(private orderService: OrderManagementService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }
  getList(event?: any) {
    if (!event) this.searchModel.page = 1;
    else this.searchModel.page = event;
    this.isLoad = true;
    window.scroll(0, 0);
    setTimeout(() => {
      this.orderService.getList(this.searchModel)
        .subscribe(
          (res: any) => {
            this.pagingResult = res;
            this.orders = res.results as OrderDTO[] || [];
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
  goToDetail(orderId) {
    this.router.navigate([`/order-list/${orderId}`]);
  }
}
