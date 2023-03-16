<script lang="ts">
  import { supabase } from '../supabase';

  let loading = false;
  let email: string;

  async function handleLogin() {
    try {
      loading = true;
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        alert(
          'You have either entered your email address too many times or you have entered an invalid email address. Please try again.'
        );
      }
    } catch (error: any) {
      console.error(error);
      alert(error.error_description || error.message);
    } finally {
      alert('Check your email for the login link!');
      loading = false;
    }
  }
</script>

<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Log In</h1>
<p class="text-center mt-2">Sign in via magic link with your email below.</p>

<form on:submit|preventDefault={handleLogin}>
  <div class="flex flex-col text-sm mb-2">
    <label class="font-bold mb-2 text-gray-800" for="email">Email</label>
    <input
      name="email"
      type="email"
      class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
      placeholder="Enter your email"
      bind:value={email}
    />
  </div>
  <button type="submit" class="shadow-sm w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
    >{loading ? 'Sending Email...' : 'Log In'}</button
  >
</form>
