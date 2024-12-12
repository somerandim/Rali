import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./features/home/home.component";
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { PublicbookingComponent } from './features/public-booking/publicbooking/publicbooking.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent, NavbarComponent, FooterComponent, ProfileComponent,PublicbookingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rali-client';
}
