import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitInvestorForm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/investors`, data);
  }

  submitStartupForm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/startups`, data);
  }
}
