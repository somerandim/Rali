import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent{
  @Input() product: any; // Input for the product data

  buttonStates: Map<string, boolean> = new Map();

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
    return this.buttonStates.get(productName) || false;
  }
}