import { SafeResourceUrl } from '@angular/platform-browser';

export class ProductDTO{
  id: number;
  code: string;
  name: string;
  description: string;
  viewCount: number;
  priceImport: number;
  priceExport: number;
  productGroupId: number; //nhom Nam/Nu/Tre
  colorId: number;
  categoryId: number;
  countImage: number;
  imagesList  = new Array<ImageProductDTO>();
  sizes  = new Array<ProductSizeDTO>();
  firseImagePath : string;
}

export class ProductSizeDTO{
  id?: number;
  count: number;
  sizeNumber: number;
  productId: number;
  disabled: boolean;
}

export class ImageProductDTO{
  id: number;
  imagePath: string;
  order: number;
  productId: number;
  product: ProductDTO;
}
export class ImageArr{
  small?:string ;
  medium?:string | SafeResourceUrl;
  big?:string | SafeResourceUrl;
  url:string;
}
