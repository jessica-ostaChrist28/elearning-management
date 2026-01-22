import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterCredentials, UserRole } from '../../../../core/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials: RegisterCredentials = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    role: 'student'
  };
  confirmPassword = '';
  loading = false;
  showPassword = false;
  errorMessage = '';
  roles: UserRole[] = ['student', 'instructor'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/courses']);
    }
  }

  onRegister(): void {
    // Validation
    if (!this.credentials.email || !this.credentials.password || !this.confirmPassword ||
        !this.credentials.username || !this.credentials.firstName || !this.credentials.lastName) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.credentials.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.credentials.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.register(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Registration failed';
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
