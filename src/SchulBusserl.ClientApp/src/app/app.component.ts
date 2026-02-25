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
import { CreateAccountingPeriodDialogFormValue, CreateAccountingPeriodDialogStore } from './dialogs/create-accounting-period-dialog/create-accounting-period-dialog.store';
import { FormDialogFor } from './shared/dialogs/form-dialog';
import FormDialogEvents from './shared/dialogs/form-dialog-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormField, MatLabel, MatSelect, MatOption, HideSubscriptWrapperDirective, MatButton, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends ContainerDirective implements OnInit {
  protected readonly appStore = inject(AppStore);
  protected readonly createAccountingPeriodDialog: FormDialogFor<CreateAccountingPeriodDialogComponent>;

  constructor() {
    super();
    this.createAccountingPeriodDialog = this.registerFormDialog(CreateAccountingPeriodDialogComponent, CreateAccountingPeriodDialogStore, FormDialogEvents<CreateAccountingPeriodDialogFormValue>, submission => this.appStore.createAccountingPeriod(submission));

    this.createAccountingPeriodDialog.events.submitRequested
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => console.log('Success ' + value.name));
  }

  ngOnInit(): void {
    this.appStore.getAccountingPeriods();
  }

  protected onAccountingPeriodSelected($event: MatSelectChange<string>) {
    this.appStore.selectAccountingPeriodRequested($event.value);
  }

  protected onCreateAccountingPeriodClick() {
    this.createAccountingPeriodDialog.open({});
  }
}
