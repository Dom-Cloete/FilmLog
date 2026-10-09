import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { WatchlistService } from '../services/watchlist.service';
import { WatchedService } from '../services/watched.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: false
})

export class MovieDetailsPage implements OnInit {

  movie: any;
  isInWatchlist: boolean = false;
  isInWatched: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private watchedService: WatchedService
  ) {}

  async ngOnInit() {
    this.movie = history.state.movie;

    if (!this.movie) {
      this.router.navigateByUrl('/tabs/search');
      return;
    }

    if (!this.movie.imdbID && this.movie.imdbId) {
      this.movie.imdbID = this.movie.imdbId;
    }

    if (!this.movie.Title && this.movie.title) this.movie.Title = this.movie.title;
    if (!this.movie.Poster && this.movie.poster) this.movie.Poster = this.movie.poster;
    if (!this.movie.Year && this.movie.year) this.movie.Year = this.movie.year;
    if (!this.movie.Actors && this.movie.actors) this.movie.Actors = this.movie.actors;
    if (!this.movie.Genre && this.movie.genre) this.movie.Genre = this.movie.genre;

    this.fetchMovieDetails();
    this.loadStatus();
  }

  fetchMovieDetails() {
    const title = this.movie.Title || this.movie.title;

    this.movieService.getMovieDetails(title).subscribe({
      next: (details: any) => {

        this.movie = {
          imdbID: details.imdbID,
          Title: details.Title,
          Year: details.Year,
          Poster: details.Poster,
          Actors: details.Actors,
          Genre: details.Genre,
          Plot: details.Plot
        };
      },
      error: (err) => console.error(err)
    });
  }

  dbMovieId: number | null = null;

  loadStatus() {
    const currentId = this.movie.imdbID || this.movie.imdbId;

    this.watchlistService.getWatchlist().subscribe((list: any[]) => {
      this.isInWatchlist = list.some(m => (m.imdbId || m.imdbID) === currentId);
    });

    this.watchedService.getWatched().subscribe((list: any[]) => {
      const watchedEntry = list.find(m => (m.imdbId || m.imdbID) === currentId);

      if (watchedEntry) {
        this.isInWatched = true;
        this.movie.timesWatched = watchedEntry.timesWatched;
        this.dbMovieId = watchedEntry.id; 
      }
    });
  }

  addToWatchlist() {
    const movieData = {
      imdbId: this.movie.imdbID || this.movie.imdbId,
      title: this.movie.Title || this.movie.title,
      year: this.movie.Year || this.movie.year,
      poster: this.movie.Poster || this.movie.poster,
      actors: this.movie.Actors || this.movie.actors,
      genre: this.movie.Genre || this.movie.genre
    };

    this.watchlistService.addMovie(movieData).subscribe(() => {
      this.loadStatus();
    });
  }

  markAsWatched() {
    const movieData = {
      imdbId: this.movie.imdbID || this.movie.imdbId,
      title: this.movie.Title || this.movie.title,
      year: this.movie.Year || this.movie.year,
      poster: this.movie.Poster || this.movie.poster,
      actors: this.movie.Actors || this.movie.actors,
      genre: this.movie.Genre || this.movie.genre
    };

    this.watchedService.addWatched(movieData).subscribe((res: any) => {
      this.isInWatched = true;
      this.isInWatchlist = false;
      this.movie.timesWatched = res.timesWatched;

      this.loadStatus();
    });
  }

  resetWatchCount() {
    if (this.dbMovieId) {
      this.watchedService.reset(this.dbMovieId).subscribe(() => {
        this.isInWatched = false;
        this.isInWatchlist = true;
        this.movie.timesWatched = 0;
        this.dbMovieId = null; 
        this.loadStatus();
      });
    }
  }
  goBack() {
    this.location.back();
  }
}