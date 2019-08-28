import {Component, OnInit} from '@angular/core';
import {UserDataSource} from './datasources/user-data-source';
import {UserService} from './providers/user.service';
import {TodoDataSource} from './datasources/todo-data-source';
import {TodoService} from './providers/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vma-datasource-treegrid-example';

  userDataSource: UserDataSource;
  todoDataSource: TodoDataSource;

  public ngOnInit(): void {
    this.todoDataSource = new TodoDataSource();
  }
}
