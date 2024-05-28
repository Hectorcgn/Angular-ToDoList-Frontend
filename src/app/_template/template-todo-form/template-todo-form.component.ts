import { Component, Output, EventEmitter } from '@angular/core';
import { EventPing } from 'src/app/_interface/eventping';
import { Todo } from 'src/app/_interface/todo';
@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass'],
})
export class TemplateTodoFormComponent {
  public todo$: Todo;
  @Output() ping: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor() {
    this.todo$ = {
      id: undefined,
      label: undefined,
      status: false,
      postion: undefined,
    };
  }

  public createTodo(event?: any): void {
    this.ping.emit(this.todo$);
    this.todo$ = {
      id: undefined,
      label: undefined,
      status: false,
      postion: undefined,
    };
  }
}
