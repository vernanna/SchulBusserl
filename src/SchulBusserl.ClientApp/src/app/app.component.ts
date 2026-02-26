import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './state/app.store';
import { ContainerDirective } from './shared/containers/container.directive';
import { CreateAccountingPeriodDialogComponent } from './dialogs/create-accounting-period-dialog/create-accounting-period.dialog';
import { CreateAccountingPeriodDialogStore } from './dialogs/create-accounting-period-dialog/create-accounting-period-dialog.store';
import { FormDialogFor } from './shared/dialogs/form-dialog';
import { UpdateAccountingPeriodDialogComponent } from './dialogs/update-accounting-period-dialog/update-accounting-period.dialog';
import { UpdateAccountingPeriodDialogStore } from './dialogs/update-accounting-period-dialog/update-accounting-period-dialog.store';
import AccountingPeriod from './entities/accounting-period';
import { HeaderComponent } from './components/header/header.component';
import { DeleteAccountingPeriodDialogComponent } from './dialogs/delete-accounting-period-dialog/delete-accounting-period.dialog';
import { ConfirmationDialogFor } from './shared/dialogs/confirmation/confirmation-dialog';
import { DeleteAccountingPeriodDialogStore } from './dialogs/delete-accounting-period-dialog/delete-accounting-period-dialog.store';

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
  protected readonly deleteAccountingPeriodDialog: ConfirmationDialogFor<DeleteAccountingPeriodDialogComponent>;

  constructor() {
    super();
    this.createAccountingPeriodDialog = this.registerFormDialog(
      CreateAccountingPeriodDialogComponent,
      CreateAccountingPeriodDialogStore,
      submission => this.appStore.createAccountingPeriod(submission));
    this.updateAccountingPeriodDialog = this.registerFormDialog(
      UpdateAccountingPeriodDialogComponent,
      UpdateAccountingPeriodDialogStore,
      submission => this.appStore.updateAccountingPeriod(submission));
    this.deleteAccountingPeriodDialog = this.registerConfirmationDialog(
      DeleteAccountingPeriodDialogComponent,
      DeleteAccountingPeriodDialogStore,
      submission => this.appStore.deleteAccountingPeriod(submission));
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

  protected onDeleteAccountingPeriodClick(accountingPeriod: AccountingPeriod) {
    this.deleteAccountingPeriodDialog.open({ accountingPeriod });
  }
}
