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

export const generateUsername = () => {
  return randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
};

export const generateTwitchMessage = (): TwitchMessage => {
  return {
    id: chance().guid(),
    username: generateUsername(),
    twitch: chance().guid(),
    emotes: {},
    date: new Date(),
    message: generateMessage(),
    badges: {},
    mod: false,
    subscriber: false,
    color: '#000000',
  };
};
