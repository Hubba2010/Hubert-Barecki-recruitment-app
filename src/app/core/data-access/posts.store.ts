import {computed, inject, Injectable, signal} from '@angular/core';
import {PostCommentModel, PostModel} from '../../shared/models';
import {PostsApiService} from '../api';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsStore{
  private _postsApiService = inject(PostsApiService);

  private _postsData = signal<PostModel[]>([]);
  private _favorites = signal<Set<string | number>>(new Set());

  readonly postsList = computed(() => this._postsData());
  readonly postsLoading = signal(false);
  readonly commentsLoading = signal(false);

  public fetchPosts(userId?: string | number): void {
    this.postsLoading.set(true);
    this._postsApiService.getPosts(userId)
      .pipe(
        tap(data => {
          this._postsData.set(data || []);
          this.postsLoading.set(false);
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

  public getCommentsByPostId(postId: string | number): Observable<PostCommentModel[]> {
    this.commentsLoading.set(true)
    return this._postsApiService.getCommentsByPostId(postId).pipe(
      tap(data => {
        this.commentsLoading.set(false);
      })
    );
  }
}
