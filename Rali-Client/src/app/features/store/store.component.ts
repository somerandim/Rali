import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  categories: string[] = ['Futsal', 'Running', 'Swimming', 'Basketball', 'Judo', 'Volleyball', 'Pingpong']; // Dropdown items
  isDropdownOpen: boolean = false; // State to control dropdown visibility

  /**
   * Toggle the dropdown visibility
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  /**
   * Handle category selection and filter logic
   * @param category Selected category
   */
  filterCategory(category: string): void {
    console.log(`Filtered by category: ${category}`);
    // Add your filtering logic here
    this.isDropdownOpen = false; // Close dropdown after selecting a category
  }

  addToCart(product: any): void {
    const cart = localStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];
  
    const existingItemIndex = cartItems.findIndex((item: any) => item.name === product.name);
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  
}
