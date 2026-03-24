import Stop from 'app/features/stops/entities/stop';
import { Loadable, Loadables } from 'app/shared/entities/loadable';

export interface StopsState {
  stops: Loadable<Stop[]>;
}

export const initialStopsState: StopsState = {
  stops: Loadables.initial([]),
};
