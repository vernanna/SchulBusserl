import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatDialogActions } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ApplicationError } from '../../../../entities/application-error';
import { MatError } from '@angular/material/input';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-save-dialog-actions',
  templateUrl: './save-dialog-actions.component.html',
  styleUrls: ['./save-dialog-actions.component.scss'],
  imports: [
    MatDialogActions,
    MatButton,
    MatError,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SaveDialogActionsComponent {
  public readonly canSave = input<boolean>(false);
  public readonly error = input<ApplicationError | null>(null);

  public readonly saveClicked = output<void>();
  public readonly cancelClicked = output<void>();
}
