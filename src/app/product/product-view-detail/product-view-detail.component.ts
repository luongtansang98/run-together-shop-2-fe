import { Component, OnInit, ViewChild, SecurityContext, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProductManagementService } from 'src/app/admin/product-management/product-management.service';
import { ProductDTO, ImageArr } from 'src/app/admin/product-management/product-management.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/sign-up/customer.service';
import { CartService } from 'src/app/cart/cart.service';
import { CartDTO } from 'src/app/cart/cart.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginToBuyComponent } from '../login-to-buy/login-to-buy.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-product-view-detail',
  templateUrl: './product-view-detail.component.html',
  styleUrls: ['./product-view-detail.component.css']
})
export class ProductViewDetailComponent implements OnInit {
  cartObj: CartDTO;
  isLoad: boolean = false;
  totalObj = 1;
  testImg = '';

  sizeArr = [
    {
      'id': 1,
      'number': 40,
      'isDisabled': false
    },
    {
      'id': 2,
      'number': 41,
      'isDisabled': false
    },
    {
      'id': 3,
      'number': 42,
      'isDisabled': false
    },
    {
      'id': 4,
      'number': 43,
      'isDisabled': false
    },
  ];
  product = new ProductDTO();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  obj: any;
  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private router: Router, private toastr: ToastrService, private _route: ActivatedRoute,
    private productService: ProductManagementService,
    private cartService: CartService,
    private customerService: CustomerService,
    private modalService: BsModalService,
    private route: Router,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cartObj = new CartDTO();
    var id = this._route.snapshot.paramMap.get("id");

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.getProductById(id);
  }

  getProductById(productId: any) {
    window.scroll(0, 0);
    // this.spinner.show();
    this.productService.getById(productId).subscribe(
      (res: any) => {
        this.product = res as ProductDTO;
        console.log(this.product);
        console.log(this.product.sizes);
      },
      error => {
        //  this.spinner.hide();
         },
      () => {
        this.galleryImages = [];
        for (var i = 0; i < this.product.imagesList.length; i++) {

          var item = this.product.imagesList[i];
          var images = new NgxGalleryImage(
            {
              small: this.getImgPath(item.imagePath),
              medium: this.getImgPath(item.imagePath),
              big: this.getImgPath(item.imagePath),
            }
          );
          this.galleryImages.push(images);
        }
        this.spinner.hide();
      }

    )

  }

  public getImgPath(serverPath: string) {
    return `http://localhost:52070/${serverPath}`;
  }
  getTotal(up: boolean, down: boolean) {
    if (up) {
      this.totalObj++;
    }
    else {
      if (this.totalObj <= 0) return;
      else this.totalObj--;
    }
  }
  addToCart(isBuyNow: boolean) {

    var token = this.customerService.getAuthCustomer();
    console.log(token);
    this.cartObj.quantity = this.totalObj == 0 ? 1 : this.totalObj;
    this.cartObj.productId = this.product.id;
    this.setCustomerCart(this.cartObj.productId, this.cartObj.quantity);
    if (isBuyNow) {
      if (token && token.customerId) {
        let cart = {
          "productId": this.cartObj.productId,
          "quantity": this.cartObj.quantity,
          "customerId": token.customerId
        };
        this.cartService.updateCart(cart).subscribe(
          (res: any) => {
          },
          error => {
          },
          () => {
            this.route.navigate(['/cart']);
          });
      }
      else {
        this.modalService.show(LoginToBuyComponent, this.config);
        return;
      }
    }
    else {
      if (token && token.customerId) {
        let cart = {
          "productId": this.cartObj.productId,
          "quantity": this.cartObj.quantity,
          "customerId": token.customerId
        };
        this.cartService.updateCart(cart).subscribe(
          (res: any) => {
          },
          error => {
            this.toastr.error("Có lỗi khi thêm");
          },
          () => {
            this.toastr.success("Đã thêm vào giỏ hàng!");
          });
      } else {
        this.modalService.show(LoginToBuyComponent, this.config);
        return;
      }
    }
    // if (!token) {
    //  // this.openModal();
    //  this.cartObj.quantity = this.totalObj == 0 ? 1 : this.totalObj;
    // this.cartObj.productId = this.product.id;
    //  this.setCustomerCard(this.cartObj.productId,this.cartObj.quantity);
    //   this.modalService.show(LoginToBuyComponent,this.config);
    //   return;
    // }
  }

  public setCustomerCart(productId, quantity, customerId = 0) {
    let cart = {
      productId,
      quantity,
      customerId
    }
    localStorage.setItem(
      'cart', JSON.stringify(cart));
  }

  openModal() {
    this.modalRef = this.modalService.show(LoginToBuyComponent, this.config);
  }
}
