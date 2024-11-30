import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for pipes
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor() {
    // Load cart items from localStorage or a service
    const storedItems = localStorage.getItem('cart');
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
  }

  incrementQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.saveCart();
  }

  decrementQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCart();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
