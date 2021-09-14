import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from './product-management.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  readonly baseURL = 'http://localhost:52070/api/ProductManager';
  readonly baseURL2 = 'http://localhost:52070/api/Carts';
  readonly baseURL3 = 'http://localhost:52070/api/Promotions';
  constructor(private http: HttpClient) {
    console.log('aaaaa');
   }

  getList(searchModel: any): Observable<any> {
    console.log('getList');
    const apiURL = this.baseURL + '/GetList';
    return this.http.post(apiURL, searchModel);
  }
  getById(productId: any) {
    console.log('getById');
    console.log('productId');
    const apiURL = this.baseURL + '/' + productId;
    return this.http.get(apiURL);
  }
  getImagesById(imagesOfProductId: any) {
    console.log('getImagesById');
    const apiURL = this.baseURL + '/imagesProduct/' + imagesOfProductId;
    return this.http.get(apiURL);
  }
  createProduct(product: any) {
    console.log('createProduct');
    return this.http.post(this.baseURL + '/create', product);
  }
  uploadIamge(files: any) {
    console.log('uploadIamge');
    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseURL + '/Upload', formData, { reportProgress: true, observe: 'events' });
  }
  updateCart(cart: any) {
    console.log('updateCart');
    return this.http.post(this.baseURL2 + '/update', cart);
  }
  getPromotionSelection() {
    const apiURL = this.baseURL3 + '/get-promotion-selection';
    return this.http.get(apiURL);
  }
}
