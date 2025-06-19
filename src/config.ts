export const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// IMPORTANT: This key is for server-side use ONLY.
// Ensure the environment variable is SUPABASE_SERVICE_KEY (no NEXT_PUBLIC_ prefix).
export const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY