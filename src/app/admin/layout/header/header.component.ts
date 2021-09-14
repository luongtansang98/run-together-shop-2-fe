import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { UserModel } from 'src/app/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser: UserModel;
  constructor(private router: Router, private userService: UserService) {
    this.currentUser = this.userService.getAuthUser();
  }

  ngOnInit() {
  }

  public onLogout(): void {
    this.userService.clearAuthData();
    this.router.navigateByUrl('/admin/login');
  }
}
