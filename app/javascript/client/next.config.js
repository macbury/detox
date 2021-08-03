/**
 * It's dangerous to go alone!
 * Take this: 🧀
 */
const path = require('path')
const envPath = path.resolve('../../../.env')
const withOffline = require('next-offline')
const TerserPlugin = require('terser-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const devMode = process.env['NODE_ENV'] !== 'production'
if (devMode) {
  require('dotenv').config({ path: envPath })
}

const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')

//https://github.com/martpie/next-transpile-modules/issues/97
// https://github.com/brunolemos/react-native-web-monorepo/tree/master/packages/web-nextjs
const withTM = require('next-transpile-modules')([
  '@detox/styleguide',
  '@detox/store',
  '@detox/api',
  '@detox/shared',
  'expo-next-react-navigation',
  '@burstware/react-native-portal',
  'react-native-reanimated',
  'react-native-tab-view'
], { resolveSymlinks: true, debug: false });
const withPlugins = require('next-compose-plugins')

async function rewrites() {
  return [
    { // https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
      source: "/_/:any*",
      destination: "/_reader",
    }
  ]
}

const nextOfflineConfig = {
  generateSw: true,
  generateInDevMode: false,
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /.png$/,
        handler: 'CacheFirst'
      }
    ]
  }
}

module.exports = withPlugins(
  [
    withFonts,
    withImages,
    [withExpo, { projectRoot: __dirname }],
    withTM,
    withBundleAnalyzer,
    [withOffline, nextOfflineConfig]
  ],{
    rewrites,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.resolve.symlinks = true
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        'react-native$': 'react-native-web',
        'jose': path.resolve(__dirname, isServer ? './node_modules/jose/dist/node/cjs' : './node_modules/jose/dist/browser')
      }

      const storeRules = {
        test: /\.(tsx|ts|js|jsx)$/,
        include: [
          path.resolve('../store'),
          path.resolve('../api'),
          path.resolve('../styleguide'),
          path.resolve('../shared'),
          path.resolve('../warp-pipe'),
          path.resolve('../node_modules/graphql-language-service-interface/'),
          path.resolve('../node_modules/graphql-language-service-parser/'),
          path.resolve('../node_modules/@graphiql/')
        ],
        use: {
          loader: 'next-babel-loader',
          options: config.module.rules[2].loader.options
        }
      }

      config.module.rules = [
        //nativeWeb,
        ...config.module.rules,
        storeRules,
      ]

      if (!dev) {
        config.optimization.minimizer = [new TerserPlugin({
          parallel: true,
          sourceMap: false,
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
            toplevel: true
          }
        })]
      }
      //throw 'boom'

      config.plugins.push(new DuplicatePackageCheckerPlugin())
      config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
      
      config.resolve.alias['inherits'] = path.resolve(
        '../',
        'node_modules',
        'inherits'
      )
      config.resolve.alias['safe-buffer'] = path.resolve(
        '../',
        'node_modules',
        'safe-buffer'
      )
      config.resolve.alias['color-name'] = path.resolve(
        '../',
        'node_modules',
        'color-name'
      )
      config.resolve.alias['fbjs'] = path.resolve(
        '../',
        'node_modules',
        'fbjs'
      )
      config.resolve.alias['strip-ansi'] = path.resolve(
        '../',
        'node_modules',
        'strip-ansi'
      )

      config.resolve.alias['tslib'] = path.resolve(
        '../',
        'node_modules',
        'apollo-cache-inmemory/node_modules/tslib'
      )

      // config.plugins.push(
      //   new BundleAnalyzerPlugin({
      //     analyzerMode: 'server',
      //     analyzerPort: isServer ? 8888 : 8889,
      //     openAnalyzer: true,
      //   })
      // )
      
      return config
    }
  }
)
