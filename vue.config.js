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
    name: 'KB PWA App',
    shorName: 'KB PWA',
    themeColor: '#400080',
    msTileColor: '#800080',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cleanupOutdatedCaches: true // cleans up cache that is out dated because of a previous version of Workbox.
    }
  }
}
