import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './state/app.store';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { HideSubscriptWrapperDirective } from './shared/directives/hide-subscript-wrapper.directive';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import AccountingPeriod from './entities/accounting-period';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormField, MatLabel, MatSelect, MatOption, HideSubscriptWrapperDirective, MatButton, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App implements OnInit {
  protected readonly appStore = inject(AppStore);

  protected readonly title = signal('SchulBusserl');

  ngOnInit(): void {
    this.appStore.getAccountingPeriods();
  }

  protected onAccountingPeriodSelected($event: MatSelectChange<string>) {
    this.appStore.selectAccountingPeriodRequested($event.value);
  }
}
