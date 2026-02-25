import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './state/app.store';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { HideSubscriptWrapperDirective } from './shared/directives/hide-subscript-wrapper.directive';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ContainerDirective } from './shared/containers/container.directive';
import { CreateAccountingPeriodDialogComponent } from './dialogs/create-accounting-period-dialog/create-accounting-period.dialog';
import { CreateAccountingPeriodDialogFormValue, CreateAccountingPeriodDialogStore } from './dialogs/create-accounting-period-dialog/create-accounting-period-dialog.store';
import { FormDialogFor } from './shared/dialogs/form-dialog';
import FormDialogEvents from './shared/dialogs/form-dialog-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpdateAccountingPeriodDialogComponent } from './dialogs/update-accounting-period-dialog/update-accounting-period.dialog';
import { UpdateAccountingPeriodDialogFormValue, UpdateAccountingPeriodDialogStore } from './dialogs/update-accounting-period-dialog/update-accounting-period-dialog.store';
import AccountingPeriod from './entities/accounting-period';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends ContainerDirective implements OnInit {
  protected readonly appStore = inject(AppStore);
  protected readonly createAccountingPeriodDialog: FormDialogFor<CreateAccountingPeriodDialogComponent>;
  protected readonly updateAccountingPeriodDialog: FormDialogFor<UpdateAccountingPeriodDialogComponent>;

  constructor() {
    super();
    this.createAccountingPeriodDialog = this.registerFormDialog(
      CreateAccountingPeriodDialogComponent,
      CreateAccountingPeriodDialogStore,
      FormDialogEvents<CreateAccountingPeriodDialogFormValue>,
      submission => this.appStore.createAccountingPeriod(submission));
    this.updateAccountingPeriodDialog = this.registerFormDialog(
      UpdateAccountingPeriodDialogComponent,
      UpdateAccountingPeriodDialogStore,
      FormDialogEvents<UpdateAccountingPeriodDialogFormValue>,
      submission => this.appStore.updateAccountingPeriod(submission));
  }

  ngOnInit(): void {
    this.appStore.getAccountingPeriods();
  }

  protected onAccountingPeriodSelected(id: string) {
    this.appStore.selectAccountingPeriodRequested(id);
  }

  protected onCreateAccountingPeriodClick() {
    this.createAccountingPeriodDialog.open({});
  }

  protected onUpdateAccountingPeriodClick(accountingPeriod: AccountingPeriod) {
    this.updateAccountingPeriodDialog.open({ id: accountingPeriod.id }, { name: accountingPeriod.name });
  }
}
