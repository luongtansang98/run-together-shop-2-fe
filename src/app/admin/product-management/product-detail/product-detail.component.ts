import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductManagementService } from '../product-management.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ProductDTO, ImageProductDTO } from '../product-management.model';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormatUtils } from 'src/app/helper/utilities/format.utils';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  numberChars = new RegExp('[^0-9]', 'g');
  @Output() public updateGrid = new EventEmitter();
  imagesList = new Array<ImageProductDTO>();
  public response: any;
  progress: number;
  public formDetail: FormGroup;
  message = '';
  imageUrl = '/assets/img/de.png';
  imageUrl2 = '/assets/img/de.png';
  imageUrl3 = '/assets/img/de.png';
  imageUrl4 = '/assets/img/de.png';
  // imageUrl:string = "/assets/img/employ.png";
  FileToUpload: File = null;
  action;

  selectedPromotions: any[] = [];
  selectedPromotionsRdo = null;
  promotionSelection: any[] = [];
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  modalRef: BsModalRef;
  constructor(private toastr: ToastrService,
              private http: HttpClient,
              private productService: ProductManagementService,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getPromotionSelection();
    const id = this.route.snapshot.paramMap.get('id');
    this.action = this.route.snapshot.data['action'];
    if (id) {
      this.getProductDetail(id);
    } else { this.initForm(); }
  }
  // showModal(id?:any) {
  //   if(id && id > 0){
  //     this.productService.getById(id).subscribe(
  //       (res:any) => {
  //         this.formDetail.patchValue(res);
  //         this.imagesList=[];
  //         this.imagesList = res.imagesList as ImageProductDTO[];
  //         this.formDetail.controls['priceImport'].setValue(FormatUtils.formatMoney(this.formDetail.value.priceImport));
  //         this.formDetail.controls['priceExport'].setValue(FormatUtils.formatMoney(this.formDetail.value.priceExport));

  //         console.log("tien nhập: "+ this.formDetail.value.priceImport + " tiền xuất: "+ this.formDetail.value.priceExport);
  //         this.setImages(this.imagesList);
  //       },
  //       null,
  //       () => $('#productDetailModal').modal('show')
  //     );
  //   }
  //   else{
  //     $('#productDetailModal').modal('show');
  //   }
  // }

  getProductDetail(id) {
    this.productService.getById(id).subscribe(
        (res: any) => {
          this.initForm(res);

          // this.formDetail.patchValue(res);
          this.imagesList = [];
          this.imagesList = res.imagesList as ImageProductDTO[];
          this.formDetail.controls['priceImport'].setValue(FormatUtils.formatMoney(this.formDetail.value.priceImport));
          this.formDetail.controls['priceExport'].setValue(FormatUtils.formatMoney(this.formDetail.value.priceExport));

          console.log("tien nhập: "+ this.formDetail.value.priceImport + " tiền xuất: "+ this.formDetail.value.priceExport);
          this.setImages(this.imagesList);
        },
        null,
        () => $('#productDetailModal').modal('show')
      );
  }

  initForm(data = {}) {
    const code = this.generateCode(10);
    this.formDetail = new FormGroup({
      id: new FormControl(data['id'] ? data['id'] : ''),
      code: new FormControl(data['code'] ? data['code'] : code, [Validators.required]),
      name: new FormControl(data['name'] ? data['name'] : '', [Validators.required]),
      description: new FormControl(data['description'] ? data['description'] : ''),
      productGroupId: new FormControl(data['productGroupId'] ? data['productGroupId'] : '1'),
      colorId: new FormControl(data['colorId'] ? data['colorId'] : '0'),
      categoryId: new FormControl(data['categoryId'] ? data['categoryId'] : '0', [Validators.required]),
      priceImport: new FormControl(data['priceImport'] ? data['priceImport'] : ''),
      priceExport: new FormControl(data['priceExport'] ? data['priceExport'] : ''),
      imagesOfProduct: new FormControl(data['imagesOfProduct'] ? data['imagesOfProduct'] : ''),
      promotionList: new FormControl(data['promotionList'] ? data['promotionList'] : []),
    });
  }

  onSubmit() {
    if (this.formDetail.get('id').value) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  onUpdate() {}

  public onCreate = () => {
    const product = {
      code: this.formDetail.value.code,
      name: this.formDetail.value.name,
      description: this.formDetail.value.description,
      productGroupId: this.formDetail.value.productGroupId,
      colorId: this.formDetail.value.colorId,
      categoryId: this.formDetail.value.categoryId,
      priceExport: this.moneyToString(this.formDetail.value.priceExport),
      priceImport: this.moneyToString(this.formDetail.value.priceImport),
      imagesList: this.imagesList,
      promotionList: this.selectedPromotions
    } as ProductDTO;

    this.productService.createProduct(product)
      .subscribe(
        res => {
          this.toastr.success('Tạo mới thành công');
        },
        error => {
          this.toastr.error('Tạo mới thất bại'),
            this.formDetail.reset();
        },
        () => {
          // this.updateGrid.emit,
          //   $('#productDetailModal').modal('hide'),
            this.formDetail.reset();
        }
      );
  }
  public uploadFile = (files, ind: any) => {
    if (files.length === 0) {
      return;
    }
    //#region Show image preview
    this.FileToUpload = files.item(0);

    const reader = new FileReader();
    if (ind === 1) {
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.FileToUpload);
    } else if (ind === 2) {
      reader.onload = (event: any) => {
        this.imageUrl2 = event.target.result;
      };
      reader.readAsDataURL(this.FileToUpload);
    } else if (ind === 3) {
      reader.onload = (event: any) => {
        this.imageUrl3 = event.target.result;
      };
      reader.readAsDataURL(this.FileToUpload);
    } else {
      reader.onload = (event: any) => {
        this.imageUrl4 = event.target.result;
      };
      reader.readAsDataURL(this.FileToUpload);
    }

    //#endregion

    const filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http.post('http://localhost:52070/api/ProductManager/UploadMultipleFiles', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          const image = new ImageProductDTO();
          image.imagePath = this.response.path;
          this.imagesList.push(image);
          console.log('in upload files');
          console.log(this.imagesList);
          // this.onUploadFinished.emit(event.body);
        }
      },
        error => console.error()
        ,
        () => this.message = 'Upload success.');
  }
  moneyToString(val: any) {
    if (typeof(val) === 'string') {
      return Number(val.replace(this.numberChars, ''));
    } else {
      return val;
    }
  }
  public createImgPath = (serverPath: string) => {
    return `http://localhost:52070/${serverPath}`;
  }
  setImages(imgList: ImageProductDTO[]) {
    if (!imgList) { return; }
    for (let i = 0; i < imgList.length; i++) {
      const imageObj = imgList[i].imagePath;
      if (i === 0) {
        this.imageUrl = this.createImgPath(imageObj);
      } else if (i === 1) {
        this.imageUrl2 = this.createImgPath(imageObj);
      } else if (i === 2) {
        this.imageUrl3 = this.createImgPath(imageObj);
      } else if (i === 3) {
        this.imageUrl4 = this.createImgPath(imageObj);
      }
    }
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

  openPromotionModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  getPromotionSelection() {
    this.productService.getPromotionSelection().subscribe(
      res => {
        this.promotionSelection = res as any[];
      });
  }

  submitPromotion() {
    if (this.selectedPromotionsRdo) {
      this.selectedPromotions.push(this.selectedPromotionsRdo);
      this.modalRef.hide();
    }
  }

  removePromotion() {
    this.selectedPromotions = [];
  }
}
