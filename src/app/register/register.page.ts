import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    const data = {
      email: this.email.trim(),
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: (res: any) => {
        console.log('Success path:', res);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log('Error path intercepted:', err);

        if (err.status === 200) {
          this.router.navigateByUrl('/login');
          return;
        }

        let message = 'Registration failed';
        
        if (err.error) {
          if (typeof err.error === 'object' && err.error.message) {
            message = err.error.message;
          } else if (err.error.errors && typeof err.error.errors === 'object') {
            const errorKeys = Object.keys(err.error.errors);
            if (errorKeys.length > 0) {
              message = err.error.errors[errorKeys[0]][0];
            }
          } else if (typeof err.error === 'string') {
            message = err.error;
          }
        }

        alert(message);
      }
    });
  }
}