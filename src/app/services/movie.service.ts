import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  searchMovies(title: string) {
    return this.http.get(
      `${this.apiUrl}/search?title=${title}`
    );
  }

  getMovieDetails(title: string) {
    return this.http.get(`${this.apiUrl}/details?title=${encodeURIComponent(title)}`);
  }
}