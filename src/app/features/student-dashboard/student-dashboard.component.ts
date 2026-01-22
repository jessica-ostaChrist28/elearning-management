import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Student Dashboard</h1>
      <div class="card">
        <div class="card-content">
          <p>Your enrolled courses will appear here.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .card-content {
      padding: 16px;
    }
  `]
})
export class StudentDashboardComponent {}
