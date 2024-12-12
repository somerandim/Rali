import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch user profile by email (or another identifier)
  getProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Attach JWT token
    });

    return this.http.get<any>(`${this.apiUrl}/user/profile`, { headers });
  }


  // Update user profile
  updateProfile(data: any): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Set Authorization header with Bearer token
    });
    return this.http.put<any>(`${this.apiUrl}/user/update`, data, { headers });
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Attach the token as Bearer
    });

    return this.http.post<any>(`${this.apiUrl}/user/logout`, {}, { headers }); // Send POST request to logout endpoint
  }
}

