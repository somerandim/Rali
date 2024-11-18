import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-court-booking',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './court-booking.component.html',
  styleUrls: ['./court-booking.component.css']
})
export class CourtBookingComponent implements OnInit {
  sport = {
    name: '',
    image: '',
    color: ''
  };

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Generate days 1-31
  times: string[] = ['7:00 AM - 9:00 AM', '10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Read query parameters
    this.route.queryParams.subscribe(params => {
      this.sport.name = params['sport'] || 'Sport';
      this.sport.image = params['image'] || '';
      this.sport.color = params['color'] || 'bg-gray-200';
    });
  }

  saveInformation(): void {
    alert(`Booking saved for ${this.sport.name}!`);
    this.router.navigate(['/confirmation']);
  }
}
