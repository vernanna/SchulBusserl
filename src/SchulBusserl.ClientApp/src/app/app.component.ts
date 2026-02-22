import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './state/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  protected readonly appStore = inject(AppStore);

  protected readonly title = signal('SchulBusserl');

  ngOnInit(): void {
    this.appStore.getAccountingPeriods();
  }
}
