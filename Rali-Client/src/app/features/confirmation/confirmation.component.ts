import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ConfirmationComponent implements OnInit {
  sportName: string = '';
  sportImage: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  selectedCourt: string = '';
  bookingType: string = '';
  sportColor: string = 'bg-gray-200';
  price: number = 0;
  teamId: number | null = null;
 // Store teamId

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sportName = params['sport'] || 'Sport';
      this.sportImage = params['image'] || '';
      this.selectedDate = params['date'] || '';
      this.selectedTime = params['time'] || '';
      this.selectedCourt = params['court'] || 'Not Selected';
      this.bookingType = params['type'] || 'Private';
      this.sportColor = params['color'] || 'bg-gray-200';
      this.price = params['price'] ? parseFloat(params['price']) : 0;
  
      // Retrieve and parse the teamId
      this.teamId = params['teamId'] ? Number(params['teamId']) : null;
  
      console.log(`Received teamId: ${this.teamId}`);
    });
  }
  
  
  confirmBooking(): void {
    // Prepare the booking details with teamId
    const bookingDetails = {
      name: `${this.sportName} Booking`,
      price: this.price,
      quantity: 1,
      image: this.sportImage,
      details: {
        date: this.selectedDate,
        time: this.selectedTime,
        court: this.selectedCourt,
        type: this.bookingType,
      },
      teamId: this.teamId, // Include teamId in booking details
    };

    const storedCart = localStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    cartItems.push(bookingDetails);

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Navigate to the cart page
    this.router.navigate(['/cart']);
  }

  navigateBooking(): void {
    this.router.navigate(['/court-booking'], {
      queryParams: {
        sport: this.sportName,
        image: this.sportImage,
        color: this.sportColor,
      },
    });
  }
}
