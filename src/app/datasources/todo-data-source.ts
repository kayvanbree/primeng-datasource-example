import {GenericDataSourceConnection, GenericListDataSource} from './generic-list-data-source';
import {Todo} from '../models/todo';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Hierarchy} from '../models/another-try';

const columns = [
  {field: 'title'},
  {field: 'something'},
];

const hierarchies: Hierarchy[] = [
  {
    id: '123',
    items: [
      {id: '1', children: [{id: '2'}, {id: '3'}]},
      {id: '4', children: [{id: '5'}, {id: '6', children: [{id: '7'}]}]},
    ],
  }
];

const data: any[] = [
  { id: '1', title: 'lalalala', something: 'something' },
  { id: '2', title: 'asdf', something: 'something' },
  { id: '3', title: 'fdsa', something: 'something' },
  { id: '4', title: 'w4fasdf', something: 'something' },
  { id: '5', title: 'cvbvcr', something: 'something' },
  { id: '6', title: 'dgrgdfg', something: 'something' },
  { id: '7', title: 'bvvbff', something: 'something' },
];

export class TodoDataSource extends GenericListDataSource<Todo> {
  private columns = new BehaviorSubject<any[]>(columns);
  private columnsObservable: Observable<any[]> = this.columns.asObservable();

  private data = new BehaviorSubject<any[]>(hierarchies);
  private dataObservable: Observable<any[]> = this.data.asObservable();

  private hierarchies = new BehaviorSubject<Hierarchy[]>(data);
  private hierarchiesObservable: Observable<Hierarchy[]> = this.hierarchies.asObservable();

  connect(): GenericDataSourceConnection {
    this.columns.next(columns);
    this.hierarchies.next(hierarchies);
    this.data.next(data);
    return {
      columns: this.columnsObservable,
      hierarchies: this.hierarchiesObservable,
      data: this.dataObservable,
    } as GenericDataSourceConnection;
  }

  updateView(): void {
    this.columns.next(columns);
    this.hierarchies.next(hierarchies);
  }

  disconnect(): void {
    this.columns.complete();
    this.data.complete();
    this.hierarchies.complete();
  }
}
