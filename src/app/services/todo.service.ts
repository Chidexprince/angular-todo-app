import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Todo } from './../models/todo';

@Injectable({
  providedIn: 'root', // providedIn: root means this service is injected into the root of the application and so it is available all round
})
export class TodoService {
  private todo: BehaviorSubject<string> = new BehaviorSubject(null);
 // private deleteTodo: BehaviorSubject<string> = new BehaviorSubject(null);
 // private completedTodo: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(public httpClient: HttpClient) { }

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId = 3;

  // A function to retrieve default todos from local file, faking an API call
  public getDefaultTodos() {
    const todoUrl = '/assets/data/todos.json';
    return this.httpClient.get<Todo[]>(todoUrl);
  }

  // A function to persist the data on localStorage after retrieving it from local file
  public populateDefaultTodos() {
    this.getDefaultTodos().subscribe((data) => {
      localStorage.setItem('Todos', JSON.stringify(data));
    });
  }

  public getTodos(): Todo[] {
    const todos: Todo[] = JSON.parse(localStorage.getItem('Todos'));
    return todos;
  }

  // Add new todo

  public addTodo(todo: Todo) {
    // retrieve saved todos available
    const todos: Todo[] = this.getTodos();
    if (!todo.id) {
      todo.id = ++this.lastId;
      todos.unshift(todo);
      localStorage.setItem('Todos', JSON.stringify(todos));
    }
  }

  public deleteTodo(id: number) {
     // retrieve saved todos available
    let todos: Todo[] = this.getTodos();
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('Todos', JSON.stringify(todos));
  }

  public toggleCompleted(todo: Todo) {
    let todos: Todo[] = this.getTodos();

    todos.map(t => {
      if (t.id === todo.id) {
        t.done = !t.done;
      }
    })

    localStorage.setItem('Todos', JSON.stringify(todos));

  }

  // Getting the value as an Observable
  public getTodoStatus(): Observable<any> {
    return this.todo.asObservable();
  }

  // passing todo status
  public updateTodoStatus(todo) {
    this.todo.next(todo);
  }





}
