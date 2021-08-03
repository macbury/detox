const path = require('path')

module.exports = {
  stories: ['../{form,theme,ui,Groups,MediaControls,GroupForm,Settings,Feed,Header,Menu,Channel,Video,Card,Dialogs,Notifications,Admin,StoryItem,Reader,Drawer}/**/*.stories.tsx'],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    '@storybook/addon-knobs'
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config, { configType }) => {
    //console.log(config)
    config.module.rules.push({
      test: /\.ts$/,
      use: ['babel-loader'],
      include: [
        path.resolve(__dirname, '../../node_modules/@detox/store'),
        path.resolve(__dirname, '../../node_modules/@detox/shared'),
        path.resolve(__dirname, '../../node_modules/@detox/api'),
      ]
    });

    // Return the altered config
    return config;
  }
}