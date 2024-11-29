import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { CourtBookingComponent } from './features/court-booking/court-booking.component';
import { ConfirmationComponent } from './features/confirmation/confirmation.component';
import { StoreComponent } from './features/store/store.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    {path: '', component: HomeComponent},
    {path: 'court-booking', component: CourtBookingComponent},
    { path: 'confirmation', component: ConfirmationComponent },
    { path: 'store', component: StoreComponent}
];
