import {Component, computed, DestroyRef, inject, input, output, signal} from '@angular/core';
import {PostCommentModel, PostModel} from '../../models';
import {CommonModule} from '@angular/common';
import {PostsApiService} from '../../../core/api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PostsStore} from '../../../core/data-access';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatTooltip, MatProgressSpinner],
  templateUrl: './post-item.component.html',
})
export class PostItemComponent {
  private readonly _postsApiService = inject(PostsApiService);
  private readonly _postsStore = inject(PostsStore);
  private readonly _destroyRef = inject(DestroyRef);

  readonly post = input.required<PostModel>();
  readonly open = output<string | number>();

  readonly expanded = signal(false);
  readonly comments = signal<PostCommentModel[] | null>(null);
  readonly postId = computed(() => this.post().id.toString());
  readonly isFavorite = computed(() => this._postsStore.isFavorite(this.postId()));
  readonly commentsLoading = computed(() => this._postsStore.commentsLoading());


  public toggleExpand(e: MouseEvent) {
    e.stopPropagation();
    this.expanded.update(expanded => !expanded);

    if (!this.comments() && this.expanded()) {
      this.loadComments();
    }
  }

  public loadComments(): void {
    this._postsStore.getCommentsByPostId(this.postId()).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((postComments) => {
      this.comments.set(postComments)
    })
  }

  public toggleFavorite(): void {
    this._postsStore.toggleFavorite(this.postId());
  }
}
