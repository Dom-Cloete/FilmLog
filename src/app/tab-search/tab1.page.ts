import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { StorageService } from '../services/storage.service';
import { MovieDetailsService } from '../services/movie-details.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: false
})

export class Tab1Page {
  query = '';
  movies: any[] = [];

  constructor(
    private movieService: MovieService,
    private storage: StorageService,
    private router: Router,
    private movieDetailsService: MovieDetailsService
  ) {}

  search() {
    if (!this.query) return;

    this.movieService.searchMovies(this.query).subscribe((res: any) => {
      this.movies = res.description || [];
    });
  }

  goToMovieDetails(movie: any) {
    this.movieDetailsService.setMovie(movie);
    this.router.navigate(['/movie-details']);
  }
}