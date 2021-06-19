import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public operationName: string;

  constructor(private router:Router) {}

  ngOnInit() {
    this.router.navigate(['/home']);
  }
  showModal() {
    $('#modaldemo3').modal('show');
  }
}
