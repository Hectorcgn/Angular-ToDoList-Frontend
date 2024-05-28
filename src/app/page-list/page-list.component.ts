import { Component } from '@angular/core';
import { Todo } from '../_interface/todo';
import { EventPing } from '../_interface/eventping';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass'],
})
export class PageListComponent {
  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public $todos: Todo[];
  public $todosdone: Todo[];

  constructor(public _dataService: DataService) {
    this.toDoShow = true;
    this.toDoDoneShow = true;
    this.$todos = [];
    this.$todosdone = [];
    this.loadData();
  }

  public loadData(): void {
    this.$todos = [];
    this.$todosdone = [];
    console.log(this.$todos);

    this._dataService.getTdo().subscribe(
      (data) => {
        this.$todos = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this._dataService.getTdoDone().subscribe(
      (data) => {
        this.$todosdone = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public create(event: Todo): void {
    event.id = uuidv4();
    event.postion = this.$todos.length + 1;
    this.$todos.push(event);
    console.log(this.$todos);

    this._dataService.createTodo(event).subscribe(
      (response) => {
        console.log('Todo created successfully:', response);
      },
      (error) => {
        console.error('Error creating todo:', error);
      }
    );
  }
  public update(event: EventPing): void {
    if (event.label === 'check') {
      const targetList = event.object.status ? this.$todosdone : this.$todos;
      const sourceList = event.object.status ? this.$todos : this.$todosdone;
      sourceList.splice(sourceList.indexOf(event.object), 1);
      targetList.push(event.object);
      this._dataService.updateTodo(event.object).subscribe(
        (updatedTodo) => {
          console.log('Todo updated successfully:', updatedTodo);
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    }

    if (event.label === 'uncheck') {
      const targetList = event.object.status ? this.$todosdone : this.$todos;
      const sourceList = event.object.status ? this.$todos : this.$todosdone;
      sourceList.splice(sourceList.indexOf(event.object), 1);
      targetList.push(event.object);
      this._dataService.updateTodo(event.object).subscribe(
        (updatedTodo) => {
          console.log('Todo updated successfully:', updatedTodo);
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    }

    if (event.label === 'delete') {
      const list = event.object.status ? this.$todosdone : this.$todos;
      const index = list.findIndex((todo) => todo.id === event.object.id);
      console.log('Index to delete:', index); // Log the index to be deleted
      if (index > -1) {
        console.log('Deleting todo with id:', event.object.id);
        this._dataService.deleteTodo(event.object.id).subscribe(
          () => {
            console.log('Todo deleted successfully');
            list.splice(index, 1);
          },
          (error) => {
            console.error('Error deleting todo:', error);
          }
        );
      } else {
        console.error('Todo not found for deletion');
      }
    }

    if (event.label === 'label') {
      const list = event.object.status ? this.$todosdone : this.$todos;
      const todo = list.find((todo) => todo.id === event.object.id);
      if (todo) {
        todo.label = event.object.label;
        this._dataService.updateTodoLabel(todo).subscribe(
          (updatedTodo) => {
            console.log('Todo label updated successfully:', updatedTodo);
          },
          (error) => {
            console.error('Error updating todo label:', error);
          }
        );
      }
    }
  }
}
