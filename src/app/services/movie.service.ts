import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private baseUrl = 'https://imdb.iamidiotareyoutoo.com';

  constructor(private http: HttpClient) {}

  searchMovies(query: string) {
    return this.http.get(`${this.baseUrl}/search?q=${query}`);
  }

  getMovieDetails(id: string) {
    return this.http.get(`${this.baseUrl}/title/${id}`);
  }
}