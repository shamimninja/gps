import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://connect.paj-gps.de/api/v1';
  private email = 'testkunde@pajgps.de';
  private password = 'app123#.';
  public token: string | null = null;

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      email: this.email,
      password: this.password
    });
  }
}

