export const authKeys = {
  root: ['auth'] as const,
  user: () => [...authKeys.root, 'user'] as const,
  check: () => [...authKeys.root, 'check'] as const,
};

export const chatKeys = {
  root: ['chat'] as const,
  lists: () => [...chatKeys.root, 'lists'] as const,
  details: () => [...chatKeys.root, 'details'] as const,
  detail: (id: string) => [...chatKeys.details(), id] as const,
};

export const alertKeys = {
  root: ['alert'] as const,
  lists: () => [...alertKeys.root, 'lists'] as const,
  details: () => [...alertKeys.root, 'details'] as const,
  detail: (id: string) => [...alertKeys.details(), id] as const,
};

export const eventKeys = {
  root: ['event'] as const,
  lists: () => [...eventKeys.root, 'lists'] as const,
};

export const eventListKeys = {
  root: ['event-list'] as const,
  lists: () => [...eventListKeys.root, 'lists'] as const,
  details: () => [...eventListKeys.root, 'details'] as const,
  detail: (id: string) => [...eventListKeys.details(), id] as const,
};

export const labelKeys = {
  root: ['label'] as const,
  lists: () => [...labelKeys.root, 'lists'] as const,
  details: () => [...labelKeys.root, 'details'] as const,
  detail: (id: string) => [...labelKeys.details(), id] as const,
};

export const queryKeys = {
  lottie: (url?: string) => ['lottie', url] as const,
  googleFont: () => ['googleFont'] as const,
};
