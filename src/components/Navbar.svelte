<script>
  import { supabase } from '../supabase';

  async function logout() {
    if (confirm('Are you sure you want to log out?')) {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert('Ooops! Something went wrong. Please try again!\n' + error.message);
      }
    }
  }
</script>

<div class="my-4 flex justify-end">
  <button on:click={logout} class="shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Log out</button
  >
</div>
