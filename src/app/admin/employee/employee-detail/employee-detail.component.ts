import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EmployeeDTO, UserToCreate, User, Position } from '../employee.model';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';
import { ProductManagementService } from 'src/app/admin/product-management/product-management.service';
declare var $: any;
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  // public detailForm: FormGroup;
  @Input() positions = new Position();
  imageUrl: string = "/assets/img/de.png";
  FileToUpload: File = null;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public updateGrid = new EventEmitter();
  public isCreate: boolean;
  public name: string;
  public address: string;
  public positionId: number=0;
  public phoneNumber: string;
  public user: UserToCreate;
  public users: User[] = [];
  public response: any;
  formDetail = new FormGroup({
    id:new FormControl(),
    name: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    positionId: new FormControl(0),
    imgPath: new FormControl(''),
  });
  constructor(private toastr: ToastrService,
    private empService :EmployeeService,
    private productService: ProductManagementService
    ) { }

  ngOnInit() {
  }

  showModal(id?:any) {
    if(id && id > 0)
    {
      this.empService.getById(id).subscribe(
        res => {
          this.formDetail.patchValue(res);
        },
        null,
        () => $('#detailModal').modal('show')
      );
    }
    else
      $('#detailModal').modal('show');
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    //#region Show image preview
    this.FileToUpload = files.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.FileToUpload);
    //#endregion

    this.productService.uploadIamge(files)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Tải hình thành công.';
          this.response = event.body;
        }
      });
  }
  public onCreate = () => {
    if (!this.response || this.response.dbPath == undefined) {
      alert("Bạn chưa chọn hình");
      return;
    }

    if(this.formDetail.invalid) return;
    this.formDetail.controls.imgPath.setValue(this.response.dbPath);
    var user = {
  name: this.formDetail.value.name,
  address: this.formDetail.value.address,
  positionId:Number(this.formDetail.value.positionId),
  phoneNumber:this.formDetail.value.phoneNumber,
  imgPath: this.formDetail.value.imgPath
    } as User;


    this.empService.createEmployee(user)
      .subscribe(
        res => {
          this.toastr.success("Tạo mới thành công");
        },
        error =>
        {
          this.toastr.error("Tạo mới thất bại"),
          this.formDetail.reset();
        },
        () => {
          this.updateGrid.emit(),
          $('#detailModal').modal('hide'),
          this.formDetail.reset()
        }
      );
  }
  haha(){
    alert("hello");
  }
}
