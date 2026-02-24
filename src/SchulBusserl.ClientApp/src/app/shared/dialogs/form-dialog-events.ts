import { Subject } from 'rxjs';
import DialogEvents from './dialog-events';

export default class FormDialogEvents<TValue> extends DialogEvents {
  public readonly submitRequested = new Subject<TValue>();
}
