import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicbookingService } from '../publicbooking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicbooking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicbooking.component.html',
  styleUrls: ['./publicbooking.component.css'],
})
export class PublicbookingComponent implements OnInit {
  bookings: any[] = []; // All bookings from backend
  filteredBookings: any[] = []; // Only filtered bookings
  activityId!: number; // Extracted Activity ID
  activityName: string = ''; // Activity Name from query
  bookingType: string = 'Public'; // Default booking type

  constructor(
    private bookingService: PublicbookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.activityName = params['activityName'] || '';
      if (this.activityName) {
        this.fetchActivityIdByName(this.activityName); // Fetch ID on load
      }
    });
  }

  goToConfirmation(booking: any): void {
    const selectedSport = this.activityName;
    const sportDetails = this.getSportDetails(selectedSport);

    if (!booking.teamId) {
      console.warn('No teamId found for booking:', booking);
    }

    this.router.navigate(['/confirmation'], {
      queryParams: {
        sport: sportDetails.name,
        image: sportDetails.image,
        color: sportDetails.color,
        venue: booking.venueName || 'Unknown Venue',
        date: booking.date,
        time: `${booking.startTime || 'N/A'} - ${booking.endTime || 'N/A'}`,
        court: booking.venueName || 'Not Selected',
        type: 'Public',
        teamId: booking.teamId || 'N/A',
        price: booking.price || 0,
      },
    });
  }

  getSportDetails(sportName: string) {
    const sports = [
      { name: 'FootBall', image: 'assets/futsal.png', color: 'bg-green-800' },
      { name: 'Running', image: 'assets/running.png', color: 'bg-red-600' },
      { name: 'Swimming', image: 'assets/swimming.png', color: 'bg-blue-700' },
      { name: 'Basketball', image: 'assets/basketball.png', color: 'bg-orange-600' },
      { name: 'Judo', image: 'assets/judo.png', color: 'bg-red-800' },
      { name: 'Volleyball', image: 'assets/volleyball.png', color: 'bg-yellow-500' },
      { name: 'Ping-Pong', image: 'assets/pingpong.png', color: 'bg-teal-700' },
    ];

    return (
      sports.find((sport) => sport.name.toLowerCase() === sportName.toLowerCase()) || {
        name: sportName,
        image: 'assets/default.png',
        color: 'bg-gray-400',
      }
    );
  }

  private fetchActivityIdByName(activityName: string): void {
    this.bookingService.getActivities().subscribe({
      next: (activities: any[]) => {
        const activity = activities.find(
          (a) => a.name.toLowerCase() === activityName.toLowerCase()
        );

        if (activity) {
          this.activityId = activity.activityId;
          this.loadActivityBookings(); // Load bookings
        } else {
          console.error('Activity not found for name:', activityName);
        }
      },
      error: (err) => {
        console.error('Error loading activities:', err);
        alert('Error loading activities!');
      },
    });
  }

  private loadActivityBookings(): void {
    this.bookingService.getBookingsByActivityId(this.activityId).subscribe({
      next: (response) => {
        console.log(response);
        this.bookings = response.map((booking: any) => {
          return {
            bookingId: booking.bookingId,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            teamId: booking.teamId,
            venueName: booking.venueName,
            activityName: booking.activityName,
          };
        });

        this.filteredBookings = this.bookings.filter(
          (booking) => booking.teamId && booking.venueName && booking.startTime && booking.endTime
        );
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        alert('Error loading bookings!');
      },
    });
  }

  navigateHome(): void {
    this.router.navigate(['']);
  }

  navigateToPublicBooking(): void {
    this.router.navigate(['/public'], {
      queryParams: { activityName: this.activityName },
    });
  }

  redirectToPrivateBooking(): void {
    this.router.navigate(['/court-booking'], {
      queryParams: { sport: this.activityName }
    });
  }

}
