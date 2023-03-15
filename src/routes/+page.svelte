<script>
  import TodoForm from '../components/TodoForm.svelte';
  import { todos } from '../stores/todoStore';
  import Todo from '../components/Todo.svelte';
</script>

<main>
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My To-dos</h1>
  <TodoForm />
  {#each $todos as todo}
    <Todo {todo} />
  {/each}
</main>
