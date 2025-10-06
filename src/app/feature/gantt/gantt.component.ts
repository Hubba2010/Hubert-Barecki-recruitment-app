import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PostsStore } from '../../core/data-access';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {PostModel} from '../../shared/models';

interface GanttPost extends PostModel {
  leftPercent: number;
  widthPercent: number;
}

@Component({
  selector: 'app-gantt-view',
  standalone: true,
  imports: [CommonModule, DatePipe, MatProgressSpinner],
  templateUrl: './gantt.component.html',
})
export class GanttComponent {
  private readonly _postsStore = inject(PostsStore);

  readonly posts = computed(() => this._postsStore.postsList());
  readonly postsLoading = computed(() => this._postsStore.postsLoading());

  readonly timelineStart = computed(() => {
    const posts = this.posts();
    if (!posts.length) return Date.now();
    return Math.min(...posts.map(p => Date.parse(p.startDate!)));
  });

  readonly timelineEnd = computed(() => {
    const posts = this.posts();
    if (!posts.length) return Date.now();
    return Math.max(...posts.map(p => Date.parse(p.endDate!)));
  });

  readonly timelineRange = computed(() => this.timelineEnd() - this.timelineStart());

  readonly ganttPosts = computed<GanttPost[]>(() => {
    const start = this.timelineStart();
    const range = this.timelineRange();
    return this.posts().map(post => {
      const startTime = Date.parse(post.startDate!);
      const endTime = Date.parse(post.endDate!);
      const leftPercent = ((startTime - start) / range) * 100;
      const widthPercent = ((endTime - startTime) / range) * 100;
      return { ...post, leftPercent, widthPercent };
    });
  });

  constructor() {
    this._postsStore.fetchPosts();
  }
}
