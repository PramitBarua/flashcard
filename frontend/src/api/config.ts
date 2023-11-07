const API_URL = (window as any).API_URL || import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000';
export const BASE_PATH = API_URL.replace(/\/+$/, '');
