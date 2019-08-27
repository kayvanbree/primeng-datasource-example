import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';

export abstract class GenericListDataSource<T> extends DataSource<T> {
  abstract getColumns(): Observable<any[]>;
}
