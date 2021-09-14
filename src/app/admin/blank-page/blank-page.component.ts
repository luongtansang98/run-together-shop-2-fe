import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { UserModel } from 'src/app/user/user.model';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css']
})
export class BlankPageComponent implements OnInit {
  public currentUser: UserModel;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.userService.getAuthUser();
    if (!this.currentUser) {
      this.router.navigateByUrl('/admin/login');
    }
  }
}
