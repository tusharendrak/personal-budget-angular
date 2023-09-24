import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000'; // Replace with your actual server URL
  private mlFrameworks: any[] = []; // Store fetched data

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject(this.mlFrameworks);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Method to fetch ML frameworks from the backend
  getMLFrameworks(): void {
    if (this.mlFrameworks.length === 0) {
      this.fetchDataFromBackend().subscribe(data => {
        this.mlFrameworks = data;
        this.dataSubject.next(this.mlFrameworks);
      });
    }
  }

  private fetchDataFromBackend(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mlFrameworks`);
  }
}
