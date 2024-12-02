import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../models/Product';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  constructor(private adminService: AdminService) {}

  public onAddProduct(addForm: NgForm): void {
    this.adminService.addProduct(addForm.value).subscribe((response: Product) => {
      console.log('Product added:', response);
      addForm.reset(); // Reset the form after submission
    });
  }

  public onAddCategory(addForm: NgForm): void {
    this.adminService.addCategory(addForm.value).subscribe((response) => {
      console.log('Category added:', response);
      addForm.reset();
    });
  }

  public onAddVenue(addForm: NgForm): void {
    this.adminService.addVenue(addForm.value).subscribe((response) => {
      console.log('Venue added:', response);
      addForm.reset();
    });
  }

  public onAddActivity(addForm: NgForm): void {
    this.adminService.addActivity(addForm.value).subscribe((response) => {
      console.log('Activity added:', response);
      addForm.reset();
    });
  }
}
