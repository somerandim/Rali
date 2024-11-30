import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  details?: {
    date: string;
    time: string;
    court: string;
    type: string;
  };
}

interface BillingAddress {
  street: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  billingAddress: BillingAddress = {
    street: '',
    city: '',
    country: '',
  };

  constructor() {
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

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }

  getTotal(): number {
    return this.getSubtotal();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  checkout(): void {
    console.log('Checkout initiated with address:', this.billingAddress);
    alert('Checkout complete!');
  }
}
