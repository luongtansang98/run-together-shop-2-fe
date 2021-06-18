import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,private toastr: ToastrService, private route:Router) { }

  ngOnInit() {
    this.service.formModel.reset();

  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded)
        {
          this.service.formModel.reset();
          this.toastr.success('Tạo mới thành công!');
          this.route.navigateByUrl('/admin/dashboard');
        }
      },
      err =>{
        this.toastr.error('Tạo mới thất bại');
      }
    )
  }
}
