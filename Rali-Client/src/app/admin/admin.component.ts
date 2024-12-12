import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Activity } from '../models/Activity';
import { Venue } from '../models/Venue';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  categories: Category[] = [];   // Loaded categories for products
  activities: Activity[] = [];   // Loaded activities for venues
  venues: any[] = []; // List of venues
  teams: any[] = []; // List of teams

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();   // Load categories when initialized
    this.loadActivities();   // Load activities when initialized
    this.loadVenues(); // Fetch all venues
    this.loadTeams();  
  }

  /**
   * Load all categories from the backend
   */
  private loadCategories(): void {
    this.adminService.getCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
        console.log('Loaded categories:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }


  private loadTeams(): void {
    this.adminService.getTeams().subscribe({
      next: (response) => {
        this.teams = response;
        console.log('Loaded teams:', this.teams);
      },
      error: (err) => {
        console.error('Error loading teams:', err);
        alert('Error loading teams!');
      }
    });
  }

  public onSubmitBooking(addForm: NgForm): void {
    const formValues = addForm.value;
  
    // Log the form values to debug
    console.log('Form Values:', formValues);
  
    // Prepare the booking object with extracted IDs
    const bookingData = {
      date: `${formValues.date}T00:00:00`, // Convert to LocalDateTime format
      startTime: `${formValues.date}T${formValues.startTime}:00`, // Combine date and time
      endTime: `${formValues.date}T${formValues.endTime}:00`, // Combine date and time
      team: {
        teamId: formValues.team// Ensure teamId is a valid integer
      },
      venue: {
        venueId: formValues.venue// Ensure venueId is a valid integer
      },
      visibility: formValues.visibility// Default visibility to false
    };
  
    // Log the constructed booking data to debug
    console.log(formValues.venue);
  
    // Send the booking data to the backend
    this.adminService.addBooking(bookingData).subscribe({
      next: (response) => {
        console.log('Booking added successfully:', response);
        addForm.reset(); // Reset the form after submission
        alert('Booking added successfully!');
      },
      error: (err) => {
        console.error('Error adding booking:', err);
        alert('Error adding booking. Please check the input and try again.');
      },
    });
  }
  
  /**
   * Load all activities from the backend
   */
  private loadActivities(): void {
    this.adminService.getActivities().subscribe({
      next: (response: Activity[]) => {
        this.activities = response;
        console.log('Loaded activities:', this.activities);
      },
      error: (err) => {
        console.error('Error loading activities:', err);
      }
    });
  }


  private loadVenues(): void {
    this.adminService.getVenues().subscribe({
      next: (response) => {
        this.venues = response;
        console.log('Loaded venues:', this.venues);
      },
      error: (err) => {
        console.error('Error loading venues:', err);
        alert('Error loading venues!');
      }
    });
  }

  /**
   * Add Product with Categories
   */
  public onSubmitProduct(addForm: NgForm): void {
    const formValues = addForm.value;
  
    // Convert category IDs to nested objects (if required by backend)
    formValues.categories = formValues.categories.map((id: number) => ({ categoryId: id }));
  
    this.adminService.addProduct(formValues).subscribe({
      next: (response: Product) => {
        console.log('Product added successfully:', response);
        addForm.reset();
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  /**
   * Add Category
   */
  public onSubmitCategory(addForm: NgForm): void {
    const category: Category = addForm.value;
    this.adminService.addCategory(category).subscribe({
      next: (response: Category) => {
        console.log('Category added:', response);
        addForm.reset();   // Reset the form after submission
        this.loadCategories();   // Reload categories after adding a new one
      },
      error: (error) => {
        console.error('Error adding category:', error);
      }
    });
  }

  /**
   * Add Venue with Selected Activity
   */
  public onSubmitVenue(addForm: NgForm): void {
    const formValues = addForm.value;

    // Attach the selected activity to the venue
    formValues.activity = { activityId: formValues.activity };

    this.adminService.addVenue(formValues).subscribe({
      next: (response: Venue) => {
        console.log('Venue added successfully:', response);
        addForm.reset();   // Reset the form after submission
      },
      error: (err) => {
        console.error('Error adding venue:', err);
      }
    });
  }

  /**
   * Add Activity
   */
  public onSubmitActivity(addForm: NgForm): void {
    const activity: Activity = addForm.value;
    this.adminService.addActivity(activity).subscribe({
      next: (response: Activity) => {
        console.log('Activity added successfully:', response);
        addForm.reset();   // Reset the form after submission
      },
      error: (error) => {
        console.error('Error adding activity:', error);
      }
    });
  }

  public onSubmitTeam(addForm: NgForm): void {
    const formValues = addForm.value;

    // Prepare team data
    const teamData = {
      name: formValues.name,
      visibility: formValues.visibility || false, // Default to false if not checked
    };

    // Submit team to the backend
    this.adminService.addTeam(teamData).subscribe({
      next: (response) => {
        console.log('Team added successfully:', response);
        addForm.reset();
        alert('Team added successfully!');
      },
      error: (err) => {
        console.error('Error adding team:', err);
        alert('Error adding team!');
      }
    });
  }
}
