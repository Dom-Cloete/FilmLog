import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MovieDetailsService } from '../services/movie-details.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  standalone: false
})

export class Tab2Page implements OnInit, ViewWillEnter {

  watchlist: any[] = [];

  constructor(
    private storage: StorageService,
    private router: Router,
    private movieDetailsService: MovieDetailsService
  ) {}

  async ngOnInit() {
    this.load();
  }

  async ionViewWillEnter() {
    this.load();
  }

  async load() {
    this.watchlist = await this.storage.getWatchlist();
  }

  goToMovieDetails(movie: any) {
    this.movieDetailsService.setMovie(movie);
    this.router.navigate(['/movie-details']);
  }

  async remove(movie: any) {
    this.watchlist = this.watchlist.filter(
      m => m['#IMDB_ID'] !== movie['#IMDB_ID']
    );

    await this.storage.saveWatchlist(this.watchlist);
  }
}