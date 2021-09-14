import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromotionManagementService } from '../promotion-management.service';

declare var $: any;
@Component({
  selector: 'app-promotion-cru',
  templateUrl: './promotion-cru.component.html',
  styleUrls: ['./promotion-cru.component.css']
})
export class PromotionCruComponent implements OnInit {
  formDetail: FormGroup;
  constructor(private fb: FormBuilder,
              private promotionService: PromotionManagementService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('promotionId');
    if (id) {
      this.getPromotionId(id);
    }
    this.buildForm();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // this.initDatePicker();
  }
  save() {
    if (this.formDetail.get('id').value) {
      this.update();
    } else {
      this.create();
    }
  }
  create() {
    if (this.formDetail.invalid) { return; }

    this.promotionService.createPromotion(this.formDetail.value).subscribe(
      (res: any) => {
        this.toastr.success('Tạo mới thành công!');
        this.router.navigateByUrl('/admin/dashboard/promotion');
      },
      err => this.toastr.error('Tạo mới thất bại!')
    );
  }

  update() {
    if (this.formDetail.invalid) { return; }

    this.promotionService.updatePromotion(this.formDetail.value).subscribe(
      (res: any) => {
        this.toastr.success('Cập nhật thành công!');
        this.router.navigateByUrl('/admin/dashboard/promotion');
      },
      err => this.toastr.error('Cập nhật thất bại!')
    );
  }

  initDate() {
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });
  }

  private initDatePicker(): void {
    $('.datepicker').datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: 'dd/mm/yy',
      container: '#contractLimitDetailModal',
      beforeShow(input, inst) {
        const rect = input.getBoundingClientRect();
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          inst.dpDiv.css({ top: (rect.y > 230) ? (rect.top - 229) : (rect.top + 40) });
        }, 0);
      },
      // tslint:disable-next-line:only-arrow-functions
      onSelect: function(dateText, obj) {
      }.bind(this)
    });
  }
  buildForm(data = {}) {
    const code = this.generateCode(10);
    this.formDetail = this.fb.group({
      id: [ data['id'] ? data['id'] : ''],
      code: [data['code'] ? data['code'] : code],
      name: [data['name'] ? data['name'] : ''],
      description: [data['description'] ? data['description'] : ''],
      promotionTypeId: [data['promotionTypeId'] ? data['promotionTypeId'] : 1],
      value: [data['value'] ? data['value'] : ''],
      startTime: [data['startTime'] ? new Date(data['startTime']) : new Date()],
      endTime: [data['endTime'] ? new Date(data['endTime']) : new Date()],
      canApplyForAll: [data['canApplyForAll'] ? data['canApplyForAll'] : false],
      isDisable: [data['isDisable'] ? data['isDisable'] : false],
    });
  }

  get canApplyForAllCtrl() {
    return this.formDetail.get('canApplyForAll');
  }
  get isDisableCtrl() {
    return this.formDetail.get('isDisable');
  }

  get promotionTypeIdCtrl() {
    return this.formDetail.get('promotionTypeId');
  }

  onSwitchControl(controlName: string, value: boolean) {
    value = !value;
    this.formDetail.controls[controlName].setValue(value);
  }

  generateCode(length) {
    let result = '';
    // tslint:disable-next-line:prefer-const
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // tslint:disable-next-line:prefer-const
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  getPromotionId(promotionId) {
    this.promotionService.getById(promotionId).subscribe(
      (res: any) => {
        this.buildForm(res);
      }
    );
  }
}
