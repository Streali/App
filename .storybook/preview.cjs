import '../src/main.scss';
import { withDecorator } from './decorators'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#090b11',
      },
      {
        name: 'white',
        value: '#fff'
      }
    ],
  },
};

export const decorators = [withDecorator]
