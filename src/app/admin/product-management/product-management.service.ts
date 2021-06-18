import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from './product-management.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  readonly baseURL ="http://localhost:52070/api/ProductManager";
  readonly baseURL2 ="http://localhost:52070/api/Carts";
  constructor(private http: HttpClient) { }

  getList(searchModel:any):Observable<any>
  {
    var apiURL = this.baseURL + "/GetList";
    return this.http.post(apiURL, searchModel);
  }
  getById(productId:any)
  {
    var apiURL = this.baseURL + '/' + productId;
    return this.http.get(apiURL);
  }
  getImagesById(imagesOfProductId:any)
  {
    var apiURL = this.baseURL + '/imagesProduct/'+imagesOfProductId;
    return this.http.get(apiURL);
  }
  createProduct(product:any)
  {
    return this.http.post(this.baseURL + '/create',product);
  }
  uploadIamge(files:any)
  {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseURL + '/Upload', formData, { reportProgress: true, observe: 'events' })
  }
  updateCart(cart:any)
  {
    return this.http.post(this.baseURL2 + '/update',cart);
  }

}
