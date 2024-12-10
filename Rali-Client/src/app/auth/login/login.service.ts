import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080';  // Your backend login API URL

  constructor(private http: HttpClient) {}

  // Make the login request and store the JWT token in localStorage
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/user/login`, loginData); // Corrected to match endpoint
  }

  // Store JWT Token in localStorage
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);  // Store the token in localStorage
  }

  // Get JWT Token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');  // Retrieve the token from localStorage
  }

  // Remove JWT Token from localStorage (logout)
  removeToken(): void {
    localStorage.removeItem('jwtToken');  // Remove the token from localStorage
  }
}
