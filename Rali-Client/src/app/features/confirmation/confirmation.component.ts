import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  sportName: string = '';
  sportImage: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  bookingType: string = 'Private'; // Default booking type
  sportColor: string = 'bg-gray-200';
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sportName = params['sport'] || 'Sport';
      this.sportImage = params['image'] || '';
      this.selectedDate = params['date'] || '';
      this.selectedTime = params['time'] || '';
      this.sportColor = params['color'] || 'bg-gray-200';
    });
  }

  setBookingType(type: string): void {
    this.bookingType = type;
  }
}
