import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  private apiServerUrl = 'http://localhost:8080'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch products from backend
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/product/all`);
  }

  // Fetch categories from backend
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/category/all`);
  }
}
