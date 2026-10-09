import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false
})

export class Tab1Page {
  query = '';
  movies: any[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  search() {
    if (!this.query.trim()) return;

    this.movieService.searchMovies(this.query).subscribe({
      next: (res: any) => {
        console.log('OMDb Raw Response:', res);
        
        this.movies = res.Search || []; 
        
        if (res.Response === 'False') {
          alert(res.Error || 'No movies found.');
        }
      },
      error: (err) => {
        console.error('HTTP Error:', err);
      }
    });
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], {
      state: { movie }
    });
  }
}