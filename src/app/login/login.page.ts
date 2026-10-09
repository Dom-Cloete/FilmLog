import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: false
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/tabs/search');
    }
  }

  login() {

    this.error = '';

    if (!this.username || !this.password) {
      this.error = "Enter username and password";
      return;
    }

    const success = this.auth.login(this.username, this.password);

    if (success) {

      setTimeout(() => {
        this.router.navigateByUrl('/tabs/search', { replaceUrl: true });
      }, 50);

    } else {
      this.error = 'Incorrect password';
    }
  }
}