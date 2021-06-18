import { Component, Inject, OnInit } from '@angular/core';
import { ChatService, ChatServiceToken } from '@pazznetwork/ngx-chat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // constructor(@Inject(ChatServiceToken) chatService: ChatService) {
  //   chatService.logIn({
  //     service: 'ngx-chat.example',
  //     domain: 'wss://ngx-chat.example:5280/websocket',
  //     password: 'password',
  //     username: 'someuser@ngx-chat.example',
  //   });
  // }
  constructor() {}
  ngOnInit() {
  }

}
