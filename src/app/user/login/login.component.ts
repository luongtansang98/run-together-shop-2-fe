import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formModel={
  userName:'',
  password:''
};
  constructor(private service: UserService, private route:Router,private toastr: ToastrService) { }

  ngOnInit() {
    // if(localStorage.getItem('token')!= null)
    // {
    //   this.route.navigateByUrl('/home');
    // }
  }

  onSubmit(form?:NgForm)
  {
    if(!this.formModel) return;

    setTimeout(() => {
      this.service.login(this.formModel).subscribe(
        (res:any)=>{
          localStorage.setItem('token',res.token);
          this.service.setAuthUser(res.user);
          console.log(res.token);
          console.log('duoi day la user');
          console.log(res.user);
          this.route.navigateByUrl('/admin/dashboard');
        },
        err=>{
          if(err.status == 400)
          {
            this.formModel.userName ='';
          this.formModel.password = '';
            this.toastr.error('Incorrect username or password.','Authenticatio failed');
          }
          else
           console.log(err);
        },
        () => {
          this.formModel.userName ='';
          this.formModel.password = '';
        }
      );
    }, 500);

  }

}
