import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any[] = []; // Variable to store the fetched data

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any[]> {
    // Replace 'your-backend-api-url' with the actual URL of your backend API
    const apiUrl = 'your-backend-api-url';

    // Make an HTTP GET request to fetch data from the backend
    return this.http.get<any[]>(apiUrl);
  }

  setData(data: any[]): void {
    this.data = data;
  }

  getData(): any[] {
    return this.data;
  }
}
