import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./student-dashboard.component').then(m => m.StudentDashboardComponent)
  }
];
