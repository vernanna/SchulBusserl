import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountingPeriodsStore } from './features/accounting-periods/state/accounting-periods.store';
import { ContainerDirective } from './shared/containers/container.directive';
import { CreateAccountingPeriodDialogComponent } from './features/accounting-periods/components/create-accounting-period-dialog/create-accounting-period.dialog';
import { CreateAccountingPeriodDialogStore } from './features/accounting-periods/components/create-accounting-period-dialog/create-accounting-period-dialog.store';
import { FormDialogFor } from './shared/dialogs/form-dialog';
import { UpdateAccountingPeriodDialogComponent } from './features/accounting-periods/components/update-accounting-period-dialog/update-accounting-period.dialog';
import { UpdateAccountingPeriodDialogStore } from './features/accounting-periods/components/update-accounting-period-dialog/update-accounting-period-dialog.store';
import AccountingPeriod from './features/accounting-periods/entities/accounting-period';
import { HeaderComponent } from './components/header/header.component';
import { DeleteAccountingPeriodDialogComponent } from './features/accounting-periods/components/delete-accounting-period-dialog/delete-accounting-period.dialog';
import { ConfirmationDialogFor } from './shared/dialogs/confirmation/confirmation-dialog';
import { DeleteAccountingPeriodDialogStore } from './features/accounting-periods/components/delete-accounting-period-dialog/delete-accounting-period-dialog.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends ContainerDirective implements OnInit {
  protected readonly accountingPeriodsStore = inject(AccountingPeriodsStore);
  protected readonly createAccountingPeriodDialog: FormDialogFor<CreateAccountingPeriodDialogComponent>;
  protected readonly updateAccountingPeriodDialog: FormDialogFor<UpdateAccountingPeriodDialogComponent>;
  protected readonly deleteAccountingPeriodDialog: ConfirmationDialogFor<DeleteAccountingPeriodDialogComponent>;

  constructor() {
    super();
    this.createAccountingPeriodDialog = this.registerFormDialog(
      CreateAccountingPeriodDialogComponent,
      CreateAccountingPeriodDialogStore,
      submission => this.accountingPeriodsStore.createAccountingPeriod(submission));
    this.updateAccountingPeriodDialog = this.registerFormDialog(
      UpdateAccountingPeriodDialogComponent,
      UpdateAccountingPeriodDialogStore,
      submission => this.accountingPeriodsStore.updateAccountingPeriod(submission));
    this.deleteAccountingPeriodDialog = this.registerConfirmationDialog(
      DeleteAccountingPeriodDialogComponent,
      DeleteAccountingPeriodDialogStore,
      submission => this.accountingPeriodsStore.deleteAccountingPeriod(submission));
  }

  ngOnInit(): void {
    this.accountingPeriodsStore.getAccountingPeriods();
  }

  protected onAccountingPeriodSelected(id: string) {
    this.accountingPeriodsStore.selectAccountingPeriodRequested(id);
  }

  protected onCreateAccountingPeriodClick() {
    this.createAccountingPeriodDialog.open({});
  }

  protected onUpdateAccountingPeriodClick(accountingPeriod: AccountingPeriod) {
    this.updateAccountingPeriodDialog.open({ id: accountingPeriod.id }, { name: accountingPeriod.name });
  }

  protected onDeleteAccountingPeriodClick(accountingPeriod: AccountingPeriod) {
    this.deleteAccountingPeriodDialog.open({ accountingPeriod });
  }
}
