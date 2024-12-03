import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  firstName: string = 'John';
  lastName: string = 'Doe';
  email: string = 'john.doe@gmail.com';
  password: string = '********';

  constructor(private router: Router) {}

  // Simulate profile update
  updateProfile() {
    alert('Profile updated successfully!');
  }

  // Log out and redirect to login page
  onLogout() {
    alert('You have been logged out.');
    this.router.navigate(['/login']);
  }
}
