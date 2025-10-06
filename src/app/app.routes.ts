import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./feature/post-list').then(m => m.PostListComponent),
  },
  {
    path: 'gantt',
    loadComponent: () =>
      import('./feature/gantt').then(m => m.GanttComponent),
  },
];
