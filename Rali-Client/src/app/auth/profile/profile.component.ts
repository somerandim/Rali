import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service'; // Import ProfileService

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  firstName: string = 'John'; // Example default value
  lastName: string = 'Doe';  // Example default value
  email: string = 'john.doe@gmail.com'; // Example default value
  password: string = '********'; // Password placeholder for security

  constructor(private router: Router, private profileService: ProfileService) {}

  // Update user profile (simulated here)
  updateProfile() {
    const updatedData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.profileService.updateProfile(updatedData).subscribe(
      () => {
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    );
  }

  // Log out and redirect to login page
  onLogout() {
    this.profileService.logout().subscribe(
      () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('jwtToken');

        // Display a logout message
        alert('You have been logged out.');

        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during logout:', error);
        alert('Failed to log out. Please try again.');
      }
    );
  }
}
