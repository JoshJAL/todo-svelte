import { writable } from 'svelte/store';

export const todos = writable([]);

export type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

export function addTodo(text: string) {
  //@ts-ignore
  todos.update((current: Todo[]) => {
    const newTodos = [...current, { text, completed: false, id: Date.now() }];
    return newTodos;
  });
}

export function deleteTodo(id: number) {
  todos.update((todos) => todos.filter((todo: Todo) => todo.id !== id));
}

export function toggleTodoCompleted(id: number) {
  //@ts-ignore
  todos.update((todos: Todo[]) => {
    let index = -1;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      todos[index].completed = !todos[index].completed;
    }
    return todos;
  });
}
