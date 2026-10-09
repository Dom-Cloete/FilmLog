import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class StorageService {

  constructor(private storage: Storage, private auth: AuthService) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  private getCurrentUsername(): string {
    const user = this.auth.getCurrentUser();
    return user?.username || 'guest';
  }

  async getWatchlist() {
    const username = this.getCurrentUsername();
    return (await this.storage.get(`watchlist_${username}`)) || [];
  }

  async saveWatchlist(list: any[]) {
    const username = this.getCurrentUsername();
    return this.storage.set(`watchlist_${username}`, list);
  }

  async getWatched() {
    const username = this.getCurrentUsername();
    return (await this.storage.get(`watched_${username}`)) || [];
  }

  async saveWatched(list: any[]) {
    const username = this.getCurrentUsername();
    return this.storage.set(`watched_${username}`, list);
  }
}