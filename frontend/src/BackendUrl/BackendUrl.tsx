// The backend URL is pulled from a Vite environment variable (VITE_BACKEND_URL).
// When running locally this falls back to localhost:5000.
// On Vercel, set VITE_BACKEND_URL to your deployed backend URL in the project settings.
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
