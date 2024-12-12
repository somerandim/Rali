  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { Router } from '@angular/router';
  import { CartService } from './cart.service';
import { Booking } from '../../models/Booking';
  interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    teamId?: number; // Add teamId as an optional property
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
  export class CartComponent implements OnInit  {
    cartItems: CartItem[] = [];
    billingAddress: BillingAddress = {
      street: '',
      city: '',
      country: '',
    };

    constructor(private router: Router, private cartService: CartService) {
      const storedItems = localStorage.getItem('cart');
      this.cartItems = storedItems ? JSON.parse(storedItems) : [];
    }
    ngOnInit(): void {
      const storedCart = localStorage.getItem('cart');
      this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    
      // Log all team IDs from the cart items
      this.cartItems.forEach((item) => {
        if (item.teamId) {
          console.log(`Team ID from Cart: ${item.teamId}`);
        }
      });
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

    isBillingAddressValid(): boolean {
      return (
        this.billingAddress.street.trim() !== '' &&
        this.billingAddress.city.trim() !== '' &&
        this.billingAddress.country.trim() !== ''
      );
    }

    checkout(): void {
      if (!this.isBillingAddressValid()) {
        alert('Please fill in all the required billing address fields before proceeding.');
        return;
      }
    
      const receiptData = {
        total: this.getTotal(),
        address: `${this.billingAddress.street}, ${this.billingAddress.city}, ${this.billingAddress.country}`,
        date: new Date().toISOString(),
        paymentMethod: 'Credit Card',
      };
    
      // Create receipt
      this.cartService.addReceipt(receiptData).subscribe({
        next: (receiptResponse) => {
          const receiptId = receiptResponse.receiptId;
          console.log('Receipt Created:', receiptResponse);
    
          // Link products and bookings to the receipt
          this.linkProductsToReceipt(receiptId);
          this.linkBookingsToReceipt(receiptId);
    
          // Add user to team for each booking
          
    
          alert('Checkout complete! Your receipt has been saved.');
          
          localStorage.removeItem('cart');
          localStorage.removeItem('bookings');
        },
        error: (err) => {
          console.error('Error creating receipt:', err);
          alert('Failed to complete checkout. Please try again.');
        },
      });
    }
    private addUserToTeams(): void {
      this.cartItems.forEach((item) => {
        if (item.teamId) { // Ensure teamId exists in the item
          console.log(`Fetching booking IDs for adding users to teams for team ID: ${item.teamId}`);
    
          // Fetch booking IDs by teamId
          this.cartService.getBookingIdFromTeamId(item.teamId).subscribe({
            next: (bookingIdResponses: number[]) => {
              if (Array.isArray(bookingIdResponses) && bookingIdResponses.length > 0) {
                bookingIdResponses.forEach((bookingId) => {
                  const userId = this.cartService.getUserId(); // Retrieve the userId
                  console.log(`Adding user ${userId} to team for Booking ID: ${bookingId}`);
    
                  // Add the user to the team associated with the booking
                  this.cartService.addUserToTeam(bookingId, userId).subscribe({
                    next: (response) => {
                      console.log(`Successfully added User ID ${userId} to Booking ID ${bookingId}`, response);
                    },
                    error: (err) => {
                      console.error(`Error adding User ID ${userId} to Booking ID ${bookingId}:`, err);
                    },
                  });
                });
              } else {
                console.warn(`No bookings found for team ID: ${item.teamId}`);
              }
            },
            error: (err) => {
              console.error(`Error fetching Booking IDs for team ID ${item.teamId}:`, err);
            },
          });
        } else {
          console.warn(`No teamId found for item: ${item.name}`);
        }
      });
    
      console.log('Finished processing user additions to teams.');
    }
    
    
    
  private linkProductsToReceipt(receiptId: number): void {
    this.cartItems.forEach((item) => {
      // Fetch the product ID by name
      this.cartService.getProductIdByName(item.name).subscribe({
        next: (productIdResponse) => {
          const productId = productIdResponse;

          // Prepare the request payload
          const requestPayload = {
            productId: productId,
            receipts: [
              {
                receiptId: receiptId,
              },
            ],
          };

          // Send the request to link the product to the receipt
          this.cartService.linkProductToReceipt(requestPayload).subscribe({
            next: (response) => {
              console.log(`Successfully linked Product ID ${productId} to Receipt ID ${receiptId}`, response);
            },
            error: (err) => {
              console.error(`Error linking Product ID ${productId} to Receipt ID ${receiptId}:`, err);
            },
          });
        },
        error: (err) => {
          console.error(`Error fetching Product ID for ${item.name}:`, err);
        },
      });
    });

    console.log('Finished processing products in the cart.');
  }

  logTeamIdsFromBookings(): void {
    const storedBookings = localStorage.getItem('bookings');
    
    if (!storedBookings) {
      console.error('No bookings found in the cart.');
      return;
    }
  
    const bookings = JSON.parse(storedBookings);
  
    if (!Array.isArray(bookings) || bookings.length === 0) {
      console.error('No valid bookings found in the cart.');
      return;
    }
  
    console.log('Team IDs from Booking Cards:');
    bookings.forEach((booking: any) => {
      console.log(`Team ID: ${booking.teamId}`);
    });
  }

  saveBookingToCart(booking: any): void {
    const storedBookings = localStorage.getItem('bookings');
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];
  
    bookings.push(booking);
  
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  private linkBookingsToReceipt(receiptId: number): void {
    this.cartItems.forEach((item) => {
      if (item.teamId) { // Ensure teamId exists in the item
        console.log(`Fetching booking IDs for team ID: ${item.teamId}`);
  
        // Fetch the booking IDs by teamId
        this.cartService.getBookingIdFromTeamId(item.teamId).subscribe({
          next: (bookingIdResponses: number[]) => {
            if (Array.isArray(bookingIdResponses) && bookingIdResponses.length > 0) {
              bookingIdResponses.forEach((bookingId) => {
                // Prepare the request payload for each booking ID
                const requestPayload = {
                  bookingId: bookingId,
                  receipts: [
                    {
                      receiptId: receiptId,
                    },
                  ],
                };
  
                // Send the request to link the booking to the receipt
                this.cartService.linkBookingToReceipt(requestPayload).subscribe({
                  next: (response) => {
                    console.log(`Successfully linked Booking ID ${bookingId} to Receipt ID ${receiptId}`, response);
                    this.addUserToTeams();
                  },
                  error: (err) => {
                    console.error(`Error linking Booking ID ${bookingId} to Receipt ID ${receiptId}:`, err);
                  },
                });
              });
            } else {
              console.warn(`No bookings found for team ID: ${item.teamId}`);
            }
          },
          error: (err) => {
            console.error(`Error fetching Booking IDs for team ID ${item.teamId}:`, err);
          },
        });
      } else {
        console.warn(`No teamId found for item: ${item.name}`);
      }
    });
  
    console.log('Finished processing bookings in the cart.');
  }
    

  }