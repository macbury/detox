const path = require('path')
const { createMetroConfiguration } = require('expo-yarn-workspaces');

const config = createMetroConfiguration(__dirname);

module.exports = config