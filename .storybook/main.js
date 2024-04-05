const path = require('path');

module.exports = {
  stories: [
    '../src/docs/introduction.stories.mdx',
    '../src/docs/getstarted.stories.mdx',
    '../src/docs/changelog.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-themes',
  ],
  features: {
    postcss: false,
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    config.module.rules.push({
      // write files under 10k to inline or copy files over 10k
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            fallback: 'file-loader',
            name: 'fonts/[name].[ext]',
          },
        },
      ],
    })
    return config;
  },
  previewHead: head => `
    ${head}
    <style>
      html, body {
        height: 100%;
      }
      
      #root {
        height: 100%;
      }
    </style>
  `,
};
