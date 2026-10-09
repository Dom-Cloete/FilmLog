import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private movieSubject = new BehaviorSubject<any>(null);
  public movie$ = this.movieSubject.asObservable();

  constructor() {}

  setMovie(movie: any) {
    this.movieSubject.next(movie);
  }

  getMovie() {
    return this.movieSubject.value;
  }

  clearMovie() {
    this.movieSubject.next(null);
  }
}
