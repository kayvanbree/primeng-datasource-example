import {GenericListDataSource} from './generic-list-data-source';
import {Todo} from '../models/todo';
import {Observable, of} from 'rxjs';
import {CollectionViewer} from '@angular/cdk/collections';
import {TodoService} from '../providers/todo.service';


const columns = [
  { field: 'title' },
  { field: 'completed' },
];

export class TodoDataSource extends GenericListDataSource<Todo> {
  entities: Observable<Todo[]>;
  columns = of(columns);

  constructor(private todoService: TodoService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Todo[] | ReadonlyArray<Todo>> {
    this.entities = this.todoService.getTodos();
    collectionViewer.viewChange.subscribe(value => {
      console.log(value);
    });
    return this.entities;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    // Nothing again
  }

  getColumns(): Observable<any[]> {
    return this.columns;
  }

}
