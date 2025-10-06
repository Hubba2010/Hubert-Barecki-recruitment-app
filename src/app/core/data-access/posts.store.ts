import {computed, inject, Injectable, signal} from '@angular/core';
import {PostModel} from '../../shared/models';
import {PostsApiService} from '../api';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsStore{
  private _postsApiService = inject(PostsApiService);

  private _postsData = signal<PostModel[]>([]);
  private _favorites = signal<Set<string | number>>(new Set());

  readonly postsList = computed(() => this._postsData());

  public fetchPosts(userId?: string | number): void {
    this._postsApiService.getPosts(userId)
      .pipe(
        tap(data => {
          this._postsData.set(data || []);
        })
      )
      .subscribe();
  }

  public toggleFavorite(postId: string | number) {
    const fav = new Set(this._favorites());
    if (fav.has(postId)) fav.delete(postId);
    else fav.add(postId);
    this._favorites.set(fav);
  }

  public isFavorite(postId: string | number): boolean {
    return this._favorites().has(postId);
  }

  public favoritePosts(): PostModel[] {
    return this._postsData().filter(p => this._favorites().has(p.id));
  }
}
