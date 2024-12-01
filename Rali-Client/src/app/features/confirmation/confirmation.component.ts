import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  sportName: string = '';
  sportImage: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  selectedCourt: string = '';
  bookingType: string = '';
  sportColor: string = 'bg-gray-200';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sportName = params['sport'] || 'Sport';
      this.sportImage = params['image'] || '';
      this.selectedDate = params['date'] || '';
      this.selectedTime = params['time'] || '';
      this.selectedCourt = params['court'] || 'Not Selected';
      this.bookingType = params['type'] || 'Private';
      this.sportColor = params['color'] || 'bg-gray-200';
    });
  }

  confirmBooking(): void {
    const bookingDetails = {
      name: `${this.sportName} Booking`,
      price: 20,
      quantity: 1,
      image: this.sportImage,
      details: {
        date: this.selectedDate,
        time: this.selectedTime,
        court: this.selectedCourt,
        type: this.bookingType,
      },
    };

    const storedCart = localStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    cartItems.push(bookingDetails);

    localStorage.setItem('cart', JSON.stringify(cartItems));

    this.router.navigate(['/cart']);
  }

  navigateBooking(): void {
    this.router.navigate(['/court-booking'], {
      queryParams: {
        sport: this.sportName,
        image: this.sportImage,
        color: this.sportColor
      }
    });
  }
  
}
