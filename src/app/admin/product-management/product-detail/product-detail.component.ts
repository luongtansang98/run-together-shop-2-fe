import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductManagementService } from '../product-management.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductDTO, ImageProductDTO } from '../product-management.model';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormatUtils } from 'src/app/helper/utilities/format.utils';

declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  numberChars = new RegExp('[^0-9]', 'g');
  @Output() public updateGrid = new EventEmitter();
  imagesList= new Array<ImageProductDTO>();
  public response: any;
  progress: number;
  public formDetail: FormGroup;
  message: string = "";
  imageUrl: string = "/assets/img/de.png";
  imageUrl2: string = "/assets/img/de.png";
  imageUrl3: string = "/assets/img/de.png";
  imageUrl4: string = "/assets/img/de.png";
  // imageUrl:string = "/assets/img/employ.png";
  FileToUpload: File = null;
  constructor(private toastr: ToastrService,
    private http: HttpClient,
    private productService: ProductManagementService) { }

  ngOnInit() {
    this.initForm();
  }
  showModal(id?:any) {
    if(id && id > 0){
      this.productService.getById(id).subscribe(
        (res:any) => {
          this.formDetail.patchValue(res);
          this.imagesList=[];
          this.imagesList = res.imagesList as ImageProductDTO[];
          this.formDetail.value.priceImport = FormatUtils.formatMoney(this.formDetail.value.priceImport);
          this.formDetail.value.priceExport = FormatUtils.formatMoney(this.formDetail.value.priceExport);
          console.log("tien nhập: "+ this.formDetail.value.priceImport + " tiền xuất: "+ this.formDetail.value.priceExport);
          this.setImages(this.imagesList);
        },
        null,
        () => $('#productDetailModal').modal('show')
      );
    }
    else{
      $('#productDetailModal').modal('show');
    }
  }
  initForm() {
    this.formDetail = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      productGroupId: new FormControl('1'),
      colorId: new FormControl('0'),
      categoryId: new FormControl('0', [Validators.required]),
      priceImport: new FormControl(''),
      priceExport: new FormControl(''),
      imagesOfProduct: new FormControl(''),
    });
  }
  public onCreate = () => {
    console.log("On create");
    console.log(this.formDetail.value.imagesOfProduct);

    var product = {
      code: this.formDetail.value.code,
      name: this.formDetail.value.name,
      description: this.formDetail.value.description,
      productGroupId: this.formDetail.value.productGroupId,
      colorId: this.formDetail.value.colorId,
      categoryId: this.formDetail.value.categoryId,
      priceExport: this.moneyToString(this.formDetail.value.priceExport),
      priceImport: this.moneyToString(this.formDetail.value.priceImport),
      imagesList: this.imagesList
    } as ProductDTO;
    this.productService.createProduct(product)
      .subscribe(
        res => {
          this.toastr.success("Tạo mới thành công");
        },
        error => {
          this.toastr.error("Tạo mới thất bại"),
            this.formDetail.reset();
        },
        () => {
          this.updateGrid.emit,
            $('#productDetailModal').modal('hide'),
            this.formDetail.reset()
        }
      );
  }
  public uploadFile = (files, ind: any) => {
    if (files.length === 0) {
      return;
    }
    //#region Show image preview
    this.FileToUpload = files.item(0);

    var reader = new FileReader();
    if (ind == 1) {
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.FileToUpload);
    }
    else if (ind == 2) {
      reader.onload = (event: any) => {
        this.imageUrl2 = event.target.result;
      }
      reader.readAsDataURL(this.FileToUpload);
    }
    else if (ind == 3) {
      reader.onload = (event: any) => {
        this.imageUrl3 = event.target.result;
      }
      reader.readAsDataURL(this.FileToUpload);
    }
    else {
      reader.onload = (event: any) => {
        this.imageUrl4 = event.target.result;
      }
      reader.readAsDataURL(this.FileToUpload);
    }

    //#endregion

    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http.post('http://localhost:52070/api/ProductManager/UploadMultipleFiles', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          var image = new ImageProductDTO();
          image.imagePath = this.response.path;
          this.imagesList.push(image);
          console.log("in upload files");
          console.log(this.imagesList);
          //this.onUploadFinished.emit(event.body);
        }
      },
        error =>console.error()
        ,
        () => this.message = 'Upload success.');
  }
  moneyToString(val:any)
  {
    if (typeof(val) === 'string') {
      return Number(val.replace(this.numberChars, ''));
    } else {
      return val;
    }
  }
  public createImgPath = (serverPath: string) => {
    return `http://localhost:52070/${serverPath}`;
  }
  setImages(imgList:ImageProductDTO[])
  {
    if(!imgList) return;
    for(var i=0; i <imgList.length;i++)
    {
      var imageObj = imgList[i].imagePath;
      if(i==0){
        this.imageUrl = this.createImgPath(imageObj);
      }
      else if(i==1){
        this.imageUrl2 = this.createImgPath(imageObj);
      }
      else if(i==2){
        this.imageUrl3 = this.createImgPath(imageObj);
      }else if(i==3){
        this.imageUrl4 = this.createImgPath(imageObj);
      }
    }
  }
}
