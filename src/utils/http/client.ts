import ky from 'ky';

const endpoint = import.meta.env.VITE_API_URL;

export const http = ky.create({
  prefixUrl: endpoint,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
