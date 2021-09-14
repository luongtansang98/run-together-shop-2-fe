import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { HeaderComponent } from './layout/header/header.component';



@NgModule({
  declarations: [DashboardComponent, SidebarComponent, BlankPageComponent, HeaderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
