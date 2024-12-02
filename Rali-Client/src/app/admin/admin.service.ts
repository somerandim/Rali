import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Venue } from '../models/Venue';
import { Activity } from '../models/Activity';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
 
 
    private apiServerUrl = 'http://localhost:8080/admin';
  
    constructor(private httpclient: HttpClient) {}
  
    // Add a product
    public addProduct(product: Product): Observable<Product> {
      return this.httpclient.post<Product>(`${this.apiServerUrl}/product/add`, product);
    }
  
    // Add a category
    public addCategory(category: Category): Observable<Category> {
      return this.httpclient.post<Category>(`${this.apiServerUrl}/category/add`, category);
    }
  
    // Add a venue
    public addVenue(venue: Venue): Observable<Venue> {
      return this.httpclient.post<Venue>(`${this.apiServerUrl}/venue/add`, venue);
    }
  
    // Add an activity
    public addActivity(activity: Activity): Observable<Activity> {
      return this.httpclient.post<Activity>(`${this.apiServerUrl}/activity/add`, activity);
    }
  }
  




