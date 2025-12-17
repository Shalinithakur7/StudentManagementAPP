import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>Login</h2>
      <input [(ngModel)]="email" placeholder="Email" />
      <input [(ngModel)]="password" type="password" placeholder="Password" />
      <button (click)="onLogin()">Login</button>
      <p>New user? <a routerLink="/register">Register here</a></p>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private service: StudentService, private router: Router) {}

  onLogin() {
    this.service.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); // Save JWT
        this.router.navigate(['/students']); // Redirect to CRUD page
      },
      error: () => alert('Invalid credentials')
    });
  }
}