import { Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.routes').then(m => m.COURSES_ROUTES)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/student-dashboard/student-dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    data: { role: 'student' }
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    data: { role: 'instructor' }
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./shared/components/unauthorized/unauthorized.component').then(m => [
      { path: '', component: m.UnauthorizedComponent }
    ])
  },
  {
    path: '**',
    redirectTo: '/courses'
  }
];
