// src/lib/api.ts
import { setToken } from '$lib/stores/auth';
import { token } from './stores/auth';
import { get } from 'svelte/store';

// Grab our environment var for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic GET
export async function apiGet(endpoint: string) {
  const currentToken = get(token);
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {})
    }
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

// Generic POST
export async function apiPost(endpoint: string, data: Record<string, any> = {}) {
  const currentToken = get(token);
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {})
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

// Generic Logout

function logout() {
  apiGet("/logout");
  setToken(null);
  window.location.href = '/login';
}

