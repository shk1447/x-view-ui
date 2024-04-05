import '../src/index.css';
export const parameters = {
  deepControls: { enabled: true },
  themes: {
    clearable: false,
    list: [
        {
            name: 'Light',
            class: [],
            color: '#ffffff',
            default: true
        },
        {
            name: 'Dark',
            // The class dark will be added to the body tag
            class: ['dark'],
            color: '#000000'
        }
    ]
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // anima: {
  //   designTokens: require('../design-system-tokens.json'),
  // },
};
