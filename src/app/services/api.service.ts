import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Submit investor form
   */
  submitInvestorForm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/investors`, data);
  }

  /**
   * Submit startup form
   */
  submitStartupForm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/startups`, data);
  }

  /**
   * Fetch dynamic tables (company sectors, funding amounts, etc.)
   */
  getDynamicTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dynamic-tables`);
  }
}
