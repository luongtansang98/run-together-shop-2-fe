import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromotionManagementService } from '../promotion-management.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {
  promotionId = 0;
  formDetail: FormGroup;

  constructor(private fb: FormBuilder,
              private promotionService: PromotionManagementService,
              private toastr: ToastrService,
              private activetedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.promotionId = Number(this.activetedRoute.snapshot.paramMap.get('promotionId'));
    if (this.promotionId) {
      this.buildForm();
      this.getPromotionId(this.promotionId);
    } else {
      this.router.navigateByUrl('/admin/dashboard/promotion');
    }
  }

  back() {
    this.router.navigateByUrl('/admin/dashboard/promotion');
  }

  buildForm(data = {}) {
    this.formDetail = this.fb.group({
      id: [''],
      code: [''],
      name: [''],
      description: [''],
      promotionTypeId: [1],
      value: [''],
      startTime: [''],
      endTime: [''],
      canApplyForAll: [false],
      isDisable: [false],
    });

    // tslint:disable-next-line:forin
    for (const control in this.formDetail.controls) {
      this.formDetail.controls[control].disable();
    }
  }

  get canApplyForAllCtrl() {
    return this.formDetail.get('canApplyForAll');
  }
  get isDisableCtrl() {
    return this.formDetail.get('isDisable');
  }

  getPromotionId(promotionId) {
    this.promotionService.getById(promotionId).subscribe(
      (res: any) => {
        this.formDetail.patchValue(res);
        this.formDetail.controls.endTime.setValue(new Date(res.endTime));
        this.formDetail.controls.startTime.setValue(new Date(res.startTime));
      }
    );
  }

  deletePromotion() {
    const promotionId = this.formDetail.get('id').value;
    if (!promotionId) { return; }

    Swal.fire({
      title: 'Bạn muốn xóa mã khuyến mãi này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(res => {
      if (res.value) {
        this.promotionService.deleteById(promotionId).subscribe(
          (result: any) => {
            this.toastr.success('Đã xóa thành công!');
            this.router.navigateByUrl('/admin/dashboard/promotion');
          },
          err => this.toastr.error('Không thể xóa!')
        );
      }
    });
  }
}
