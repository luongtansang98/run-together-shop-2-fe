import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStepComponent } from './order-step/order-step.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [OrderStepComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class OrderModule { }
