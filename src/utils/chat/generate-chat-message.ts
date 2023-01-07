import chance from 'chance';
import { parse } from 'simple-tmi-emotes';
import type { TwitchMessage } from '~/types/schemas/chat';

export const randomMessages = [
  {
    message: 'Hello',
  },
  {
    message: 'Are you sure? Kappa',
    emotes: {
      '25': ['14-19'],
    },
  },

  {
    message: 'How are you?',
  },
  {
    message: 'What are you doing?',
  },
  {
    message:
      "They say that dogs are man's best friend, but this cat was setting out to sabotage that theory.",
  },
  {
    message: 'It is beneficial for them to work with eachother.',
  },
  {
    message: 'I have been busier these days due to having a lot on my plate.',
  },
  {
    message: 'Norrin Radd has cosmic awareness.',
  },
  {
    message: 'They are widely known around the planet.',
  },
  {
    message: 'This picture is truly beautiful.',
  },
  {
    message: 'This place is full of smart people.',
  },
  {
    message: 'Her favorite color is black.',
  },
  {
    message: 'The cell phone is next to the laptop.',
  },
  {
    message: "Barry Allen's movement is the fastest on the planet.",
  },
  {
    message: 'They stated an opinion on how they felt.',
  },
  {
    message: 'I am thinking positively about the future.',
  },
  {
    message: 'His jokes were funny.',
  },
  {
    message: 'His question is confusing.',
  },
  {
    message: "Please don't be rude.",
  },
  {
    message: 'I am going to the store.',
  },
  {
    message: 'Her presentation was good enough for me personally.',
  },
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

const randomColors = [
  '#15e64c',
  '#15b8e6',
  '#151ce6',
  '#7315e6',
  '#e615db',
  '#e61553',
  '#e61515',
  '#99e615',
  '#e6c615',
  '#e66f15',
];

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

export const generateColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

export const generateTwitchMessage = (): TwitchMessage => {
  const { message, emotes } = generateMessage();
  return {
    id: chance().guid(),
    username: generateUsername(),
    twitch: chance().guid(),
    emotes,
    date: new Date(),
    message: parse(message, emotes ?? {}, {
      format: 'default',
      themeMode: 'light',
      scale: '2.0',
    }),
    badges: chance().integer({ min: 1, max: 2 }) == 1 ? generateBadges() : defaultBadges,
    mod: false,
    subscriber: false,
    color: generateColor(),
  };
};
