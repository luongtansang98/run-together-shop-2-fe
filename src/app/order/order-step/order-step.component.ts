import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartDTO } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { CustomerModel } from 'src/app/helper/models/customer.model';
import { CustomerService } from 'src/app/sign-up/customer.service';
import { DeliveryType } from 'src/app/utilities/enum/enum-type.model';
import { OrderModel } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-step',
  templateUrl: './order-step.component.html',
  styleUrls: ['./order-step.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class OrderStepComponent implements OnInit, AfterViewInit {
  // @ViewChild('stepper', { static: false }) stepper: MatStepper;
  // isLinear = true;
  // secondFormGroup: FormGroup;
  // selectedIndexStep = 0;
  // formGroup2: FormGroup;
  // formGroup3: FormGroup;
  // currentUser: any;
  temporaryBill = 0;
  deliveryFee = 30000;
  // public delive: DeliveryType = DeliveryType.Standard;

  lstResult: CartDTO[] = [];


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  isEditable = false;
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;

  isCompleted = false;
  isToggle = false;
  customerInfo: CustomerModel;

  constructor(private _formBuilder: FormBuilder,
    private cusService: CustomerService,
    private cartService: CartService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });

    if (this.isLogin()) {
      this.isCompleted = true;
      this.myStepper.selectedIndex = 2;
      this.customerInfo = this.cusService.getAuthCustomer() as CustomerModel;
      this.buildForm3(this.customerInfo);
    }

    this.getList();

    // if (this.currentUser) {
    //   this.selectedIndexStep = 1;
    //   var fafa = this.currentUser.fullName as string;
    //   var address = this.currentUser.address as string;
    //   var phone = this.currentUser.phone as string;
    //   var email = this.currentUser.email as string;

    //   this.formGroup2 = new FormGroup({
    //     id: new FormControl(),
    //     name: new FormControl(fafa),
    //     address: new FormControl(address),
    //     phoneNumber: new FormControl(phone),
    //     email: new FormControl(email)
    //   });
    //   this.formGroup3 = new FormGroup({
    //     deliveryType: new FormControl('0'),
    //     paymentType: new FormControl('0')
    //   });
    //   this.getList();
    // }
  }

  buildForm3(customerModel: CustomerModel) {
      this.thirdFormGroup = this._formBuilder.group({
        deliveryType:  ['0'],
        paymentType: ['0'],
        customerId: [customerModel.customerId ? customerModel.customerId : ''],
        shipEmail: [customerModel.email ? customerModel.email : ''],
        shipName: [customerModel.fullName ? customerModel.fullName : ''],
        shipAddress: [customerModel.address ? customerModel.address : ''],
        shipPhone: [customerModel.phone ? customerModel.phone : '']
      });
  }

  isLogin() {
    var customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId == 0 || customerId == null) {
      return false;
    }
    else return true;
  }

  getBuy() {
    var customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId == 0 || customerId == null) {
      return;
    }
    else {
      let req = this.thirdFormGroup.value as OrderModel;
      this.orderService.CompleteOrder(req).subscribe({
        complete: () => { }, // completeHandler
        error: () => { this.toastr.error("Vui lòng thử lại sau ít phút.") },    // errorHandler
        next: () => { this.toastr.success("Đặt mua thành công!").onHidden.subscribe(res => this.router.navigate(['/'])); }     // nextHandler
      });
    }
  }

  getList(event?: any) {
    var customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId == 0 || customerId == null) {
      return;
    }

    setTimeout(() => {
      this.cartService.getList(customerId)
        .subscribe({
          complete: () => {  }, // completeHandler
          error: () => {  },    // errorHandler
          next: (res: any) => {
            this.lstResult = res as CartDTO[] || [];
            this.temporaryBill = res.reduce((sum, current) => sum + current.totalPrice, 0);
           }
       });
    }, 1000);
  }

  getTotalBill() {
    return this.temporaryBill + this.deliveryFee;
  }
}
