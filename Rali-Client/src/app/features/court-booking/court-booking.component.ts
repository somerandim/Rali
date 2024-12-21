import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtbookingService } from './courtbooking.service';
import { Activity } from '../../models/Activity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-court-booking',
  templateUrl: './court-booking.component.html',
  styleUrls: ['./court-booking.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CourtBookingComponent implements OnInit {
  sport = {
    name: '',
    image: '',
    color: '',
    activityId: 0,
  };

  bookings: any[] = [];
  filteredBookings: any[] = []; // Filtered bookings based on visibility
  bookingType: string = 'Private'; // Default booking type

  constructor(
    private bookingService: CourtbookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract query parameters
    this.route.queryParams.subscribe((params) => {
      this.sport.name = params['sport'] || '';
      this.sport.image = params['image'] || '';
      this.sport.color = params['color'] || '';

      if (this.sport.name) {
        this.fetchActivityIdByName(this.sport.name); // Fetch activity ID and bookings
      }
    });
  }

  /**
   * Get sport details by name
   */
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

    return sports.find((sport) => sport.name.toLowerCase() === sportName.toLowerCase()) || {
      name: sportName,
      image: 'assets/default.png',
      color: 'bg-gray-400',
    };
  }

  /**
   * Navigate to confirmation page
   */
  goToConfirmation(booking: any): void {
    const sportDetails = this.getSportDetails(this.sport.name);

    this.router.navigate(['/confirmation'], {
      queryParams: {
        sport: sportDetails.name,
        image: sportDetails.image,
        color: sportDetails.color,
        venue: booking.venueName || 'Unknown Venue',
        date: booking.date,
        time: `${booking.startTime || 'N/A'} - ${booking.endTime || 'N/A'}`,
        court: booking.venueName || 'Not Selected',
        type: 'Private',
        teamId: booking.teamId || 'N/A',
        price: booking.venuePrice || 0,
      },
    });
  }

  /**
   * Fetch activity ID by name
   */
  private fetchActivityIdByName(activityName: string): void {
    this.bookingService.getActivities().subscribe({
      next: (activities: Activity[]) => {
        const activity = activities.find(
          (a) => a.name.toLowerCase() === activityName.toLowerCase()
        );

        if (activity) {
          this.sport.activityId = activity.activityId;
          this.loadActivityBookings();
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

  /**
   * Load bookings by activity ID
   */
  private loadActivityBookings(): void {
    this.bookingService.getBookingsByActivityId(this.sport.activityId).subscribe({
      next: (response: any[]) => {
        console.log('Raw response from backend:', response);

        // Transform raw data into desired format
        this.bookings = response.map((booking: any) => ({
          bookingId: booking.bookingId,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          teamId: booking.teamId,
          teamVisibility: booking.teamVisibility,
          venueName: booking.venueName,
          activityName: booking.activityName,
          venuePrice: booking.venuePrice,
        }));

        // Filter only bookings where teamVisibility is "true"
        this.filteredBookings = this.bookings.filter(
          (booking) => booking.teamVisibility === 'false'
        );

        // Log filtered bookings
        console.log('Filtered bookings with teamVisibility "false":', this.filteredBookings);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        alert('Error loading bookings!');
      },
    });
  }

  /**
   * Navigate to Public Booking
   */
  navigateToPublicBooking(): void {
    if (this.sport.name) {
      this.router.navigate([`${this.sport.name.toLowerCase()}/public`], {
        queryParams: { activityName: this.sport.name },
      });
    }
  }

  /**
   * Navigate back home
   */
  navigateHome(): void {
    this.router.navigate(['']);
  }

  /**
   * Redirect to Private Booking
   */
  redirectToPrivateBooking(): void {
    this.router.navigate(['/court-booking'], {
      queryParams: { sport: this.sport.name },
    });
  }
}
