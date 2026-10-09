import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WatchedService {

  apiUrl = `${environment.apiUrl}/watched`;

  constructor(private http: HttpClient) {}

  getWatched() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addWatched(movie: any) {
    return this.http.post(this.apiUrl, movie);
  }

  increment(id: number) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      {}
    );
  }

  reset(id: number) {
    return this.http.post(
      `${this.apiUrl}/reset/${id}`,
      {}
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
} 