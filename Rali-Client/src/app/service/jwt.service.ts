import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly tokenKey: string = 'jwtToken'; // Key to store/retrieve token

  constructor() { }

  // Save JWT token to localStorage (or sessionStorage)
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Save token to localStorage
  }

  // Get JWT token from localStorage (or sessionStorage)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve token from localStorage
  }

  // Remove JWT token from localStorage (or sessionStorage)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey); // Remove token from localStorage
  }

  // Check if the token exists
  hasToken(): boolean {
    return !!this.getToken(); // Returns true if token exists
  }
}
