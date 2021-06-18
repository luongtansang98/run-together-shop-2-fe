import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly baseURL ="http://localhost:52070/api/Carts";
  constructor(private http: HttpClient) { }

  updateCart(cart:any)
  {
    return this.http.post(this.baseURL + '/update',cart);
  }
  getList(customerId:any){
    var req ={
      customerId
    };
    var apiURL = this.baseURL + "/GetList";
    return this.http.post(apiURL,req);
  }
  deleteItem(customerId:any,cartId:any){
    var req ={
      customerId,
      cartId
    };
    var apiURL = this.baseURL + "/deleteItem";
    return this.http.post(apiURL,req);
  }
}
