import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from '../../models/Venue';
import { Activity } from '../../models/Activity';
import { Booking } from '../../models/Booking';


@Injectable({
  providedIn: 'root'
})
export class CourtbookingService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiServerUrl}/activity/all`);
  }

  /**
   * Fetch venues by activity ID from the backend
   */
  public getVenuesByActivity(activityId: number): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiServerUrl}/venue/by-activity/${activityId}`);
  }

  getBookingsByActivityId(activityId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiServerUrl}/booking/by-activity/${activityId}`);
  }
}



