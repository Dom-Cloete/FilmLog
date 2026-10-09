import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MovieDetailsService } from '../services/movie-details.service';
import { IonContent, IonHeader, ViewWillEnter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  standalone: false
})

export class Tab3Page implements OnInit, ViewWillEnter {

  watched: any[] = [];

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
    this.watched = await this.storage.getWatched();
  }

  goToMovieDetails(movie: any) {
    this.movieDetailsService.setMovie(movie);
    this.router.navigate(['/movie-details']);
  }

  async remove(movie: any) {
    this.watched = this.watched.filter(
      m => m['#IMDB_ID'] !== movie['#IMDB_ID']
    );

    await this.storage.saveWatched(this.watched);
  }
}