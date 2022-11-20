export const authKeys = {
  root: ['auth'],
  user: () => [...authKeys.root, 'user'],
  check: () => [...authKeys.root, 'check'],
} as const;

export const chatKeys = {
  root: ['chat'],
  lists: () => [...chatKeys.root, 'lists'],
  details: () => [...chatKeys.root, 'details'],
  detail: (id: string) => [...chatKeys.details(), id],
} as const;

export const alertKeys = {
  root: ['alert'],
  lists: () => [...alertKeys.root, 'lists'],
  details: () => [...alertKeys.root, 'details'],
  detail: (id: string) => [...alertKeys.details(), id],
} as const;

export const eventKeys = {
  root: ['event'],
  lists: () => [...eventKeys.root, 'lists'],
} as const;

export const queryKeys = {
  lottie: (url?: string) => ['lottie', url],
  googleFont: () => ['googleFont'],
} as const;
