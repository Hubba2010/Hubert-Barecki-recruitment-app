import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
