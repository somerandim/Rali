import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service';
import { ProductComponent } from '../../shared/product/product.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  categories: string[] = ['None', 'Football', 'Running', 'Swimming', 'Basketball', 'Judo', 'Volleyball', 'Pingpong'];
  isDropdownOpen: boolean = false;
  
  originalProducts = [
    { name: 'Basketball', price: 40, image: 'assets/1.jpg' },
    { name: 'FootBall', price: 50, image: 'assets/2.jfif' },
    { name: 'Judo Headgear', price: 25, image: 'assets/3.jpg' },
    { name: 'Pingpong Paddle', price: 55, image: 'assets/4.png' },
    { name: 'Running Sweat Band', price: 5, image: 'assets/5.jpg' },
    { name: 'Swimming Goggles', price: 15, image: 'assets/6.png' },
    { name: 'Volleyball', price: 20, image: 'assets/7.png' },
    { name: 'FootBall', price: 45, image: 'assets/8.jfif' },
  ];
  products = [...this.originalProducts]; // Displayed products (filtered or not)


  constructor(private searchService: SearchService) {}
  
  ngOnInit(): void {
    // Subscribe to the search query
    this.searchService.searchQuery$.subscribe(query => {
      this.filterBySearch(query);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  filterCategory(category: string): void {
    if (category === 'None') {
      this.products = [...this.originalProducts]; // Reset to show all products
    } else {
      this.products = this.originalProducts.filter(product =>
        product.name.toLowerCase().includes(category.toLowerCase())
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
