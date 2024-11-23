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

  times: string[] = ['10:00 AM - 12:00 AM', '1:00 PM - 3:00 PM', '4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'];
  courts: string[] = []; // Array for court options
  selectedDate: Date | null = null;
  selectedCourt: string | null = null;
  bookingType: string = 'Private'; // Default booking type

  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentMonth: Date = new Date();
  calendarDays: Date[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sport.name = params['sport'] || 'Sport';
      this.sport.image = params['image'] || '';
      this.sport.color = params['color'] || 'bg-gray-200';

      // Generate court options dynamically based on the sport
      const sportInitial = this.sport.name.charAt(0).toUpperCase();
      this.courts = Array.from({ length: 3 }, (_, i) => `${sportInitial}${i + 1}`);
    });
    this.generateCalendar(this.currentMonth);
  }

  saveInformation(): void {
    const selectedTime = (document.getElementById('time') as HTMLSelectElement).value;
    const selectedCourt = (document.getElementById('court') as HTMLSelectElement).value;

    if (this.selectedDate && selectedTime && selectedCourt) {
      this.router.navigate(['/confirmation'], {
        queryParams: {
          sport: this.sport.name,
          image: this.sport.image,
          date: this.selectedDate?.toISOString(),
          time: selectedTime,
          court: selectedCourt,
          color: this.sport.color // Pass the color
        }
      });
    } else {
      alert('Please select a date, time, and court!');
    }
  }

  generateCalendar(date: Date): void {
    this.calendarDays = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const prevMonthDays = firstDay.getDay();
    const nextMonthDays = 6 - lastDay.getDay();

    // Add previous month's days
    for (let i = 0; i < prevMonthDays; i++) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(prevDate.getDate() - prevMonthDays + i);
      this.calendarDays.push(prevDate);
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    // Add next month's days
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(lastDay.getDate() + i);
      this.calendarDays.push(nextDate);
    }
  }

  changeMonth(step: number): void {
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(this.currentMonth.getMonth() + step);

    // Ensure you cannot navigate to past months
    if (step < 0 && this.isPastMonth(newDate)) return;

    this.currentMonth = newDate;
    this.generateCalendar(this.currentMonth);
  }

  isPastMonth(date: Date = this.currentMonth): boolean {
    const today = new Date();
    today.setDate(1); // Only compare year and month
    return date < today;
  }

  isDisabled(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable dates not in the current month or in the past
    return (
      date.getMonth() !== this.currentMonth.getMonth() ||
      date.getFullYear() !== this.currentMonth.getFullYear() ||
      date < today
    );
  }

  selectDate(date: Date): void {
    if (!this.isDisabled(date)) {
      this.selectedDate = date;
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }

  isSelectedDate(date: Date): boolean {
    return (
      this.selectedDate?.getDate() === date.getDate() &&
      this.selectedDate?.getMonth() === date.getMonth() &&
      this.selectedDate?.getFullYear() === date.getFullYear()
    );
  }

  setBookingType(type: string): void {
    this.bookingType = type;
  }
}
