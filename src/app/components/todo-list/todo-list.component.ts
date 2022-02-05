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
    this.populateDefaultTodos();
    this.getTodoStatus();

    setTimeout(() => {
      this.getTodoList();
    }, 500);
  }

  populateDefaultTodos() {
    this.todoService.populateDefaultTodos();
  }

  getTodoList() {
    this.todoList = [];
    this.todoService.getTodos()
      .forEach(t => {
        if (t) {
          const todo = new Todo();
          Object.assign(todo, t);
          this.todoList.push(todo);
        }

      })

  }

  getTodoStatus() {
    this.todoService.getTodoStatus()
      .subscribe(data => {
        if (data) {
          this.getTodoList();
      }
    })
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggleCompleted(todo);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.todoService.updateTodoStatus('DELETE');
  }


}
