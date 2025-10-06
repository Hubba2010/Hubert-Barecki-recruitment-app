import {Component, input, output, signal} from '@angular/core';
import {PostCommentModel, PostModel} from '../../models';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
})
export class PostItemComponent {
  readonly mockComments: PostCommentModel[] = [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      "postId": 1,
      "id": 2,
      "name": "quo vero reiciendis velit similique earum",
      "email": "Jayne_Kuhic@sydney.com",
      "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
  ];

  readonly post = input.required<PostModel>();
  readonly isFavorite = input(false);

  readonly open = output<string | number>();

  readonly expanded = signal(false);
  readonly comments = signal<PostCommentModel[] | null>(null);

  public onToggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
  }

  public toggleExpand(e: MouseEvent) {
    e.stopPropagation();
    this.expanded.update(expanded => !expanded);

    if (!this.comments() && this.expanded()) {
      this.loadComments();
    }
  }

  public loadComments(): void {
    this.comments.set(this.mockComments);
  }

  public toggleFavorite(): void {
    console.log('favorite')
  }
}
