import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WatchedService } from '../services/watched.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  watched: any[] = [];

  constructor(
    private router: Router,
    private watchedService: WatchedService
  ) {}

  ionViewWillEnter() {
    this.loadWatched();
  }

  loadWatched() {
    this.watchedService.getWatched().subscribe((data) => {
      this.watched = data;
    });
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], {
      state: { movie }
    });
  }

  remove(movie: any) {
    this.watchedService.delete(movie.id).subscribe(() => {
      this.loadWatched();
    });
  }
}