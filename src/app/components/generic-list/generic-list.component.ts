import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CollectionViewer, ListRange} from '@angular/cdk/collections';
import {Observable, Subject} from 'rxjs';
import {GenericListDataSource} from '../../datasources/generic-list-data-source';
import {Hierarchy} from '../../models/another-try';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent implements OnInit, OnChanges, OnDestroy, CollectionViewer {
  public data: any[];
  public page: number;
  public pageSize: number;
  public columns: any[];
  public hierarchies: Hierarchy[];

  @Input() dataSource: GenericListDataSource<any>;

  private viewChangeSubject = new Subject<ListRange>();
  viewChange: Observable<ListRange> = this.viewChangeSubject.asObservable();

  private destroy: Subject<boolean> = new Subject<boolean>();

  public ngOnInit(): void {
    const connection = this.dataSource.connect();
    connection.columns.subscribe((value: any[]) => {
      this.columns = value;
    });
    connection.data.subscribe((value: any[]) => {
      this.data = value;
    });
    connection.hierarchies.subscribe((value: Hierarchy[]) => {
      this.hierarchies = value;
    });
  }

  public ngOnChanges(): void {
    this.viewChangeSubject.next({
      start: this.page * this.pageSize,
      end: this.page * this.pageSize + this.pageSize,
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
