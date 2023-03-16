<script lang="ts">
  import { supabase } from '../supabase';
  import { user as theUser } from '../stores/authStore';
  import Auth from '../components/Auth.svelte';
  import '../app.css';
  import { loadTodos } from '../stores/todoStore';
  import Navbar from '../components/Navbar.svelte';

  async function loadUser() {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      theUser.set(user);
    } catch (error) {
      console.error(error);
    }
  }

  loadUser();

  async function getUserSession() {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      loadTodos();
    }
  }

  getUserSession();

  supabase.auth.onAuthStateChange((event: any, session: any) => {
    theUser.set(session?.user ?? null);
  });
</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $theUser}
    <Navbar />
    <slot />
  {:else}
    <Auth />
  {/if}
</div>
