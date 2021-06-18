import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';
import { Customer } from '../customer.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public frmSignup: FormGroup;
  public isSubmit:false;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private router: Router) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        fullName: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        phone: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        address: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        city: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        username: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    // do signup or something
    console.log(this.frmSignup.value);
    var customer = {
      fullName : this.frmSignup.value.fullName,
      phone: this.frmSignup.value.phone,
      email:this.frmSignup.value.email,
      address:this.frmSignup.value.address,
      city:this.frmSignup.value.city,
      username:this.frmSignup.value.username,
      password:this.frmSignup.value.password,
      confirmPassword:this.frmSignup.value.confirmPassword
    } as Customer;

    this.customerService.createAcccount(customer)
      .subscribe(
        res => {
          this.toastr.success("Tạo tài khoản thành công!");
          this.customerService.setAuthCustomer(res as any);
        },
        error => {
          this.toastr.error("Tạo tài khoản thất bại!"),
            this.frmSignup.reset();
        },
        () => {
          // this.updateGrid.emit,
          //   $('#productDetailModal').modal('hide'),
            this.frmSignup.reset();
            this.router.navigate(['/home']);

        }
      );
  }
}
