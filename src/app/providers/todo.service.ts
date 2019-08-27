import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  uri = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.uri}/todos`);
  }
}
