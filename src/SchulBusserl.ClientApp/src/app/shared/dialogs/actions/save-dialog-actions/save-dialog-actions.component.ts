import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatDialogActions } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-save-dialog-actions',
  templateUrl: './save-dialog-actions.component.html',
  imports: [
    MatDialogActions,
    MatButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SaveDialogActionsComponent {
  public readonly saveClicked = output<void>();
  public readonly cancelClicked = output<void>();
}
