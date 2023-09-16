import { Routes } from '@angular/router';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', loadComponent: () => import('./posts/posts.component').then(m => m.PostsComponent) },
  { path: 'post/:id', loadComponent: () => import('./post/post.component').then(m => m.PostComponent) },
  {
    path: 'create',
    canActivate: [authGuard],
    loadComponent: () => import('./create/create.component').then(m => m.CreateComponent)
  }
];

export default routes;
