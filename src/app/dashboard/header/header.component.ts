import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Customer } from 'src/app/sign-up/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/sign-up/customer.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  public frmSignin: FormGroup;
  account:{
    fullName:'',
    email:''
  };
  userLogin: Customer;
  userDetails;
  currentUser:any;
  constructor(private router: Router,private service: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private customerService: CustomerService) {
      this.frmSignin = this.createSigninForm();
    }

  ngOnInit() {
    this.currentUser = this.customerService.getAuthCustomer() || null;
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
  onLogout(){
    localStorage.removeItem('lscc');
    this.currentUser = null;
    this.toastr.success("Đã đăng xuất");
  }

  showModal() {
    $('#loginModal').modal('show');
  }
  closeModal(){
    $('#loginModal').modal('hide');
  }
  submit() {
    var account = {
      username : this.frmSignin.value.username,
      password : this.frmSignin.value.password
    } as Customer;

    this.customerService.login(account)
      .subscribe(
        (res : any) => {
          this.toastr.success("Đăng nhập thành công!");
          console.log(res.customer);
          this.customerService.setAuthCustomer(res.customer);
         // this.account = res.customer;
         this.currentUser = res.customer;
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
