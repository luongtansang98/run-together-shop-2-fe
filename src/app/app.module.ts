import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatAutocompleteModule, MatButtonModule, MatInputModule, MatStepperModule } from '@angular/material';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // alternatively NoopAnimationsModule
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot({
      progressBar: true
    }), // ToastrModule added

    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    },
    CurrencyPipe, DecimalPipe,
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
