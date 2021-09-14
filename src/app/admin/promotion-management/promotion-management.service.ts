import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionManagementService {
  readonly baseURL = 'http://localhost:52070/api/Promotions';
  constructor(private http: HttpClient) { }

  getList(searchModel: any): Observable<any> {
    const apiURL = this.baseURL + '/GetList';
    return this.http.post(apiURL, searchModel);
  }
  getById(promotionId: any) {
    const apiURL = this.baseURL + '/' + promotionId;
    return this.http.get(apiURL);
  }
  createPromotion(promotion: any) {
    return this.http.post(this.baseURL + '/create', promotion);
  }
  updatePromotion(promotion: any) {
    return this.http.post(this.baseURL + '/update', promotion);
  }
  deleteById(promotionId: any) {
    const apiURL = this.baseURL + '/delete/' + promotionId;
    return this.http.get(apiURL);
  }
}
