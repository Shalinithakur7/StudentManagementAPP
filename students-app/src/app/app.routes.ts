import { Routes } from '@angular/router';
// 1. Import Standalone Components
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component'; 
import { StudentListComponent } from './components/student-list/student-list.component'; 
// 2. Import the AuthGuard
import { AuthGuard } from './auth/auth-guard.guard';

export const routes: Routes = [
  // Default route redirects users to the login page immediately upon opening the app
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public Routes (Accessible without authentication)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected Route (Requires a valid JWT token stored in the browser)
  { 
    path: 'students', 
    component: StudentListComponent, 
    // The AuthGuard checks if the user is logged in before allowing activation
    canActivate: [AuthGuard] 
  },

  // Fallback route: redirects any unrecognized URL path back to the login page
  { path: '**', redirectTo: 'login' }
];