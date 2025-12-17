import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // IMPORTANT: Ensure this matches your Swagger URL exactly
  private baseUrl = 'https://localhost:7194/api/Auth'; 

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    // This calls api/Auth/Register in your controller
    return this.http.post(`${this.baseUrl}/Register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, data);
  }
}