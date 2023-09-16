import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // 需要比對的放空字串路由前面，避免浪費
  {
    path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/posts/posts.routes')
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];
