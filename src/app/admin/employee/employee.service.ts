import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly baseURL ="http://localhost:52070/api/user";
  constructor(private http: HttpClient) { }
  getList(searchModel:any)
  {
    var apiURL = this.baseURL + "/GetList";
    return this.http.post(apiURL, searchModel);
  }
  getById(id:any)
  {
    var apiURL = this.baseURL + "?id="+id;
    return this.http.get(apiURL);
  }
  createEmployee(user:User)
  {
    return this.http.post(this.baseURL + '/create',user);
  }
  uploadIamge(files:any)
  {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseURL + 'ProductManager/Upload', formData, { reportProgress: true, observe: 'events' })
  }

}
