// @generated: @expo/next-adapter@2.1.56
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: [
    ["styled-components", { "ssr": true }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["transform-flow-strip-types"]
  ]
};
