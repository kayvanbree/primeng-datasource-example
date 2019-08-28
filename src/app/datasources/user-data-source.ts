import {User} from '../models/user';
import {GenericListDataSource} from './generic-list-data-source';
import {Observable, of} from 'rxjs';
import {CollectionViewer} from '@angular/cdk/collections';
import {UserService} from '../providers/user.service';

const columns = [
  { field: 'name' },
  { field: 'username' },
  { field: 'email' },
];

const hierarchies = [
  { field: 'name'}
]

export class UserDataSource  {
  entities: Observable<User[]>;
  columns = of(columns);

  constructor(private userService: UserService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<User[] | ReadonlyArray<User>> {
    this.entities = this.userService.getUsers();
    return this.entities;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    // Do nothing
  }

  getColumns(): Observable<any[]> {
    return this.columns;
  }
}
