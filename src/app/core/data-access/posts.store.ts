import { computed, inject, Injectable, signal } from '@angular/core';
import { PostCommentModel, PostModel } from '../../shared/models';
import { PostsApiService } from '../api';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsStore {
  private readonly _postsApiService = inject(PostsApiService);

  private readonly _postsData = signal<PostModel[]>([]);
  private readonly _favorites = signal<Set<string | number>>(new Set());

  readonly postsList = computed(() => this._postsData());
  readonly postsLoading = signal(false);
  readonly commentsLoading = signal(false);

  public fetchPosts(userId?: string | number): void {
    this.postsLoading.set(true);

    this._postsApiService
      .getPosts(userId)
      .pipe(
        map((data) =>
          (data || []).map((post) => ({
            ...post,
            ...this.generateMockDates(),
          }))
        ),
        tap((postsWithDates) => {
          this._postsData.set(postsWithDates);
          this.postsLoading.set(false);
        })
      )
      .subscribe();
  }

  public toggleFavorite(postId: string | number): void {
    const fav = new Set(this._favorites());
    if (fav.has(postId)) fav.delete(postId);
    else fav.add(postId);
    this._favorites.set(fav);
  }

  public isFavorite(postId: string | number): boolean {
    return this._favorites().has(postId);
  }

  public getCommentsByPostId(postId: string | number): Observable<PostCommentModel[]> {
    this.commentsLoading.set(true);
    return this._postsApiService.getCommentsByPostId(postId).pipe(
      tap(() => {
        this.commentsLoading.set(false);
      })
    );
  }

  // Genruje losowe daty start/end do zamockowania Gantta
  private generateMockDates(): { startDate: string; endDate: string } {
    const now = new Date();
    const startOffsetDays = Math.floor(Math.random() * 30);
    const durationDays = Math.floor(Math.random() * 5) + 1;

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - startOffsetDays);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }
}
