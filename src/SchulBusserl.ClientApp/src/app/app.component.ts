import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './state/app.store';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { HideSubscriptWrapperDirective } from './shared/directives/hide-subscript-wrapper.directive';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ContainerDirective } from './shared/containers/container.directive';
import { CreateAccountingPeriodDialogComponent } from './dialogs/create-accounting-period-dialog/create-accounting-period.dialog';
import { DialogFor } from './shared/dialogs/dialog';
import { CreateAccountingPeriodDialogStore } from './dialogs/create-accounting-period-dialog/create-accounting-period-dialog.store';
import DialogEvents from './shared/dialogs/dialog-events';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormField, MatLabel, MatSelect, MatOption, HideSubscriptWrapperDirective, MatButton, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends ContainerDirective implements OnInit {
  protected readonly appStore = inject(AppStore);
  protected readonly createAccountingPeriodDialog: DialogFor<CreateAccountingPeriodDialogComponent>;

  constructor() {
    super();
    this.createAccountingPeriodDialog = this.registerDialog(CreateAccountingPeriodDialogComponent, CreateAccountingPeriodDialogStore, DialogEvents);
  }

  ngOnInit(): void {
    this.appStore.getAccountingPeriods();
  }

  protected onAccountingPeriodSelected($event: MatSelectChange<string>) {
    this.appStore.selectAccountingPeriodRequested($event.value);
  }

  protected onCreateAccountingPeriodClick() {
    this.createAccountingPeriodDialog.open({ text: 'my test' });
  }
}
