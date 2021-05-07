module.exports = {
  publicPath: '/',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  crossorigin: 'use-credentials',
  lintOnSave: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map'
    } else if (process.env.NODE_ENV === 'test') {
      config.devtool = 'cheap-module-eval-source-map'
    }
  },
  pwa: {
    name: 'KB Coder PWA App',
    shorName: 'KB Coder',
    themeColor: '#400080',
    msTileColor: '#800080',
    manifestOptions: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_url: '/' // The default vue pwa plugin uses '.'. Also many examples on line show '/index.html'. Either of these will
      // result in a blank screen when installed on iOS or Android, but they will work fine on a PC. The '/' must also be included
      // in the router. This will meet the requirements of a good start_url and it will install and display correctly on the devices.
    },
    workboxPluginMode: 'InjectManifest', // GenerateSW doesn't allow you to send the SKIP_WAITING message to allow users to update PWA.
    workboxOptions: {
      swSrc: './src/service-worker/sw.js',
      swDest: 'service-worker.js'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'KB Coder PWA App' // Add title to the app bar when installed as PWA.
        return args
      })

    // When running pwalocalserve, its configured to build application with NODE_ENV with 'development'
    // so we can get the debugging for Workbox to debug the service worker.
    // But in the script to build pwalocalserve, we disable @vue/cli-plugin-pwa
    // so this adds in the pieces from the @vue/cli-plugin-pwa that we actually need.
    console.log(process.env.VUE_APP_PWA_LOCAL_SERVE)
    if (process.env.VUE_APP_PWA_LOCAL_SERVE === 'true') {
      // generate /service-worker.js
      // Default to GenerateSW mode, though InjectManifest also might be used.
      const workboxPluginMode = 'InjectManifest'
      const workboxWebpackModule = require('workbox-webpack-plugin')
      const defaultOptions = {
        exclude: [
          /\.map$/,
          /img\/icons\//,
          /favicon\.ico$/,
          /^manifest.*\.js?$/
        ]
      }

      const workBoxConfig = Object.assign(defaultOptions, {},  {
        swSrc: './src/service-worker/sw.js',
        swDest: 'service-worker.js'
      })

      config
        .plugin('workbox')
        .use(workboxWebpackModule[workboxPluginMode], [workBoxConfig])
    }
  }
}
