import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { Customer } from 'src/app/sign-up/customer.model';
import { CustomerService } from 'src/app/sign-up/customer.service';

@Component({
  selector: 'app-login-to-buy',
  templateUrl: './login-to-buy.component.html',
  styleUrls: ['./login-to-buy.component.css']
})
export class LoginToBuyComponent implements OnInit {
  public frmSignin: FormGroup;

  account: {
    fullName: '',
    email: ''
  };
  userLogin: Customer;
  userDetails;
  currentUser: any;

  constructor(private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: Router,
    private cartService: CartService,) { }

  ngOnInit() {
    this.frmSignin = this.createSigninForm();
  }

  createSigninForm(): FormGroup {
    return this.fb.group(
      {
        username: [
          null,
          Validators.compose([Validators.required])
        ],
        password: [
          null,
          Validators.compose([Validators.required])
        ],
      },
    );
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  submit() {
    var account = {
      username: this.frmSignin.value.username,
      password: this.frmSignin.value.password
    } as Customer;

    this.customerService.login(account)
      .subscribe(
        (res: any) => {
          var cart = JSON.parse(localStorage.getItem('cart'));
          cart.customerId = res.customer.customerId;

          localStorage.setItem('cart', JSON.stringify(cart));

          this.toastr.success("Đăng nhập thành công!");

          this.customerService.setAuthCustomer(res.customer);

          this.cartService.updateCart(cart).subscribe(
            (res: any) => {
              console.log('res');
              console.log(res);
            },
            error => {
            },
            () => {
              this.route.navigate(['/cart']);
            });
        },
        error => {
          this.toastr.error(error.error),
            this.frmSignin.reset();
        },
        () => {
          // this.updateGrid.emit,
          //   $('#productDetailModal').modal('hide'),
          this.frmSignin.reset();
          this.closeModal();
        }
      );
  }

}
