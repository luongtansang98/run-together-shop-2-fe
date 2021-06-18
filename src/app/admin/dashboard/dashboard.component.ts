import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserModel } from 'src/app/user/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private rxSubject: Subject<void>;
  public currentUser: UserModel;
  constructor(private router: Router,private userService: UserService) {
    this.currentUser = this.userService.getAuthUser();
  }
  ngOnInit(): void {
   // throw new Error("Method not implemented.");
  }



  // ngOnDestroy(): void {
  //   this.rxSubject.next();
  //   this.rxSubject.complete();
  // }

  public onLogout(): void {
    this.userService.clearAuthData();
    console.log('hhahaa');
    this.router.navigateByUrl('/login');
  }

}
