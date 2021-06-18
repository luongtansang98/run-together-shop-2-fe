import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from '../shared/user.service';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductModule } from '../product/product.module';
import { ContactModule } from '../contact/contact.module';
import { CartModule } from '../cart/cart.module';
import { SignUpModule } from '../sign-up/sign-up.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderModule } from '../order/order.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';



@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, DashboardComponent],
  imports: [
    CommonModule,
    ProductModule,
    ContactModule,
    CartModule,
    SignUpModule,
    ReactiveFormsModule,
    FormsModule,
    OrderModule,
    DashboardRoutingModule
  ],
  providers: [UserService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true

    // },
    // CurrencyPipe, DecimalPipe
  ],
})
export class DashboardModule { }
