import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { exception } from 'console';
import { HttpErrors } from './http-errors';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   *
   */
  private totalRequests = 0;

  constructor(private route: Router, private spinner: NgxSpinnerService, private loadingService: LoadingService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    if (localStorage.getItem('token') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
          }
        }),
        tap(
          succ => { },
          err => {
            localStorage.removeItem('token');
            this.route.navigateByUrl('/page-not-found');

            //   switch (err.status) {

            //     case HttpErrors.BadRequest:
            //         console.error('%c Bad Request 400', logFormat);
            //         break;

            //     case HttpErrors.Unauthorized:
            //         console.error('%c Unauthorized 401', logFormat);
            //         window.location.href = '/login' + window.location.hash;
            //         break;

            //     case HttpErrors.NotFound:
            //         console.error('%c Not Found 404', logFormat);
            //         break;

            //     case HttpErrors.TimeOut:
            //         console.error('%c TimeOut 408', logFormat);
            //         break;

            //     case HttpErrors.Forbidden:
            //         console.error('%c Forbidden 403', logFormat);
            //         break;

            //     case HttpErrors.InternalServerError:
            //         console.error('%c big bad 500', logFormat);
            //         break;
            // }

            // if(err.status ==401)
            // {
            //   localStorage.removeItem('token');
            //   this.route.navigateByUrl('/login');
            // }
            // else if(err.status == 403)
            //   this.route.navigateByUrl('/forbidden');
          }
        )
      );
    }
    else
      return next.handle(req.clone());
  }
}
