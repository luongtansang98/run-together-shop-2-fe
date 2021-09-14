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
  temporaryBill = 0;
  deliveryFee = 30000;

  lstResult: CartDTO[] = [];


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  isEditable = false;
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;

  isCompleted = false;
  isToggle = false;
  customerInfo: CustomerModel;
  isEditAddress = false;

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
    const customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId === 0 || customerId == null) {
      return false;
    } else { return true; }
  }

  getBuy() {
    const customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId === 0 || customerId == null) {
      return;
    }
    else {
      let req = this.thirdFormGroup.value as OrderModel;
      req.orderDate = new Date();
      this.orderService.CompleteOrder(req).subscribe({
        complete: () => { }, // completeHandler
        error: () => { this.toastr.error('Vui lòng thử lại sau ít phút.'); },    // errorHandler
        next: () => { this.toastr.success('Đặt mua thành công!').onHidden.subscribe(res => this.router.navigate(['/'])); }     // nextHandler
      });
    }
  }

  getList(event?: any) {
    const customerId = Number(this.customerService.getAuthCustomer().customerId);
    if (customerId === 0 || customerId == null) {
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

  editAddress() {
    this.isEditAddress = !this.isEditAddress;
  }
}
