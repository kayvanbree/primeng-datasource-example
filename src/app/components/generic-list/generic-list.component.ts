import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CollectionViewer, ListRange} from '@angular/cdk/collections';
import {Observable, Subject} from 'rxjs';
import {GenericListDataSource} from '../../datasources/generic-list-data-source';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent implements OnInit, OnChanges, OnDestroy, CollectionViewer {
  @Input() dataSource: GenericListDataSource<any[]>;

  public pageRows: any[];
  public page: number;
  public pageSize: number;
  public columns: any[];

  private viewChangeSubject = new Subject<ListRange>();
  viewChange: Observable<ListRange> = this.viewChangeSubject.asObservable();

  private destroy: Subject<boolean> = new Subject<boolean>();

  public ngOnInit(): void {
    this.dataSource.connect(this).pipe(takeUntil(this.destroy)).subscribe((value: any[]) => {
      this.pageRows = value;
    });
    this.dataSource.getColumns().pipe(takeUntil(this.destroy)).subscribe((value: any[]) => {
      this.columns = value;
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
