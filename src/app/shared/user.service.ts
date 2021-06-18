import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AppGlobal } from '../app.global';
import { UserModel } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private fb: FormBuilder,private http:HttpClient) { }

  readonly BaseURI ='http://localhost:52070/api';
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: [''],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['',[Validators.required] ],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  })
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  register(){
    var body ={
      UserName:this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName:this.formModel.value.FullName,
      Password:this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register',body);
  }
  login(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login',formData);
  }
  getUserProfile(){
    return this.http.get(this.BaseURI + '/UserProfile');
  }
  createOrUpdate(entity:any){
    return this.http.post(this.BaseURI + '/Employees/createOrUpdate',entity);
  }
  roleMath(allowedRoles): any {
    var isMatch =false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    console.log(userRole);
    if(allowedRoles) {
      for(let i = 0; i < allowedRoles.length; i ++) {
        if(userRole.toUpperCase() == allowedRoles[i]){
           isMatch = true;
           break;
        }
      }
    }
    return isMatch;
  }
  public setAuthUser(userModel: UserModel) {
    localStorage.setItem(
      AppGlobal.LOCAL_STORAGE_CONNECTION_USER, JSON.stringify(userModel));
  }
  public getAuthUser(): UserModel {
    const userModel = new UserModel();
    const user = JSON.parse(
      localStorage.getItem(AppGlobal.LOCAL_STORAGE_CONNECTION_USER));
    if (!user) {
      return userModel;
    }
    userModel.id = user.id;
    userModel.fullName = user.fullName;
    userModel.email = user.email;
    userModel.role = user.role;
    userModel.defaultTemplate = user.defaultTemplate;
    return userModel;
  }
  public clearAuthData(): void {
    localStorage.clear();
  }
}
