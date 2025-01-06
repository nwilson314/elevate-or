<script lang="ts">
    import { token } from '$lib/stores/auth';
    import { apiGet } from '$lib/api';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
  
    let userInfo: any = null;
    let errorMsg = '';
  
    onMount(async () => {
      if (!get(token)) {
        // No token, redirect to login
        window.location.href = '/login';
        return;
      }
  
      try {
        const data = await apiGet('/auth/me');
        userInfo = data;
      } catch (err: any) {
        errorMsg = err.message || 'Failed to load user info.';
      }
    });
  </script>
  
  <section class="p-8">
    <h1 class="text-2xl font-bold">Profile</h1>
    {#if errorMsg}
      <p class="text-red-500 mt-2">{errorMsg}</p>
    {/if}
  
    {#if userInfo}
      <div class="mt-4">
        <p><strong>ID:</strong> {userInfo.id}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Active:</strong> {userInfo.is_active ? 'Yes' : 'No'}</p>
        <p><strong>Superuser:</strong> {userInfo.is_superuser ? 'Yes' : 'No'}</p>
        <p><strong>Created At:</strong> {userInfo.created_at}</p>
      </div>
    {/if}
  
    <button
      class="bg-red-500 text-white p-2 mt-4 rounded"
      on:click={() => {
        token.set(null);
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }}
    >
      Logout
    </button>
  </section>
  