import { Injectable, signal, computed, inject } from '@angular/core';
import { UsersApiService } from '../api/users-api.service';
import { UserModel } from '../../shared/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private _usersService = inject(UsersApiService);
  private _users = signal<UserModel[]>([]);

  public readonly usersList = computed(() => this._users());

  public getAllUsers(): void {
    this._usersService.getUsers().pipe(tap(data => {
      this._users.set(data || []);
    })).subscribe();
  }

  public getUserById(id: number): UserModel | undefined {
    return this._users().find(u => u.id === id);
  }
}
