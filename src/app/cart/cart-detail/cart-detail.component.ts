import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/sign-up/customer.service';
import { CartDTO } from '../cart.model';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  totalObj = 0;
  totalBill = 0;
  advancePrice = 0;
  lstResult: CartDTO[] = [];
  constructor(private toastr: ToastrService,
              private cartService: CartService,
              private router: Router,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.getList();
  }
  getTotal(up: boolean, ind: number, isInput: boolean, event?) {
    if (isInput) {
      if (Number(event) <= 0) {
        setTimeout(() => {
          this.lstResult[ind].quantity = 1;
        }, 100);
      } else {
        setTimeout(() => {
          this.lstResult[ind].quantity = event;
        }, 100);

      }
      // tslint:disable-next-line:max-line-length
      this.lstResult[ind].totalPrice = (Number(event) <= 0 ? 1 : event) * (this.lstResult[ind].priceWithDiscount && Number(this.lstResult[ind].priceWithDiscount) > 0 ? this.lstResult[ind].priceWithDiscount :  this.lstResult[ind].price);
      this.totalBill = this.lstResult.reduce((sum, current) => sum + current.totalPrice, 0);
    } else if (up) {
      this.lstResult[ind].quantity++;
      // tslint:disable-next-line:max-line-length
      this.lstResult[ind].totalPrice = this.lstResult[ind].totalPrice + (this.lstResult[ind].priceWithDiscount && Number(this.lstResult[ind].priceWithDiscount) > 0 ? this.lstResult[ind].priceWithDiscount :  this.lstResult[ind].price);
      this.totalBill = this.lstResult.reduce((sum, current) => sum + current.totalPrice, 0);
    } else {
      if (this.lstResult[ind].quantity <= 0) {
        Swal.fire({
          title: 'B???n mu???n x??a s???n ph???m n??y?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'X??a',
          cancelButtonText: 'H???y',
        }).then((result) => {
          if (result.isConfirmed) {
            const customerId = Number(this.customerService.getAuthCustomer().customerId);
            if (customerId === 0 || customerId == null) {
              this.toastr.error('Vui l??ng ????ng nh???p ????? xem gi??? h??ng');
              return;
            }
            this.cartService.deleteItem(customerId, this.lstResult[ind].id)
              .subscribe(
                (res: any) => {
                  this.toastr.success('X??a th??nh c??ng!');
                },
                err => this.toastr.error('C?? l???i khi x??a s???n ph???m'),
                () => { this.getList(); }
              );
          }
        });
      } else {
        this.lstResult[ind].quantity--;
        // tslint:disable-next-line:max-line-length
        this.lstResult[ind].totalPrice = this.lstResult[ind].totalPrice - (this.lstResult[ind].priceWithDiscount && Number(this.lstResult[ind].priceWithDiscount) > 0 ? this.lstResult[ind].priceWithDiscount :  this.lstResult[ind].price);
        this.totalBill = this.lstResult.reduce((sum, current) => sum + current.totalPrice, 0);
      }
    }
  }
  public createImgPath = (serverPath: string) => {
    return `http://localhost:52070/${serverPath}`;
  }
  getList(event?: any) {
    let customerId = 0;
    if (this.customerService.getAuthCustomer()) {
      customerId = Number(this.customerService.getAuthCustomer().customerId);
    }
    if (customerId === 0 || customerId == null) {
      this.toastr.error('Vui l??ng ????ng nh???p ????? xem gi??? h??ng');
      return;
    }
    setTimeout(() => {
      this.cartService.getList(customerId)
        .subscribe(
          (res: any) => {
            this.lstResult = res as CartDTO[] || [];
            this.totalObj = res.length;
            this.totalBill = res.reduce((sum, current) => sum + current.totalPrice, 0);
          },
          null,
          () => { }
        );
    }, 1000);

  }
  deleteItem(ind: number) {
    if (ind === 0) {
      return this.toastr.error('Sai Sai Sai');
    }
    const customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId === 0 || customerId == null) {
      this.toastr.error('Vui l??ng ????ng nh???p ????? th???c hi???n ch???c n??ng n??y');
      return;
    }
    Swal.fire({
      title: 'B???n mu???n x??a s???n ph???m n??y?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??a',
      cancelButtonText: 'H???y',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteItem(customerId, this.lstResult[ind].id)
          .subscribe(
            (res: any) => {
              this.toastr.success('X??a th??nh c??ng!');
            },
            err => this.toastr.error('C?? l???i khi x??a s???n ph???m'),
            () => { this.getList(); }
          );
      }
    });
  }

  order() {
    if (this.lstResult && this.lstResult.length === 0) {
      return;
    } else {
      this.router.navigate(['/order']);
    }
  }
}
