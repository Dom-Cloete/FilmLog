import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})

export class TabsPage {

  constructor(private auth: AuthService, private router: Router) {}

  ionViewWillEnter() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}