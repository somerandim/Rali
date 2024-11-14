import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AdminComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected property name
})
export class AppComponent {
  title = 'Rali-client';
}
