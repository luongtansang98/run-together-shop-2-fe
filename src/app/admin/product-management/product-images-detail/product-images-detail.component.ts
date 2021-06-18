import { Component, OnInit } from '@angular/core';
import { ImageProductDTO } from '../product-management.model';
import { FormatUtils } from 'src/app/helper/utilities/format.utils';
import { ProductManagementService } from '../product-management.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

declare var $: any;
@Component({
  selector: 'app-product-images-detail',
  templateUrl: './product-images-detail.component.html',
  styleUrls: ['./product-images-detail.component.css']
})
export class ProductImagesDetailComponent implements OnInit {
  imageUrl1: string = "/assets/img/de.png";
  imageUrl2: string = "/assets/img/de.png";
  imageUrl3: string = "/assets/img/de.png";
  imageUrl4: string = "/assets/img/de.png";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imagesList:ImageProductDTO[]=[];
  constructor(private productService: ProductManagementService) { }

  ngOnInit() {
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
  }

  showModal(id?: any) {
    if (!id) return;
    this.productService.getImagesById(id).subscribe(
      (res: any) => {
        this.imagesList = [];
        this.imagesList = res as ImageProductDTO[];
         this.setImages(this.imagesList);
      },
      null,
      () =>
      {
        this.galleryImages=[];
          for(var i=0;i< this.imagesList.length;i++)
          {

            var item = this.imagesList[i] ;
            var images = new NgxGalleryImage(
              {
                small : this.createImgPath(item.imagePath),
                medium :  this.createImgPath(item.imagePath),
                big : this.createImgPath(item.imagePath),
              }
            );
            this.galleryImages.push(images);
          }
        $('#imagesOfProductDetailModal').modal('show');
      }
    );
  }
  setImages(imgList:ImageProductDTO[])
  {
    if(!imgList) return;
    for(var i=0; i <imgList.length;i++)
    {
      var imageObj = imgList[i].imagePath;
      if(i==0){
        this.imageUrl1 = this.createImgPath(imageObj);
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
  public createImgPath = (serverPath: string) => {
    return `http://localhost:52070/${serverPath}`;
  }
}
