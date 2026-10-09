import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WatchlistService {

  apiUrl = `${environment.apiUrl}/watchlist`;

  constructor(private http: HttpClient) {}

  getWatchlist() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addMovie(movie: any) {
    return this.http.post(this.apiUrl, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
} 