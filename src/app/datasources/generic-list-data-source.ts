import {Observable} from 'rxjs';
import {Hierarchy} from '../models/another-try';

export interface GenericDataSourceConnection {
  columns: Observable<any[]>;
  hierarchies: Observable<Hierarchy[]>;
  data: Observable<any[]>;
}

export abstract class GenericListDataSource<T> {
  /**
   * Get an observable of the column layout
   */
  abstract connect(): GenericDataSourceConnection;

  /**
   * Close all your subs in here
   */
  abstract disconnect(): void;
}
