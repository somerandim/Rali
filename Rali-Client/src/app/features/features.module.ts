import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CourtBookingComponent } from './court-booking/court-booking.component';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NavbarComponent } from "./navbar/navbar.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    HomeComponent
],
exports: [
  HomeComponent,
]
})
export class FeaturesModule { }
