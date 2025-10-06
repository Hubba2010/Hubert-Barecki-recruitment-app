import {afterRenderEffect, Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {PostModel, UserModel} from '../../shared/models';
import { PostItemComponent } from '../../shared/components/post-item';
import {PostsStore, UsersStore} from '../../core/data-access';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    PostItemComponent,
    PostItemComponent
  ],
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  private readonly _fb = inject(FormBuilder);
  private _postsStore = inject(PostsStore);
  private _usersStore = inject(UsersStore);

  readonly filtersForm = this._fb.group({
    searchPhrase: [''],
    user: [null],
    onlyFavorites: [false]
  })

  readonly filtersFormValue = toSignal(this.filtersForm.valueChanges, { initialValue: {}});

  readonly users = computed(() => this._usersStore.usersList());

  readonly filteredPosts = computed(() => {
    let list = this._postsStore.postsList();
    const { searchPhrase, user, onlyFavorites } = this.filtersFormValue() as FiltersFormModel;

    if (onlyFavorites) {
      list = list.filter(p => this._postsStore.isFavorite(p.id));
    }

    if (user) {
      list = list.filter(p => p.userId.toString() === user.toString());
    }

    const text = searchPhrase?.toLowerCase() || '';
    if (text) {
      list = list.filter(
        post => post.title.toLowerCase().includes(text)
      );
    }

    return list;
  });

  constructor() {
    afterRenderEffect(() => {
      this.filtersForm.get('user')!.valueChanges.subscribe(userId => {
        this._postsStore.fetchPosts(userId || undefined);
      });
    })
  }
}

interface FiltersFormModel {
  searchPhrase: string;
  user: string | number;
  onlyFavorites: boolean;
}
