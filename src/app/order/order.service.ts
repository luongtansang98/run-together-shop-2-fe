import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModule } from './order.module';
import { OrderModel } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly baseURL ="http://localhost:52070/api/Orders";
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

  CompleteOrder(order: OrderModel){
    const apiURL = this.baseURL + "/CompleteOrder";
    return this.http.post(apiURL, order);
  }
}
