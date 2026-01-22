import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="card-header">
          <h1>Access Denied</h1>
        </div>
        <div class="card-content">
          <p>You don't have permission to access this page.</p>
          <button routerLink="/courses" class="btn btn-primary">Back to Courses</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    .unauthorized-card {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      text-align: center;
    }
    .card-header h1 {
      margin: 0 0 20px 0;
      color: #d32f2f;
    }
    p {
      margin: 0 0 20px 0;
      color: #666;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }
    .btn-primary {
      background-color: #667eea;
      color: white;
    }
  `]
})
export class UnauthorizedComponent {}
