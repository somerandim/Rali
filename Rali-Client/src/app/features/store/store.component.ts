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
  categories: string[] = ['Football', 'Running', 'Swimming', 'Basketball', 'Judo', 'Volleyball', 'Pingpong'];
  isDropdownOpen: boolean = false;
  buttonStates: Map<string, boolean> = new Map(); // Track button state for each product
  originalProducts = [
    { name: 'Basketball', price: 40, image: 'assets/1.jpg' },
    { name: 'FootBall', price: 50, image: 'assets/2.jfif' },
    { name: 'Judo Headgear', price: 25, image: 'assets/3.jpg' },
    { name: 'Pingpong Paddle', price: 55, image: 'assets/4.png' },
    { name: 'Running Sweat Band', price: 5, image: 'assets/5.jpg' },
    { name: 'Swimming Goggles', price: 15, image: 'assets/6.png' },
    { name: 'Volleyball', price: 20, image: 'assets/7.png' },
    { name: 'FootBall', price: 45, image: 'assets/8.jfif' }
  ];
  products = [...this.originalProducts]; // Displayed products (filtered or not)

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  filterCategory(category: string): void {
    this.products = this.originalProducts.filter(product =>
      product.name.toLowerCase().includes(category.toLowerCase())
    );
    this.isDropdownOpen = false;
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

    // Temporarily change button text
    this.buttonStates.set(product.name, true); // Set to "ADDED!"
    setTimeout(() => {
      this.buttonStates.set(product.name, false); // Revert after 2 seconds
    }, 2000);
  }

  isButtonAdded(productName: string): boolean {
    return this.buttonStates.get(productName) || false; // Default to false if no state exists
  }
}
