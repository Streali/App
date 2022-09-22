import axios from 'axios';

const endpoint = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: endpoint,
  withCredentials: true,
});
