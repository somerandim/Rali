import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-court-booking',
    templateUrl: './court-booking.component.html',
    styleUrls: ['./court-booking.component.css']
})
export class CourtBookingComponent {
    constructor(private router: Router) {}

    saveInformation() {
        this.router.navigate(['/confirmation']);
    }
}
