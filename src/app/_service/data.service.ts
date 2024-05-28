import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../_interface/todo';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private serverUrl = 'http://localhost:4040';
  constructor(private _http: HttpClient) {}

  public getTdo(): Observable<Todo[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this._http.get<Todo[]>(`${this.serverUrl}/todos`, httpOptions);
  }

  public getTdoDone(): Observable<Todo[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this._http.get<Todo[]>(`${this.serverUrl}/todosdone`, httpOptions);
  }
  public createTodo(todo: Todo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this._http.post<Todo>(
      `${this.serverUrl}/addtodos`,
      todo,
      httpOptions
    );
  }
  public updateTodo(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this._http.put<Todo>(
      `${this.serverUrl}/todos/${todo.id}`,
      todo,
      httpOptions
    );
  }
  public updateTodoLabel(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this._http.put<Todo>(
      `${this.serverUrl}/todos/${todo.id}/label`,
      todo,
      httpOptions
    );
  }
  public deleteTodo(todoId: number): Observable<any> {
    console.log(todoId);
    return this._http.delete(`${this.serverUrl}/todos/${todoId}`);
  }
}
