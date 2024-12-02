import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
  
})
export class SignupService {

  private apiServerUrl = "http://localhost:8080/user";
  constructor(private httpclient: HttpClient) {}

  public addUser(user: User): Observable<User>{

    return this.httpclient.post<User>(`${this.apiServerUrl}/add`,user);

  }
}
