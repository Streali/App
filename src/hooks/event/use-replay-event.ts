import { useMutation } from '@tanstack/react-query';
import { http } from '~/utils/http/client';

export function useReplayEvent() {
  return useMutation((eventId: string) => {
    return http.post(`events/${eventId}/replay`).json();
  });
}
