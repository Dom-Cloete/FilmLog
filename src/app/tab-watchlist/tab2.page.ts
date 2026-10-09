import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false
})
export class Tab2Page {
  watchlist: any[] = [];

  constructor(
    private router: Router,
    private watchlistService: WatchlistService
  ) {}

  ionViewWillEnter() {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.watchlistService.getWatchlist().subscribe((data) => {
      this.watchlist = data;
    });
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], {
      state: { movie }
    });
  }

  remove(movie: any) {
    this.watchlistService.deleteMovie(movie.id).subscribe(() => {
      this.loadWatchlist();
    });
  }
}