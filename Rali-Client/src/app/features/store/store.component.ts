import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';
import { ProductComponent } from '../../shared/product/product.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  categories: string[] = []; // Fetch from backend
  products: any[] = [];      // Products list
  originalProducts: any[] = [];
  isDropdownOpen: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    // Fetch categories
    this.storeService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.map(category => category.name);
        this.categories.unshift('All'); // Add "All" option
      },
      error: () => alert('Error loading categories!'),
    });

    // Fetch products
    this.storeService.getProducts().subscribe({
      next: (response) => {
        this.originalProducts = response;
        this.products = [...response];
      },
      error: () => alert('Error loading products!'),
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  filterCategory(category: string): void {
    if (category === 'All') {
      this.products = [...this.originalProducts];
    } else {
      this.products = this.originalProducts.filter(product =>
        product.category.name.toLowerCase() === category.toLowerCase()
      );
    }
    this.isDropdownOpen = false;
  }

  filterBySearch(query: string): void {
    if (query.trim() === '') {
      this.products = [...this.originalProducts];
    } else {
      this.products = this.originalProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
}
