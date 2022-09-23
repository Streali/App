import { TwitchMessage } from './../../types/schemas/chat';
import chance from 'chance';

export const randomMessages = ['Hello', 'How are you?', 'What are you doing?'];

export const generateMessage = () => {
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
};

export const randomUsernames = [
  'xX_pseudo_1337_Xx',
  'John',
  'willtraore',
  'celisto_',
  'elchokopepito',
  'gekyou',
  'IU',
  'fabkerinec',
  'thom_yorke',
  'romainlanz',
];

const defaultBadges = {
  admin: false,
  broadcaster: false,
  moderator: false,
  partner: false,
  vip: false,
  artist: false,
};

export const generateUsername = () => {
  return randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
};

export const generateBadges = () => {
  return {
    admin: chance().integer({ min: 1, max: 10 }) === 1,
    broadcaster: chance().integer({ min: 1, max: 10 }) === 1,
    moderator: chance().integer({ min: 1, max: 5 }) === 1,
    partner: chance().integer({ min: 1, max: 10 }) === 1,
    vip: chance().integer({ min: 1, max: 3 }) === 1,
    artist: chance().integer({ min: 1, max: 10 }) === 1,
  };
};

export const generateTwitchMessage = (): TwitchMessage => {
  return {
    id: chance().guid(),
    username: generateUsername(),
    twitch: chance().guid(),
    emotes: {},
    date: new Date(),
    message: generateMessage(),
    badges: chance().integer({ min: 1, max: 2 }) == 1 ? generateBadges() : defaultBadges,
    mod: false,
    subscriber: false,
    color: '#000000',
  };
};
