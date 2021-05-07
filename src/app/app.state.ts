import { category, location } from './models/interfaces';

export interface AppState {
  readonly categories: category[];
  readonly locations: location;
}
