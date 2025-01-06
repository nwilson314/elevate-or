<script lang="ts">
    import { setToken } from '$lib/stores/auth';
    import { apiPost } from '$lib/api';
  
    let email = '';
    let password = '';
    let errorMsg = '';
  
    async function handleLogin() {
      try {
        errorMsg = '';
        const data = await apiPost('/auth/login', {
          email,
          password
        });
        setToken(data.access_token);
        window.location.href = '/profile';
      } catch (err: any) {
        errorMsg = err.message || 'Login failed.';
      }
    }
  </script>
  
  <section class="flex flex-col items-center p-8">
    <h1 class="text-2xl font-bold">Login</h1>
    <div class="mt-4 flex flex-col gap-2 w-1/2 max-w-sm">
      <input
        class="border p-2"
        type="email"
        placeholder="Email"
        bind:value={email}
      />
      <input
        class="border p-2"
        type="password"
        placeholder="Password"
        bind:value={password}
      />
      {#if errorMsg}
        <p class="text-red-500">{errorMsg}</p>
      {/if}
      <button class="bg-blue-500 text-white p-2 rounded" on:click={handleLogin}>
        Login
      </button>
    </div>
  </section>
  