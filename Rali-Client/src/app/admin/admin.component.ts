import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Activity } from '../models/Activity';
import { Venue } from '../models/Venue';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private adminService: AdminService) {}

  /**
   * Add Product
   */
  public onSubmitProduct(addForm: NgForm): void {
    const product: Product = addForm.value;
    this.adminService.addProduct(product).subscribe({
      next: (response: Product) => {
        console.log('Product added:', response);
        addForm.reset(); // Reset the form after submission
      },
      error: (error) => {
        console.error('Error adding product:', error);
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
        addForm.reset(); // Reset the form after submission
      },
      error: (error) => {
        console.error('Error adding category:', error);
      }
    });
  }

  /**
   * Add Venue
   */
  public onSubmitVenue(addForm: NgForm): void {
    const venue: Venue = addForm.value;
    this.adminService.addVenue(venue).subscribe({
      next: (response: Venue) => {
        console.log('Venue added:', response);
        addForm.reset(); // Reset the form after submission
      },
      error: (error) => {
        console.error('Error adding venue:', error);
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
        console.log('Activity added:', response);
        addForm.reset(); // Reset the form after submission
      },
      error: (error) => {
        console.error('Error adding activity:', error);
      }
    });
  }
}
