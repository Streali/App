import chance from 'chance';
import type { TwitchMessage } from '~/types/schemas/chat';

export const randomMessages = [
  'Hello',
  'How are you?',
  'What are you doing?',
  "They say that dogs are man's best friend, but this cat was setting out to sabotage that theory.",
  'It is beneficial for them to work with eachother.',
  'I have been busier these days due to having a lot on my plate.',
  'Norrin Radd has cosmic awareness.',
  'They are widely known around the planet.',
  'This picture is truly beautiful.',
  'This place is full of smart people.',
  'Her favorite color is black.',
  'The cell phone is next to the laptop.',
  "Barry Allen's movement is the fastest on the planet.",
  'They stated an opinion on how they felt.',
  'I am thinking positively about the future.',
  'His jokes were funny.',
  'His question is confusing.',
  "Please don't be rude.",
  'I am going to the store.',
  'Her presentation was good enough for me personally.',
];

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
