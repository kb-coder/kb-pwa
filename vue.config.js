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
      start_url: '/' // The default vue pwa plugin uses '.'. Also many examples on line show '/index.html'. Either of these will
      // result in a blank screen when installed on iOS or Android, but they will work fine on a PC. The '/' must also be included
      // in the router. This will meet the requirements of a good start_url and it will install and display correctly on the devices.
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cleanupOutdatedCaches: true // cleans up cache that is outdated because of a previous version of Workbox.
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'KB Coder PWA App' // Add title to the app bar when installed as PWA.
        return args
      })
  }
}
