import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CourtBookingComponent } from './court-booking/court-booking.component';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';



@NgModule({
  declarations: [
    HomeComponent,
    CourtBookingComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'confirmation', component: ConfirmationComponent },
    ]),
  ],
})
export class FeaturesModule { }
