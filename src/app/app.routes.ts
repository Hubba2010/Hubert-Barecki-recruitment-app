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
  // {
  //   path: 'posts/:id',
  //   loadComponent: () =>
  //     import('./feature/post-detail').then(m => m.PostDetailComponent),
  // },
  // {
  //   path: 'gantt',
  //   loadComponent: () =>
  //     import('./feature/gantt-view').then(m => m.GanttViewComponent),
  // },
  // // opcjonalnie: 404
  // {
  //   path: '**',
  //   loadComponent: () =>
  //     import('./feature/not-found').then(m => m.NotFoundComponent),
  // },
];
