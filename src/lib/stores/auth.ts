// src/lib/stores/auth.ts
import { writable } from 'svelte/store';

export const token = writable<string | null>(null);

export function setToken(jwt: string | null) {
  token.set(jwt);
  if (jwt) {
    localStorage.setItem('access_token', jwt);
  } else {
    localStorage.removeItem('access_token');
  }
}

// On startup, read from localStorage
if (typeof window !== 'undefined') {
  const savedToken = localStorage.getItem('access_token');
  if (savedToken) {
    token.set(savedToken);
  }
}
