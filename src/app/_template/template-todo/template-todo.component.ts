import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventPing } from 'src/app/_interface/eventping';
import { Todo } from 'src/app/_interface/todo';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass'],
})
export class TemplateTodoComponent {
  @Input() todo$: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  public changeCheck(event?: any): void {
    this.todo$.status = !this.todo$.status;
    const eventObject: EventPing = {
      label: 'check',
      object: this.todo$,
    };
    this.ping.emit(eventObject);
  }

  public changeLabel(event?: any): void {
    const eventObject: EventPing = {
      label: 'label',
      object: this.todo$,
    };
    this.ping.emit(eventObject);
  }

  public deleteTodo(event?: any): void {
    const eventObject: EventPing = {
      label: 'delete',
      object: this.todo$,
    };
    this.ping.emit(eventObject);
  }
}
