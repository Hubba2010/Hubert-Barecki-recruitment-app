import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header';
import {UsersStore} from './core/data-access';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private _usersStore = inject(UsersStore);


  public ngOnInit(): void {
    this._usersStore.getAllUsers();
  }
}
