import { BaseEvent } from '~/types/schemas/event';

export const fakeEvent = (type: number): BaseEvent => {
  switch (type) {
    case 10:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 10,
        payload: {
          displayName: 'Bertrand',
          username: 'bertrand',
          providerId: 'twitch',
        },
      };
    case 20:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 20,
        payload: {
          displayName: 'Fabrice',
          username: 'fabrice',
          providerId: 'twitch',
          bits: 100,
          isAnonymous: false,
        },
      };
    case 30:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 30,
        payload: {
          displayName: 'Bruno',
          username: 'bruno',
          providerId: 'twitch',
          tier: '1000',
          cumulativeMonths: 1,
          streakMonths: 1,
          durationMonths: 1,
        },
      };
    case 31:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 31,
        payload: {
          displayName: 'Roger',
          username: 'roger',
          providerId: 'twitch',
          tier: '1000',
          total: 1,
          cumulativeTotal: 1,
          isAnonymous: false,
        },
      };
    case 40:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 40,
        payload: {
          displayName: 'Franck',
          username: 'franck',
          providerId: 'twitch',
          viewers: 1,
        },
      };
    case 50:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 50,
        payload: {
          displayName: 'José',
          username: 'josé',
          providerId: 'twitch',
          level: 1,
          progress: 1,
          total: 1,
        },
      };
    case 52:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 52,
        payload: {
          displayName: 'David',
          username: 'david',
          providerId: 'twitch',
          level: 1,
          progress: 1,
          total: 1,
        },
      };
    case 60:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 60,
        payload: {
          type: 'subscription',
          description: 'Pseudo subscribed!',
          currentAmount: 1,
          targetAmount: 20,
          startedAt: '2021-01-01T00:00:00Z',
        },
      };
    case 62:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 60,
        payload: {
          type: 'subscription',
          description: 'Pseudo subscribed!',
          currentAmount: 1,
          targetAmount: 20,
          startedAt: '2021-01-01T00:00:00Z',
        },
      };
    default:
      return {
        id: Math.random().toString(36).slice(2, 7),
        created_at: '2021-01-01T00:00:00Z',
        type: 10,
        payload: {
          displayName: 'Fabrice',
          username: 'fabrice',
          providerId: 'twitch',
        },
      };
  }
};
