import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly baseURL ="http://localhost:52070/api/Customers";

  constructor(private http: HttpClient) { }

  createAcccount(customer:any)
  {
    var apiURL = this.baseURL + "/CreateAccount";
    return this.http.post(apiURL, customer);
  }
  login(customer:any)
  {
    var apiURL = this.baseURL + "/login";
    return this.http.post(apiURL, customer);
  }
  public setAuthCustomer(customer: Customer) {
    localStorage.setItem(
      'lscc', JSON.stringify(customer));
  }
  public getAuthCustomer() : any{
    return JSON.parse(localStorage.getItem('lscc'));
  }
}
