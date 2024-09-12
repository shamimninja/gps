import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl = 'https://connect.paj-gps.de/api';
  private token: string | null = null;  // Token from AuthService

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  getDevices(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/device`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  getLastTrackingData(deviceId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/trackerdata/${deviceId}/last_points?lastPoints=50`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }
}

