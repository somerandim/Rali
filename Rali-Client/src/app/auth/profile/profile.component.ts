import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  firstName: string = ''; // Default values removed
  lastName: string = '';  
  email: string = ''; 
  password: string = ''; 

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile(); // Fetch user profile on component initialization
  }

  // Load the user's profile from the backend
  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        // Populate fields with retrieved data
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.email = response.email;
        this.password = ''; // Leave password empty for security
      },
      (error) => {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile data.');
      }
    );
  }

  // Update the user's profile
  updateProfile(): void {
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
  onLogout(): void {
    this.profileService.logout().subscribe(
      () => {
        // Remove the JWT token from localStorage
        localStorage.clear();
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
