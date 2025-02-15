import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://us-central1-atom-challenge-d6b14.cloudfunctions.net/api';
  private headers = new HttpHeaders({
    'Accept': '*/*',
    'authorization': '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, { headers: this.headers });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, { headers: this.headers });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, { headers: this.headers });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, { headers: this.headers });
  }
}