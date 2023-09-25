import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[]=[];

  constructor(private http: HttpClient) {}

  // Function to fetch data from the backend
  fetchData(): Observable<any[]> {
    // Adjust the URL to your backend API endpoint
    const baseUrl = 'http://localhost:3000/budget';

    return this.http.get<any[]>(baseUrl);
  }

  // Function to set the data property
  setData(newData: any): void {
    this.data = newData;
  }

  // Function to get the data
  getData(): any {
    return this.data;
  }
}
