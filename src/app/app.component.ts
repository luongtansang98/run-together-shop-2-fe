import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './auth/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  showLoadingIndicator = true;
  /**
   *
   */
  constructor(private _route: Router, public loadingService: LoadingService, public spinner: NgxSpinnerService) {
    this._route.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    })

  }

  ngOnInit(): void {
    // this.loadingService.isLoading$.subscribe(async  res =>   console.log(await res));
  }
}
