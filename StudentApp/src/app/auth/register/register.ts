import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // RouterModule allows routerLink
  template: `
    <div class="container">
      <h2>Register</h2>
      <input [(ngModel)]="email" placeholder="Email" />
      <input [(ngModel)]="password" type="password" placeholder="Password" />
      <button (click)="onRegister()">Register</button>
      <p>Already have an account? <a routerLink="/login">Login</a></p>
    </div>
  `
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private service: StudentService, private router: Router) {}

  onRegister() {
    this.service.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Registration Successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Registration failed: ' + JSON.stringify(err.error))
    });
  }
}