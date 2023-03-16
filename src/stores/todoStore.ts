// All the ts-ignores are because of a silly type is not assignable to type: never[] error

import { writable } from 'svelte/store';
import { supabase } from '../supabase';

export const todos = writable([]);

export type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

export async function loadTodos() {
  let { data, error } = await supabase.from('todos').select('*');

  if (error) {
    alert('Oh no! Something went wrong. Please try again.\n' + error.message);
  }

  //@ts-ignore
  todos.set(data);
}

export async function addTodo(text: string, user_id: string) {
  text = text.trim();
  const { data, error } = await supabase.from('todos').insert([{ text, user_id }]).select('*');

  if (error) {
    alert('Oh no! Something went wrong. Please try again.\n' + error.message);
  }

  //@ts-ignore
  todos.update((current: Todo[]) => {
    if (!data) return current;
    const newTodos = [...current, data[0]];
    return newTodos;
  });
}

export async function deleteTodo(id: number) {
  const { error } = await supabase.from('todos').delete().match({ id });

  if (error) {
    alert('Oh no! Something went wrong. Please try again.\n' + error.message);
  }

  todos.update((todos) => todos.filter((todo: Todo) => todo.id !== id));
}

export async function toggleTodoCompleted(id: number, currentState: boolean) {
  const { error } = await supabase.from('todos').update({ completed: !currentState }).match({ id });

  if (error) {
    alert('Oh no! Something went wrong. Please try again.\n' + error.message);
  }

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
