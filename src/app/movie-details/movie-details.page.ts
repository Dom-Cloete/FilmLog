import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { StorageService } from '../services/storage.service';
import { MovieDetailsService } from '../services/movie-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
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
    private storage: StorageService,
    private movieDetailsService: MovieDetailsService
  ) {}

  async ngOnInit() {
    this.movie = this.movieDetailsService.getMovie();
    if (this.movie) {
      await this.checkMovieStatus();
      this.fetchMovieDetails();
    }
  }

  async checkMovieStatus() {
    const watchlist = await this.storage.getWatchlist();
    const watched = await this.storage.getWatched();

    this.isInWatchlist = watchlist.some((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']);
    this.isInWatched = watched.some((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']);
  }

  fetchMovieDetails() {
    if (this.movie['#IMDB_ID']) {
      this.movieService.getMovieDetails(this.movie['#IMDB_ID']).subscribe(
        (details: any) => {
          this.movie = { ...this.movie, ...details };
        },
        (error: any) => {
          console.log('Could not fetch additional details');
        }
      );
    }
  }

  async addToWatchlist() {
    let list = await this.storage.getWatchlist();

    if (!list.find((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID'])) {
      list.push(this.movie);
      await this.storage.saveWatchlist(list);
      this.isInWatchlist = true;
    }
  }

  async markAsWatched() {
    let watched = await this.storage.getWatched();
    let watchlist = await this.storage.getWatchlist();

    const existing = watched.find(
      (m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']
    );

    if (existing) {
      existing.timesWatched = (existing.timesWatched || 1) + 1;
      this.movie.timesWatched = existing.timesWatched;
    } else {
      this.movie.timesWatched = 1;
      watched.push(this.movie);
    }

    await this.storage.saveWatched(watched);

    watchlist = watchlist.filter(
      (m: any) => m['#IMDB_ID'] !== this.movie['#IMDB_ID']
    );

    await this.storage.saveWatchlist(watchlist);

    this.isInWatched = true;
    this.isInWatchlist = false;
  }

  async resetWatchCount() {
    let watched = await this.storage.getWatched();
    let watchlist = await this.storage.getWatchlist();

    const movie = watched.find(
      (m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']
    );

    if (!movie) return;

    watched = watched.filter(
      (m: any) => m['#IMDB_ID'] !== this.movie['#IMDB_ID']
    );

    await this.storage.saveWatched(watched);

    delete movie.timesWatched;
    delete this.movie.timesWatched;

    if (!watchlist.find((m: any) => m['#IMDB_ID'] === movie['#IMDB_ID'])) {
      watchlist.push(movie);
    }

    await this.storage.saveWatchlist(watchlist);

    this.isInWatched = false;
    this.isInWatchlist = true;
  }

  goBack() {
    this.location.back();
  }
}