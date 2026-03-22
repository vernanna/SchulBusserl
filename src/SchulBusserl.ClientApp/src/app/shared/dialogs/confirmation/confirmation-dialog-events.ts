import { Subject } from 'rxjs';
import DialogEvents from 'app/shared/dialogs/dialog-events';

export default class ConfirmationDialogEvents extends DialogEvents {
  public readonly submitRequested = new Subject<void>();
}
