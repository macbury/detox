const { resolve } = require('path')
const { withUnimodules } = require('@expo/webpack-config/addons')

module.exports = ({ config }) => {
  const projectRoot = resolve(__dirname, '..')
  // console.log('projectRoot', projectRoot)
  config.module.rules[0].include = [projectRoot]
  
  // console.log('config', config.module.rules)
  return withUnimodules(config, {
    projectRoot,
  })
}
