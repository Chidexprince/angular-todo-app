import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todoList: Todo[] = [];

  // Inject todoService into this component and all its methods becomes available
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodoStatus();
  }

  getTodoList() {
    this.todoList = []; // ensure the array is empty initially
    this.todoService.getTodos() // get all todos from the service
      .forEach(t => {
        if (t) {                // loop through each item and push into the array
          const todo = new Todo();
          Object.assign(todo, t);
          this.todoList.push(todo);
        }

      })

  }

  // we subscribe to this observable to always receive status of the todo list so updates can be updated,  we add it to the ngOninit()
  getTodoStatus() {
    this.todoService.getTodoStatus()
      .subscribe(data => {
        if (data) {
          this.getTodoList();
      }
    })
  }

  // toggle todo

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo);
  }

  // delete
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id); // pass id of todo to be deleted to the method
    this.todoService.updateTodoStatus('DELETE'); // update the subject
  }


}
