import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const STORAGE_PREFERENCE_KEY = 'crisisSense_supabase_remember';

// Dynamically retrieve Supabase configuration from FastAPI backend (/api/config)
// Keys are read securely from .env and NEVER hardcoded in client source code.
let SUPABASE_URL = '';
let SUPABASE_ANON_KEY = '';

const apiBase = (window.location.port === '8000') ? '' : 'http://localhost:8000';
try {
  const resp = await fetch(`${apiBase}/api/config`);
  if (resp.ok) {
    const cfg = await resp.json();
    SUPABASE_URL = cfg.supabase_url || '';
    SUPABASE_ANON_KEY = cfg.supabase_anon_key || '';
  }
} catch (e) {
  // Offline or running standalone
}

// Optional developer override from localStorage
if (!SUPABASE_URL) {
  SUPABASE_URL = localStorage.getItem('CRISIS_SUPABASE_URL') || '';
  SUPABASE_ANON_KEY = localStorage.getItem('CRISIS_SUPABASE_ANON_KEY') || '';
}

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const authStorage = {
  getItem(key) {
    const remember = localStorage.getItem(STORAGE_PREFERENCE_KEY) !== 'false';
    return (remember ? localStorage : sessionStorage).getItem(key);
  },
  setItem(key, value) {
    const remember = localStorage.getItem(STORAGE_PREFERENCE_KEY) !== 'false';
    const activeStorage = remember ? localStorage : sessionStorage;
    const inactiveStorage = remember ? sessionStorage : localStorage;
    inactiveStorage.removeItem(key);
    activeStorage.setItem(key, value);
  },
  removeItem(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
};

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: authStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

export function setRememberSession(remember) {
  localStorage.setItem(STORAGE_PREFERENCE_KEY, String(remember));
}
