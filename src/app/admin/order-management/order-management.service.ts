import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  readonly baseURL ="http://localhost:52070/api/Orders";
  constructor(private http: HttpClient) { }

  getList(searchModel:any):Observable<any>
  {
    var apiURL = this.baseURL + "/GetList";
    return this.http.post(apiURL, searchModel);
  }
}
