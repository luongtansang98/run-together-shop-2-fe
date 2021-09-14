import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
  }
}
