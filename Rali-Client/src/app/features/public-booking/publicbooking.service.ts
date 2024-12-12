import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../../models/Activity';
import { Booking } from '../../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class PublicbookingService {

  private apiUrl = 'http://localhost:8080';  // Your backend API URL

  constructor(private http: HttpClient) {}

  /**
   * Get All Activities
   */
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activity/all`);
  }

  /**
   * Get Bookings by Activity ID
   */
  getBookingsByActivityId(activityId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking/by-activity/${activityId}`);
  }
}
