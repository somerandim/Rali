import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Venue } from '../models/Venue';
import { Activity } from '../models/Activity';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private httpclient: HttpClient) {}

  // Add a product
  public addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpclient.post<Product>(`${this.apiServerUrl}/product/add`, product, { headers });
  }

  // Add a category
  public addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpclient.post<Category>(`${this.apiServerUrl}/category/add`, category, { headers });
  }

  // Get all categories
  public getCategories(): Observable<Category[]> {
    return this.httpclient.get<Category[]>(`${this.apiServerUrl}/category/all`);
  }

  // Add an activity
  public addActivity(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpclient.post<Activity>(`${this.apiServerUrl}/activity/add`, activity, { headers });
  }

  // Add a venue
  public addVenue(venue: Venue): Observable<Venue> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpclient.post<Venue>(`${this.apiServerUrl}/venue/add`, venue, { headers });
  }

  // Get all venues
  public getVenues(): Observable<Venue[]> {
    return this.httpclient.get<Venue[]>(`${this.apiServerUrl}/venue/all`);
  }

  public getActivities(): Observable<Activity[]> {
    return this.httpclient.get<Activity[]>(`${this.apiServerUrl}/activity/all`);
  }


  // Add a new team
  public addTeam(team: any): Observable<any> {
    return this.httpclient.post<any>(`${this.apiServerUrl}/team/add`, team);
  }


  // Fetch all teams
  public getTeams(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.apiServerUrl}/team/all`);
  }

  // Add a new booking
  public addBooking(booking: any): Observable<any> {
    return this.httpclient.post<any>(`${this.apiServerUrl}/booking/add`, booking);
  }
}




