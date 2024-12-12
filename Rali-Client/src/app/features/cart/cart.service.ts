import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../models/Booking';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Add a receipt
  addReceipt(data: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Attach Bearer token
    });
    return this.http.post<any>(`${this.apiUrl}/receipt/add`, data, { headers });
  }

  // Get product ID by name
  getProductIdByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/get-id-by-name/${name}`);
  }

  // Link product to receipt
  linkProductToReceipt(data: { productId: number; receipts: { receiptId: number }[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/set-receipts`, data, {
      responseType: 'text', // Expect plain text response
    });
  }

  

  // Add Booking to Receipt
  linkBookingToReceipt(data: { bookingId: number; receipts: { receiptId: number }[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/booking/set-receipts`, data);
  }
  getBookingIdFromTeamId(teamId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/booking/bookings/by-team/${teamId}`);
  }

  addUserToTeam(bookingId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/booking/${bookingId}/add-users`;
    const payload = { userId }; // Pass the userId in the request body
    return this.http.post<any>(url, payload);
  }
  
  getUserId(): number {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Decode the token to get the userId (assuming a JWT structure)
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
      return payload.userId;
    }
    throw new Error('User ID not found. User is not logged in.');
  }
  

}
 

  
  

