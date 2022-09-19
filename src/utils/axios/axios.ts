import axios from 'axios';

const endpoint = process.env['API_URL'];

export const apiClient = axios.create({
  baseURL: endpoint,
  withCredentials: true,
});
